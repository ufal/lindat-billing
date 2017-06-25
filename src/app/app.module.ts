import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { FormsModule }    from '@angular/forms';
import { AppComponent }   from './app.component';
import { UserDataComponent } from './components/users/user-data.component';
import { LoginComponent } from './components/login/login.component';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { AlertComponent } from './directives/index';
import { AlertService, AuthenticationService } from './services/index';
import { AuthGuard } from './guards/index';
import { routing }        from './app.routing';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  imports: [
      BrowserModule,
      HttpModule,
      FormsModule,
      MyDateRangePickerModule,
      routing
  ],
  declarations: [
      AppComponent,
      UserDataComponent,
      AlertComponent,
      LoginComponent
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
