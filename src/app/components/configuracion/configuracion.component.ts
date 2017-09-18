import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  token: string = '';
  verToken: boolean = false;

  constructor(private _tokenService: TokenService, private _router: Router) { }

  ngOnInit() {
    this.token = this._tokenService.getToken();
  }

  guardar(): void {
    if (this.token) {
      this._tokenService.guardarToken(this.token);
      this._router.navigate(['/projects']);
    }
  }

  limpiar(): void {
    localStorage.clear();
    this.token = '';
  }

}
