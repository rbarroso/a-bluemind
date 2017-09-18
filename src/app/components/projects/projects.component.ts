import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { ProjectsService } from '../../services/projects/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  limit: number = 100;
  offset: number = 1;

  constructor(private _tokenService: TokenService, private _projectsService: ProjectsService) {
  }

  ngOnInit() {

    this._projectsService.clearList();

    if (this._tokenService.hasToken()) {

      if (localStorage.getItem(this._projectsService.lsProjectsProperty)) {

        const actualNumberOfProjects = !localStorage.getItem(this._projectsService.lsProjectsCountProperty) ? 0 :
          localStorage.getItem(this._projectsService.lsProjectsCountProperty);
        this._projectsService.updateNumberOfProjects().subscribe(data => {
          const updatedNumberOfProjects = localStorage.getItem(this._projectsService.lsProjectsCountProperty);

          if (actualNumberOfProjects == updatedNumberOfProjects) {
            this._projectsService.getLocalProjects();
          } else {
            this.loadRemoteProjects();
          }
        });
      } else {
        this.loadRemoteProjects();
      }
    }
  }

  private loadRemoteProjects() {
    this._projectsService.getRemoteProjects(this.limit, this.offset).subscribe(data => {

      let iterationsNumber = Math.floor(Number(localStorage.getItem(this._projectsService.lsProjectsCountProperty)) / this.limit);
      for (let i = 1; i <= iterationsNumber; i++) {
        this.offset = i * this.limit;
        this._projectsService.getRemoteProjects(this.limit, this.offset).subscribe();
      }

    });
  }
}
