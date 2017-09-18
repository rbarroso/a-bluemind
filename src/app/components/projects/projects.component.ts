import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { ProjectsService } from '../../services/projects/projects.service';
import {Project} from "../../models/project";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  limit: number = 100;
  offset: number = 1;

  productionProjects: Project[] = [];
  estructuralProjects: Project[] = [];
  internalProjects: Project[] = [];
  comercialProjects: Project[] = [];

  minimunSlice: number = 6;
  comercialSlice: number = this.minimunSlice;
  productionSlice: number = this.minimunSlice;
  internalSlice: number = this.minimunSlice;
  estructuralSlice: number = this.minimunSlice;

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
            this.sliceProjectsProperties();
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
        this.sliceProjectsProperties();
      }
    });
  }

  private changeSlice(buttonName: number): void {
    switch (buttonName) {
      case 1:
        if (this.productionSlice > this.minimunSlice) {
          this.productionSlice = this.minimunSlice;
        } else {
          this.productionSlice = this._projectsService.filterProjects(1,
            this._projectsService.productionProjectsTypes, this._projectsService.filter).length;
        }
        break;
      default:
        break;
    }
  }

  private sliceProjectsProperties() {
    this.productionProjects = this._projectsService.filterProjects(1,
      this._projectsService.productionProjectsTypes, this._projectsService.filter);
  }

}
