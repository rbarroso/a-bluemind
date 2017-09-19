import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {TokenService} from "../token/token.service";

@Injectable()
export class IssueService {

  protocolo : string = 'https://';
  urlIssueRS: string = 'redmine.sdos.es/issues.json';



  // ?key=e6bbed609ce0f6ad73977cc64f0d1f143287bf03&tracker_id=2&limit=100&assigned_to_id=71&status_id=2&sort=project

  constructor(private http: Http, private _tokenService : TokenService) { }

  getTareasByStatus() {

  }
}
