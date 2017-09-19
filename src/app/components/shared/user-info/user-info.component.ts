import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observer } from '../../../models/observer.interface';
import { TokenService } from '../../../services/token/token.service';
import { FilterEventService } from '../../../services/filter-event/filter-event.service';
import { UserService } from '../../../services/user/user.service';
import { UserInfoEvent } from '../../../models/user-info.event';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy, Observer {

  userInfo: string = '';

  constructor(private _tokenService: TokenService,
              private _filterEventService: FilterEventService,
              private _userService : UserService) {}

  ngOnInit() {
    this.getUserInfo();
    this._filterEventService.register(this);
  }

  ngOnDestroy() {
    this._filterEventService.unregister(this);
  }

  getUserInfo() {
    if (this._tokenService.getToken()) {
      this._userService.getLoggedUser().subscribe(data => this.userInfo = data);
    }
  }

  onEvent<UserInfoEvent>(event: UserInfoEvent) {
    if (event instanceof UserInfoEvent) {
      this.getUserInfo();
    }
  }

}
