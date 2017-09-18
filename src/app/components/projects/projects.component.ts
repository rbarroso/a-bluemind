import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { ProjectsService } from '../../services/projects/projects.service';
import { Project } from '../../models/project';
import { Observer } from '../../models/observer';
import { FilterEventService } from '../../services/filter-event/filter-event.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, Observer {

  limit: number = 100;
  offset: number = 1;

  productionProjects: Project[] = [];
  estructuralProjects: Project[] = [];
  internalProjects: Project[] = [];
  comercialProjects: Project[] = [];

  minimunSlice: number = 5;
  productionSlice: number = this.minimunSlice;
  estructuralSlice: number = this.minimunSlice;
  internalSlice: number = this.minimunSlice;
  comercialSlice: number = this.minimunSlice;

  constructor(private _tokenService: TokenService,
              private _projectsService: ProjectsService,
              private _filterEventService: FilterEventService) {
  }

  ngOnInit() {

    this._filterEventService.register(this);
    this._projectsService.clearList();

    if (this._tokenService.hasToken()) {
      if (localStorage.getItem(this._projectsService.lsProjectsProperty)) {
        const actualNumberOfProjects = !localStorage.getItem(this._projectsService.lsProjectsCountProperty) ? 0 :
          localStorage.getItem(this._projectsService.lsProjectsCountProperty);
        this._projectsService.updateNumberOfProjects().subscribe(data => {
          const updatedNumberOfProjects = localStorage.getItem(this._projectsService.lsProjectsCountProperty);
          if (actualNumberOfProjects == updatedNumberOfProjects) {
            this._projectsService.getLocalProjects();
            this.sliceProjects();
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
        this._projectsService.getRemoteProjects(this.limit, this.offset).subscribe( data => this.sliceProjects());
        // this.sliceProjects();
      }
    });
  }

  private changeSlice(buttonName: number): void {
    switch (buttonName) {
      case 1:
        if (this.productionSlice > this.minimunSlice) {
          this.productionSlice = this.minimunSlice;
        } else {
          this.productionSlice = this._projectsService.filterProjects(
            this._projectsService.productionProjectsTypes, this._projectsService.filter).length;
        }
        break;
      case 2:
        if (this.estructuralSlice > this.minimunSlice) {
          this.estructuralSlice = this.minimunSlice;
        } else {
          this.estructuralSlice = this._projectsService.filterProjects(
            this._projectsService.estructuralProjectsTypes, this._projectsService.filter).length;
        }
        break;
      case 3:
        if (this.internalSlice > this.minimunSlice) {
          this.internalSlice = this.minimunSlice;
        } else {
          this.internalSlice = this._projectsService.filterProjects(
            this._projectsService.internalProjectsTypes, this._projectsService.filter).length;
        }
        break;
      case 4:
        if (this.comercialSlice > this.minimunSlice) {
          this.comercialSlice = this.minimunSlice;
        } else {
          this.comercialSlice = this._projectsService.filterProjects(
            this._projectsService.comercialProjectsTypes, this._projectsService.filter).length;
        }
        break;
      default:
        break;
    }
  }

  private sliceProjects() {
    this.productionProjects = this._projectsService.filterProjects(
      this._projectsService.productionProjectsTypes, this._projectsService.filter);
    this.estructuralProjects = this._projectsService.filterProjects(
      this._projectsService.estructuralProjectsTypes, this._projectsService.filter);
    this.internalProjects = this._projectsService.filterProjects(
      this._projectsService.internalProjectsTypes, this._projectsService.filter);
    this.comercialProjects = this._projectsService.filterProjects(
      this._projectsService.comercialProjectsTypes, this._projectsService.filter);
  }

  onEvent(message: any) {
    this._projectsService.filter = message;
    this.sliceProjects();
  }

  ngOnDestroy() {
    this._filterEventService.unregister(this);
  }

}
