import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ForceNavbarSearchEvent} from "../../models/force-navbar-search.event";
import {EventsService} from "../../services/filter-event/events.service";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  redmine_id: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.redmine_id = params.redmineId;
    });
  }

  ngOnInit() {
    console.log(this.redmine_id);
  }

}
