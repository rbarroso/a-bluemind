import {RouterModule, Routes} from '@angular/router';
import {ProjectsComponent} from './components/projects/projects.component';
import {ConfiguracionComponent} from './components/configuracion/configuracion.component';

const APP_ROUTES: Routes = [
  { path: 'projects', component: ProjectsComponent },
  { path: 'config', component: ConfiguracionComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'projects' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });
