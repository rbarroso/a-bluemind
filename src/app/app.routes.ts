import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import {IssuesListComponent} from './components/issues-list/issues-list.component';

const APP_ROUTES: Routes = [
  { path: 'issues', component: IssuesListComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/detail/:redmineId', component: ProjectDetailComponent },
  { path: 'config', component: ConfiguracionComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'projects' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });
