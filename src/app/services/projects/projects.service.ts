import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { TokenService } from '../token/token.service';
import 'rxjs/add/operator/map';
import { Project } from '../../models/index';

@Injectable()
export class ProjectsService {

  comercialProjectsTypes: string[] = ['Comercial'];
  productionProjectsTypes: string[] = ['Desarrollo', 'Mantenimiento', 'IDI', 'Outsourcing',
                                  'Consultoría/Hosting/Otros', 'Servicios Gestionados', 'Desarrollo interno'];
  internalProjectsTypes: string[] = ['Gestión Interna', 'Interno'];
  estructuralProjectsTypes: string[] = ['Estructural'];

  projects: Project[] = [];

  lsProjectsCountProperty = 'redmine_projects_number';
  lsProjectsProperty = 'redmine_projects';

  protocolo: string = 'https://'
  urlProjects: string = 'redmine.sdos.es/projects.json';

  constructor(private http: Http, private jsonp: Jsonp, private _tokenService: TokenService) {}

  getLocalProjects() {
    this.projects = JSON.parse(localStorage.getItem(this.lsProjectsProperty));
  }

  getRemoteProjects(limit: number = 10, offset: number = 1) {
    if (this._tokenService.hasToken()) {

      let query = `?offset=${offset}&limit=${limit}`;
      let url = this.protocolo + this.urlProjects + query + this.getSecurityString() + '&callback=JSONP_CALLBACK';

      return this.jsonp.get(url)
        .map(res => {

          localStorage.setItem(this.lsProjectsCountProperty, String(res.json().total_count));
          let projects: any[] = res.json().projects;

          for (let proj of projects){
            if (proj.status == 1) { //Proyecto abierto
              this.projects.push(new Project(proj.identifier, proj.name, proj.custom_fields[0].value));
            }
          }
          localStorage.setItem(this.lsProjectsProperty, JSON.stringify(this.projects));
        });

    }
    return;
  }

  private getSecurityString(): string {
    return `&key=${this._tokenService.getToken()}`;
  }

  filterProjects(status: number = 1, categories: string[]) {
    return this.projects.filter(project => {
        if (categories.indexOf(project.type) != -1) {
          return true;
        }
      return false;
    });
  }

  clearList() {
    this.projects = [];
  }

  updateNumberOfProjects() {
    let limit: number = 1;
    let offset: number = 1;

    let query = `?offset=${offset}&limit=${limit}`;
    let url = this.protocolo + this.urlProjects + query + this.getSecurityString() + '&callback=JSONP_CALLBACK';

    return this.jsonp.get(url)
      .map(res => {
        localStorage.setItem(this.lsProjectsCountProperty, String(res.json().total_count));
      });
  }


}
