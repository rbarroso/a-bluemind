import {Injectable} from '@angular/core';

@Injectable()
export class TokenService {

  private token: string = '';
  private redmineUserId: string = '';

  lsTokenProperty = 'redmine_token';
  lsRedmineUserIdProperty = 'redmine_user_id';

  constructor() {
  }

  hasToken(): boolean {
    return localStorage.getItem(this.lsTokenProperty) ? true : false;
  }

  setToken(token: string) {
    if (token) {
      this.token = token;
      localStorage.setItem(this.lsTokenProperty, token);
    }
  }

  setRedmineUserId(redmineUserId: string) {
    if (redmineUserId) {
      this.redmineUserId = redmineUserId;
      localStorage.setItem(this.lsRedmineUserIdProperty, redmineUserId);
    }
  }

  getToken(): string {
    if (this.token) {
      return this.token;
    } else if (localStorage.getItem(this.lsTokenProperty)) {
      this.token = localStorage.getItem(this.lsTokenProperty)
      return this.token;
    } else {
      return;
    }
  }

  getRedmineUserId(): string {
    if (this.redmineUserId) {
      return this.redmineUserId;
    } else if (localStorage.getItem(this.lsRedmineUserIdProperty)) {
      this.redmineUserId = localStorage.getItem(this.lsRedmineUserIdProperty)
      return this.redmineUserId;
    } else {
      return;
    }
  }

  clearProperties() {
    this.redmineUserId = '';
    this.token = '';
  }
}
