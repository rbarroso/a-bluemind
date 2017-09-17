import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { ProjectsService } from '../../projects/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  limit: number = 10;
  offset: number = 1;

  constructor(private _tokenService: TokenService, private _projectsService: ProjectsService) {
  }

  ngOnInit() {
    this._projectsService.clearList();
    if (this._tokenService.hasToken()) {
      this._projectsService.getProjects(this.limit,this.offset).subscribe(data => {
        let iterationsNumber = Math.floor(this._projectsService.projectsCount / this.limit);
        for (let i = 1; i <= iterationsNumber; i++) {
          this.offset = i * this.limit;
          this._projectsService.getProjects(this.limit,this.offset).subscribe();
        }
      });
    }

  }
}
