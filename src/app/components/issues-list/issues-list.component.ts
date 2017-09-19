import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit {

  constructor(private _tokenService: TokenService) { }

  ngOnInit() {
  }

}
