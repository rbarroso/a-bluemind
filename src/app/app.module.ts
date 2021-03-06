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
import { DataService } from './services/data/data.service';

// Componentes shared
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { WelcomeComponent } from './components/shared/welcome/welcome.component';
import { UserInfoComponent } from './components/shared/user-info/user-info.component';
import { LoaderComponent } from './components/shared/loader/loader.component';

// Componentes
import { AppComponent } from './app.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { IssuesListComponent } from './components/issues-list/issues-list.component';

// Pipes
import { IssuesByProjectNamePipe } from './pipes/issues-by-project-name.pipe';

// Rutas
import { APP_ROUTING } from './app.routes';

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
    IssuesByProjectNamePipe,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    JsonpModule,
    APP_ROUTING
  ],
  providers: [TokenService, ProjectsService, EventsService, UserService, IssueService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
