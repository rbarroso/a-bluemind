import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {TokenService} from '../token/token.service';

@Injectable()
export class IssueService {

  protocolo = 'https://';
  urlIssueRS = 'redmine.sdos.es/issues.json';


  constructor(private http: Http, private _tokenService: TokenService) {

  }

  getTareasByStatus(): any {
    let issuesList: any[] = [];
    const url = `${this.protocolo}${this.urlIssueRS}${this.getSecurityString(this._tokenService.getToken())}` +
                `&tracker_id=2&limit=100&assigned_to_id=71&status_id=2&sort=project`;
    return this.http.get(url).map(res => {
      return res.json().issues;
    });
  }

  private getSecurityString(token: string): string {
    return `?key=${token}`;
  }

}
