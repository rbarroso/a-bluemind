import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TokenService } from '../../../services/token/token.service';
import {FilterEventService} from '../../../services/filter-event/filter-event.service';

@Component ({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor(private _tokenService: TokenService, private _filterEventService: FilterEventService) {}

  ngOnInit() {
  }

  search(filter: string) {
    this._filterEventService.publish(filter);
  }

}
