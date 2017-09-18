import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  token: string = '';
  lsTokenProperty = 'redmine_token';

  constructor() {
  }

  hasToken(): boolean {
    return localStorage.getItem(this.lsTokenProperty) ? true : false;
  }

  guardarToken(token: string) {
    localStorage.setItem(this.lsTokenProperty, token);
  }

  getToken(): string {
    if (this.hasToken()) {
      return localStorage.getItem(this.lsTokenProperty);
    }
    return;
  }




}
