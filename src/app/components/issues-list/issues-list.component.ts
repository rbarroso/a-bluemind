import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import {IssueService} from "../../services/issue/issue.service";

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit {

  issueList : any[] = [];
  constructor(private _tokenService: TokenService, private _issueService: IssueService) { }

  ngOnInit() {
    this._issueService.getTareasByStatus().subscribe(data => {
      for (let issue of data) {
        this.issueList.push(issue);
      }
    });
  }


}
