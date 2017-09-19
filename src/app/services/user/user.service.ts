import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TokenService } from '../token/token.service';

@Injectable()
export class UserService {

  constructor(private http: Http, private _tokenService: TokenService) {
  }

  protocolo: string = 'https://'
  urlUserRS: string = 'redmine.sdos.es/users/current.json';

  getLoggedUser() {
    let token: string = this._tokenService.getToken();
    if (token) {
      let url = this.protocolo + this.urlUserRS + this.getSecurityString(token);
      return this.http.get(url)
        .map(res => {
          let redmineUserId = res.json().user.id;
          this._tokenService.setRedmineUserId(redmineUserId);
          return `${res.json().user.firstname} ${res.json().user.lastname} | ${res.json().user.mail}`;
        });
    }
    return;
  }

  private getSecurityString(token: string): string {
    return `?key=${token}`;
  }

}
