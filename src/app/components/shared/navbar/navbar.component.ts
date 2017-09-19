import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { TokenService } from "../../../services/token/token.service";
import { EventsService } from "../../../services/filter-event/events.service";
import { NavbarSearchEvent } from "../../../models/navbar-search.event";

@Component ({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor(private _tokenService: TokenService, private _eventsService: EventsService ) {}

  ngOnInit() {
  }

  search(filter: string) {
    let event = new NavbarSearchEvent(filter);
    this._eventsService.publish(event);
  }

}
