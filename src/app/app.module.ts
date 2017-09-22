import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

// Services
import { TokenService } from './services/token/token.service';
import { ProjectsService } from './services/projects/projects.service';
import { EventsService } from './services/filter-event/events.service';
import { UserService } from './services/user/user.service';
import { IssueService } from './services/issue/issue.service';

// Componentes shared
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { WelcomeComponent } from './components/shared/welcome/welcome.component';
import { UserInfoComponent } from './components/shared/user-info/user-info.component';

// Componentes
import { AppComponent } from './app.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { IssuesListComponent } from './components/issues-list/issues-list.component';

// Rutas
import { APP_ROUTING } from './app.routes';
import { IssuesByProjectNamePipe } from './pipes/issues-by-project-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConfiguracionComponent,
    ProjectsComponent,
    WelcomeComponent,
    ProjectDetailComponent,
    IssuesListComponent,
    UserInfoComponent,
    IssuesByProjectNamePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    JsonpModule,
    APP_ROUTING
  ],
  providers: [TokenService, ProjectsService, EventsService, UserService, IssueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
