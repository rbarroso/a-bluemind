import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { TokenService } from '../token/token.service';
import { Project } from '../../models/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


import {
  LOCAL_S_PROJECT_COUNT_PROP, LOCAL_S_PROJECTS_PROP, REDMINE_EP_GET_PROJECTS, REDMINE_EP_GET_SINGLE_PROJECT,
  REDMINE_PROTOCOL
} from '../../constants';



@Injectable()
export class ProjectsService {

  constructor(private http: Http, private jsonp: Jsonp, private _tokenService: TokenService) {}

  private getSecurityString(): string {
    return `key=${this._tokenService.getToken()}`;
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

    let query = `?offset=${offset}&limit=${limit}&`;
    let url = REDMINE_PROTOCOL + REDMINE_EP_GET_PROJECTS + query + this.getSecurityString() + '&callback=JSONP_CALLBACK';

    return this.jsonp.get(url)
      .map(res => {
        localStorage.setItem(LOCAL_S_PROJECT_COUNT_PROP, String(res.json().total_count))
        return res.json().total_count;
      });
  }

  getActiveProjects(): Observable<Project[]> {
    let result: Observable<Project[]>;
    const currentNumberOfProjects: string = localStorage.getItem(LOCAL_S_PROJECT_COUNT_PROP);
    return this.updateNumberOfProjects().flatMap(data => {
      if (localStorage.getItem(LOCAL_S_PROJECT_COUNT_PROP) && localStorage.getItem(LOCAL_S_PROJECTS_PROP)
        && currentNumberOfProjects == data) {
         result = this.getActiveProjectsLS();
      } else {
        localStorage.setItem(LOCAL_S_PROJECT_COUNT_PROP, String(data));
        result = this.getActiveProjectsREST();
      }
      return result;
    });
  }

  getActiveProjectsREST(): Observable<Project[]> {
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

    return Observable.forkJoin(peticiones).map(results => {
      for (let i = 0; i < results.length; i++) {
        results[i].projects.map(item => {
          if (item.status == 1) {
            remoteProjects.push(new Project(item.identifier, item.id, item.name, item.custom_fields[0].value));
          }
        });
        localStorage.setItem(LOCAL_S_PROJECTS_PROP, JSON.stringify(remoteProjects));
      }
      return remoteProjects;
    });
  }

  getActiveProjectsLS(): Observable<Project[]> {
    return Observable.of(JSON.parse(localStorage.getItem(LOCAL_S_PROJECTS_PROP)));
  }

  getProject(redmine_id: number): Observable<Project> {
    let url: string = REDMINE_PROTOCOL +
      REDMINE_EP_GET_SINGLE_PROJECT.replace('[ID]', redmine_id.toString())
      + '?' + this.getSecurityString();
    return this.http.get(url).map(res => {
      return new Project(res.json().project.identifier, res.json().project.id, res.json().project.name,
        res.json().project.custom_fields[0].value);
    });
  }

}
