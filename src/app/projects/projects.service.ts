import { Injectable } from '@angular/core';
import {Http, Jsonp} from '@angular/http';
import { TokenService } from '../services/token/token.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectsService {

  projects: any[] = [];
  protocolo: string = 'https://'
  urlProjects: string = 'redmine.sdos.es/projects.json';

  constructor(private http: Http, private jsonp: Jsonp, private _tokeService: TokenService) {}

  /*getProjects(limit: number, offset: number) {
    let query = `?offset=${offset}&limit=${limit}`;
    let url = this.protocolo + this.getSecurityString() + this.urlProjects + query;
    console.log(url);
    return this._jsonp.get(url)
      .map(res => {
        // this.artistas = res.json().artists.items;
        console.log( res.json() );
        // return this.artistas;
      });
  }*/

  getProjects() {

    if (this._tokeService.hasToken()){
      let limit: number = 100;
      let offset: number =1;
      let query = `?offset=${offset}&limit=${limit}`;
      let url = this.protocolo + this.urlProjects + query + this.getSecurityString() + '&callback=JSONP_CALLBACK';
      console.log(url);
      return this.jsonp.get(url)
        .map(res => {
          this.projects = res.json().projects;
          console.log(this.projects);
        });
    }
    return;
  }

  private getSecurityString(): string {
    return `&key=${this._tokeService.getToken()}`;
  }

  filterProjects(status: number = 1, categories: string[]) {
    return this.projects.filter(element => {
      return element.status === status;
    });

  }
}
