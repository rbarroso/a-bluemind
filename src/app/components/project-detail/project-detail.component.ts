import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Project } from '../../models/project';
import {DataService} from '../../services/data/data.service';
import {ProjectsService} from '../../services/projects/projects.service';
import { REDMINE_PROJECT_URL } from '../../constants';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  project: Project;
  redmine_id: string;

  constructor(private activatedRoute: ActivatedRoute, private _data: DataService, private _projectsService: ProjectsService) {
    this.activatedRoute.params.subscribe(params => {
      this.redmine_id = params.redmineId;
      this._projectsService.getProject(Number(this.redmine_id)).subscribe(res => this.project = res);
    });
  }

  ngOnInit() {
  }

  openRedmine() {
    window.open(REDMINE_PROJECT_URL + this.project.id, "_blank");
  }

}
