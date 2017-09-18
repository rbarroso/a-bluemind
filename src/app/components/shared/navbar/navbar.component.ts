import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../services/token/token.service';
import { ProjectsService } from "../../../services/projects/projects.service";
import {Router} from "@angular/router";

@Component ({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor(private _tokenService: TokenService,
              private _projectsService: ProjectsService,
              private router: Router) { }

  ngOnInit() {
  }

  search(filter: string) {
    this._projectsService.filter = filter;
    this.router.navigate(['/projects']);
  }

}
