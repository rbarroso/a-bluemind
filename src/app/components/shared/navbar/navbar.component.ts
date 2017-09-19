import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import {TokenService} from "../../../services/token/token.service";
import {FilterEventService} from "../../../services/filter-event/filter-event.service";
import {NavbarSearchEvent} from "../../../models/navbar-search.event";

@Component ({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor(private _tokenService: TokenService, private _filterEventService: FilterEventService ) {}

  ngOnInit() {
  }

  search(filter: string) {
    let event = new NavbarSearchEvent(filter);
    this._filterEventService.publish(event);
  }

}
