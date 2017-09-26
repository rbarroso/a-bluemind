import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { ProjectsService } from '../../services/projects/projects.service';
import { Project } from '../../models/project';
import { Observer } from '../../models/observer.interface';
import { EventsService } from '../../services/filter-event/events.service';
import { NavbarSearchEvent } from '../../models/navbar-search.event';
import { Observable } from "rxjs/Observable";
import {
  PROJECT_TYPES_COMERCIAL, PROJECT_TYPES_ESTRUCTURAL, PROJECT_TYPES_INTERNAL,
  PROJECT_TYPES_PROD
} from '../../constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy, Observer {

  constructor(private _tokenService: TokenService,
              private _projectsService: ProjectsService,
              private _eventsService: EventsService,
              private router: Router) {
  }

  get projectTypesProd() { return PROJECT_TYPES_PROD; }
  get projectTypesEstructural() { return PROJECT_TYPES_ESTRUCTURAL; }
  get projectTypesInternal() { return PROJECT_TYPES_INTERNAL; }
  get projectTypesComercial() { return PROJECT_TYPES_COMERCIAL; }

  productionProjects: Project[] = [];
  estructuralProjects: Project[] = [];
  internalProjects: Project[] = [];
  comercialProjects: Project[] = [];

  minimunSlice: number = 5;
  productionSlice: number = this.minimunSlice;
  estructuralSlice: number = this.minimunSlice;
  internalSlice: number = this.minimunSlice;
  comercialSlice: number = this.minimunSlice;

  filter: string = '';
  projects: Project[];

  ngOnInit() {
    this._eventsService.register(this);

    if (this._tokenService.hasToken()) {
      this._projectsService.getActiveProjects().subscribe(data => {
        this.projects = data;
        this.sliceProjects();
      });
    }
  }

  ngOnDestroy() {
    this._eventsService.unregister(this);
  }

  private changeSlice(slice: number, projectTypes: string[]): number {
    if (slice > this.minimunSlice) {
      return this.minimunSlice;
    } else {
      return this._projectsService.filterProjects(this.projects, projectTypes, this.filter).length;
    }
  }

  private sliceProjects() {
    this.productionProjects = this._projectsService.filterProjects(this.projects,
      PROJECT_TYPES_PROD, this.filter);
    this.estructuralProjects = this._projectsService.filterProjects(this.projects,
      PROJECT_TYPES_ESTRUCTURAL, this.filter);
    this.internalProjects = this._projectsService.filterProjects(this.projects,
      PROJECT_TYPES_INTERNAL, this.filter);
    this.comercialProjects = this._projectsService.filterProjects(this.projects,
      PROJECT_TYPES_COMERCIAL, this.filter);
  }

  onEvent<NavbarSearchEvent>(event: NavbarSearchEvent) {
    if (event instanceof NavbarSearchEvent) {
      this.filter = event.filter;
      this.sliceProjects();
    }
  }

  goToDetail(redmine_id: number) {
    this.router.navigate(['/projects/detail', redmine_id]);
  }

}
