import { Component, OnInit, OnDestroy } from '@angular/core';
import { TokenService } from '../../../services/token/token.service';
import { EventsService } from '../../../services/filter-event/events.service';
import { NavbarSearchEvent } from '../../../models/navbar-search.event';
import { Observer } from '../../../models/observer.interface';
import { ForceNavbarSearchEvent } from '../../../models/force-navbar-search.event';

@Component ({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy, Observer {

  constructor(private _tokenService: TokenService, private _eventsService: EventsService ) {}

  filter: string = '';

  ngOnInit() {
    this._eventsService.register(this);
  }

  ngOnDestroy() {
    this._eventsService.unregister(this);
  }

  search(filter: string) {
    let event = new NavbarSearchEvent(filter);
    this.filter = filter;
    this._eventsService.publish(event);
  }

  onEvent<ForceNavbarSearchEvent>(event: ForceNavbarSearchEvent) {
    if (event instanceof ForceNavbarSearchEvent) {
      this.search(this.filter);
    }
  }


}
