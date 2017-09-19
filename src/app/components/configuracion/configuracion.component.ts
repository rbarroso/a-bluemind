import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';
import { EventsService } from "../../services/filter-event/events.service";
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
              private _eventsService : EventsService) { }

  ngOnInit() {
    this.token = this._tokenService.getToken();
  }

  guardar(): void {
    if (this.token) {
      this._tokenService.setToken(this.token);
      this._router.navigate(['/projects']);
      let event = new UserInfoEvent();
      this._eventsService.publish(event);
    }
  }

  limpiar(): void {
    localStorage.clear();
    this.token = '';
    this._tokenService.clearProperties();
  }

}
