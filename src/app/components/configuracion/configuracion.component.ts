import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';
import {FilterEventService} from "../../services/filter-event/filter-event.service";
import {UserInfoEvent} from "../../models/user-info.event";

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  token: string = '';
  verToken: boolean = false;

  constructor(private _tokenService: TokenService, private _router: Router,
              private _filterEventService : FilterEventService) { }

  ngOnInit() {
    this.token = this._tokenService.getToken();
  }

  guardar(): void {
    if (this.token) {
      this._tokenService.setToken(this.token);
      this._router.navigate(['/projects']);
      let event = new UserInfoEvent();
      this._filterEventService.publish(event);
    }
  }

  limpiar(): void {
    localStorage.clear();
    this.token = '';
    this._tokenService.clearProperties();
  }

}
