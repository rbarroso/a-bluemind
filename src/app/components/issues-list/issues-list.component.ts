import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import {IssueService} from "../../services/issue/issue.service";
import {Observable} from 'rxjs/Observable';
import {Issue} from '../../models/issue';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit {

  issues: Observable<Issue[]>;
  projectsName: string[] = [];
  issuesA: Issue[] = [];
  constructor(private _tokenService: TokenService, private _issueService: IssueService) { }

  ngOnInit() {
    this.getIssues();
  }

  getIssues(): void {
    this.issues = this._issueService.getTareasByStatus();
    this.issues.subscribe(items => {
      this.issuesA = items;
      this.projectsName = Array.from(new Set(items.map(item => item.project.name)));
    });
  }

}
