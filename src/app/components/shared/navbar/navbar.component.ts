import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../services/token/token.service';

@Component ({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor(private _tokenService: TokenService) { }

  ngOnInit() {
  }

}
