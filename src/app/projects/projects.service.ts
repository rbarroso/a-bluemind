import { Injectable } from '@angular/core';
import {Http, Jsonp} from '@angular/http';
import { TokenService } from '../services/token/token.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectsService {

  comercialProjectsTypes: string[] = ['Comercial'];
  productionProjectsTypes: string[] = ['Desarrollo', 'Mantenimiento', 'IDI', 'Outsourcing',
                                  'Consultoría/Hosting/Otros', 'Servicios Gestionados', 'Desarrollo interno'];
  internalProjectsTypes: string[] = ['Gestión Interna', 'Interno'];
  estructuralProjectsTypes: string[] = ['Estructural'];

  projects: any[] = [];
  projectsCount: number = 0;

  protocolo: string = 'https://'
  urlProjects: string = 'redmine.sdos.es/projects.json';

  constructor(private http: Http, private jsonp: Jsonp, private _tokeService: TokenService) {}

  /*getProjects(limit: number, offset: number) {
    let query = `?offset=${offset}&limit=${limit}`;
    let url = this.protocolo + this.getSecurityString() + this.urlProjects + query;
    return this._jsonp.get(url)
      .map(res => {
        // this.artistas = res.json().artists.items;
        // return this.artistas;
      });
  }*/

  getProjects(limit: number = 10, offset: number = 1) {
    if (this._tokeService.hasToken()){
      let query = `?offset=${offset}&limit=${limit}`;
      let url = this.protocolo + this.urlProjects + query + this.getSecurityString() + '&callback=JSONP_CALLBACK';
      return this.jsonp.get(url)
        .map(res => {
          this.projectsCount = res.json().total_count;
          let projects: any[] = res.json().projects;
          for (let proj of projects){
            this.projects.push(proj);
          }
        });
    }
    return;
  }

  private getSecurityString(): string {
    return `&key=${this._tokeService.getToken()}`;
  }

  filterProjects(status: number = 1, categories: string[]) {
    return this.projects.filter(project => {
      if (project.status == status) {
        if (categories.indexOf(project.custom_fields[0].value) != -1) {
          return true;
        }
      }
      return false;
    });
  }

  clearList() {
    this.projects = [];
  }
}
