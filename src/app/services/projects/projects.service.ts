import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { TokenService } from '../token/token.service';
import 'rxjs/add/operator/map';
import { Project } from '../../models/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';


@Injectable()
export class ProjectsService {

  comercialProjectsTypes: string[] = ['Comercial'];
  productionProjectsTypes: string[] = ['Desarrollo', 'Mantenimiento', 'IDI', 'Outsourcing',
                                  'Consultoría/Hosting/Otros', 'Servicios Gestionados', 'Desarrollo interno'];
  internalProjectsTypes: string[] = ['Gestión Interna', 'Interno'];
  estructuralProjectsTypes: string[] = ['Estructural'];

  // projects: Project[] = [];

  lsProjectsCountProperty = 'redmine_projects_number';
  lsProjectsProperty = 'redmine_projects';

  protocolo: string = 'https://'
  urlProjects: string = 'redmine.sdos.es/projects.json';

  filter: string = '';

  constructor(private http: Http, private jsonp: Jsonp, private _tokenService: TokenService) {}

  private getSecurityString(): string {
    return `&key=${this._tokenService.getToken()}`;
  }

  filterProjects(categories: string[], filter?: string) {
    return this.projects.filter(project => {
        if (categories.indexOf(project.type) != -1) {
          if (filter) {
            return project.name.toLowerCase().indexOf(filter.toLowerCase()) != -1 ? true : false;
          } else {
            return true;
          }
        }
      return false;
    });
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

  clearList() {
    this.projects = [];
  }

  getActiveProjects(): Observable<Project[]> {

    if (localStorage.getItem(this.lsProjectsProperty)) {
      return Observable.create(data => JSON.parse(localStorage.getItem(this.lsProjectsProperty)));
    }


    return this.updateNumberOfProjects().map(data => {

      let projectsAA: Project[] = [];
      let peticiones: Observable<any>[] = [];

      let numberProjects: string = localStorage.getItem(this.lsProjectsCountProperty);
      let iterationsNumber = Math.floor(Number(numberProjects) / 100) + 1;

      console.log(iterationsNumber);

      for (let i = 1; i <= iterationsNumber; i++) {
        let offset = (i-1) * 100;

        let peticion: Observable<any> = this.http.get(this.protocolo + this.urlProjects + `?offset=${offset}&limit=${100}` +
          this.getSecurityString()).map(res => res.json());
        peticiones.push(peticion);
      }

      Observable.forkJoin(peticiones).subscribe(results => {
        for (let i = 0; i < results.length; i++) {
          results[i].projects.map(item => {
            if (item.status == 1){
              projectsAA.push(item);
            }
          });
        }
      });

      return projectsAA;
    });

  }

}
