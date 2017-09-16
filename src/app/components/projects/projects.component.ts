import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { ProjectsService } from '../../projects/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private _tokenService: TokenService, private _projectsService: ProjectsService) { }

  ngOnInit() {
    if (this._tokenService.hasToken()) {
      this._projectsService.getProjects().subscribe();
    }
  }

}
