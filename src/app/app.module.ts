import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { FormsModule }    from '@angular/forms';
import { AppComponent }   from './app.component';
import { Routing }        from './app.routing';
import { APP_BASE_HREF } from '@angular/common';

import { UserDataComponent } from './components/users/user-data.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AlertComponent } from './directives/index';
import { AdminInfoComponent } from "./components/users/admin-info.component";

import { AlertService, AuthenticationService } from './services/index';
import { AuthGuard } from './guards/index';
import { MyDateRangePickerModule } from 'mydaterangepicker';

@NgModule({
  imports: [
      BrowserModule,
      HttpModule,
      FormsModule,
      MyDateRangePickerModule,
      Routing
  ],
  declarations: [
      AppComponent,
      UserDataComponent,
      AdminInfoComponent,
      AlertComponent,
      LoginComponent,
      RegisterComponent
  ],
  providers: [
      AuthGuard,
      AlertService,
      AuthenticationService,
      {provide: APP_BASE_HREF, useValue: './'}
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
