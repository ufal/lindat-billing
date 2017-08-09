import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { FormsModule }    from '@angular/forms';
import { AppComponent }   from './app.component';
import { Routing }        from './app.routing';
import { APP_BASE_HREF }  from '@angular/common';

import { UserDataComponent, AccountInfoComponent, AdminInfoComponent, LoginComponent, RegisterComponent, NavBarComponent } from './components/index';
import { AlertComponent }    from './directives/index';

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
      AccountInfoComponent,
      AlertComponent,
      LoginComponent,
      RegisterComponent,
      NavBarComponent
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
