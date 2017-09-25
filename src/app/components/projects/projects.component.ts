import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { ProjectsService } from '../../services/projects/projects.service';
import { Project } from '../../models/project';
import { Observer } from '../../models/observer.interface';
import { EventsService } from '../../services/filter-event/events.service';
import { NavbarSearchEvent } from '../../models/navbar-search.event';
import {Observable} from "rxjs/Observable";
import {
  PROJECT_TYPES_COMERCIAL, PROJECT_TYPES_ESTRUCTURAL, PROJECT_TYPES_INTERNAL,
  PROJECT_TYPES_PROD
} from '../../constants';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy, Observer {

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
              private _eventsService: EventsService) {
  }

  proj: Project[];
  projects: Observable<Project[]>;

  ngOnInit() {
    this._eventsService.register(this);
    this._projectsService.getActiveProjects().subscribe(data => {
      console.log(data);
      this.proj = data;
      this.sliceProjects();
    });
  }

  ngOnDestroy() {
    this._eventsService.unregister(this);
  }


  private changeSlice(buttonName: number): void {
   /* switch (buttonName) {
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
    }*/
  }

  private sliceProjects() {
    this.productionProjects = this._projectsService.filterProjects(this.proj,
      PROJECT_TYPES_PROD, this._projectsService.filter);
    this.estructuralProjects = this._projectsService.filterProjects(this.proj,
      PROJECT_TYPES_ESTRUCTURAL, this._projectsService.filter);
    this.internalProjects = this._projectsService.filterProjects(this.proj,
      PROJECT_TYPES_INTERNAL, this._projectsService.filter);
    this.comercialProjects = this._projectsService.filterProjects(this.proj,
      PROJECT_TYPES_COMERCIAL, this._projectsService.filter);
  }

  onEvent<NavbarSearchEvent>(event: NavbarSearchEvent) {
    if (event instanceof NavbarSearchEvent) {
      this._projectsService.filter = event.filter;
      this.sliceProjects();
    }
  }

}
