import { BrowserModule } from '@angular/platform-browser';
import {HttpModule, JsonpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

// Services
import { TokenService } from './services/token/token.service';
import { ProjectsService } from './services/projects/projects.service';
import { FilterEventService } from './services/filter-event/filter-event.service';

// Componentes shared
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import {WelcomeComponent} from './components/shared/welcome/welcome.component';

// Componentes
import { AppComponent } from './app.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { ProjectsComponent } from './components/projects/projects.component';

// Rutas
import { APP_ROUTING } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConfiguracionComponent,
    ProjectsComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    JsonpModule,
    APP_ROUTING
  ],
  providers: [TokenService, ProjectsService, FilterEventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
