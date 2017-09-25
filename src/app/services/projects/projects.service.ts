import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { TokenService } from '../token/token.service';
import { Project } from '../../models/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {
  LOCAL_S_PROJECT_COUNT_PROP, LOCAL_S_PROJECTS_PROP, REDMINE_EP_GET_PROJECTS,
  REDMINE_PROTOCOL
} from '../../constants';



@Injectable()
export class ProjectsService {

  filter: string = '';

  constructor(private http: Http, private jsonp: Jsonp, private _tokenService: TokenService) {}

  private getSecurityString(): string {
    return `&key=${this._tokenService.getToken()}`;
  }

  filterProjects(projects: Project[], categories: string[], filter?: string) {
    return projects.filter(project => {
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
    let url = REDMINE_PROTOCOL + REDMINE_EP_GET_PROJECTS + query + this.getSecurityString() + '&callback=JSONP_CALLBACK';

    return this.jsonp.get(url)
      .map(res => {
        localStorage.setItem(LOCAL_S_PROJECT_COUNT_PROP, String(res.json().total_count))
        return res.json().total_count;
      });
  }

  getActiveProjects(): Observable<Project[]> {
    let currentNumberOfProjects: string = localStorage.getItem(LOCAL_S_PROJECT_COUNT_PROP);
    return this.updateNumberOfProjects().map(data => {

      if (localStorage.getItem(LOCAL_S_PROJECT_COUNT_PROP) && localStorage.getItem(LOCAL_S_PROJECTS_PROP)
        && currentNumberOfProjects == data) {
        return JSON.parse(localStorage.getItem(LOCAL_S_PROJECTS_PROP));
      }

      localStorage.setItem(LOCAL_S_PROJECT_COUNT_PROP, String(data));
      let remoteProjects: Project[] = [];
      let peticiones: Observable<any>[] = [];

      let numberProjects: string = localStorage.getItem(LOCAL_S_PROJECT_COUNT_PROP);
      let iterationsNumber = Math.floor(Number(numberProjects) / 100) + 1;

      for (let i = 1; i <= iterationsNumber; i++) {
        let offset = (i-1) * 100;
        let peticion: Observable<any> = this.http.get(REDMINE_PROTOCOL + REDMINE_EP_GET_PROJECTS + `?offset=${offset}&limit=${100}` +
          this.getSecurityString()).map(res => res.json());
        peticiones.push(peticion);
      }

      Observable.forkJoin(peticiones).subscribe(results => {
        for (let i = 0; i < results.length; i++) {
          results[i].projects.map(item => {
            if (item.status == 1) {
              remoteProjects.push(new Project(item.identifier, item.id, item.name, item.custom_fields[0].value));
            }
          });
          localStorage.setItem(LOCAL_S_PROJECTS_PROP, JSON.stringify(remoteProjects));
        }
      });
      return remoteProjects;
    });

  }

}
