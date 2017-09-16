import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  token: string = '';

  constructor() {
  }

  hasToken(): boolean {
    return localStorage.getItem('redmineToken') ? true : false;
  }

  guardarToken(token: string) {
    localStorage.setItem('redmineToken', token);
  }

  eliminarToken() {
    localStorage.removeItem('redmineToken');
  }

  getToken(): string {
    if (this.hasToken()) {
      return localStorage.getItem('redmineToken');
    }
    return;
  }




}
