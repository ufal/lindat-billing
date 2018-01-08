import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy }  from "@angular/common";
import { NgModule }       from "@angular/core";
import { FormsModule }    from "@angular/forms";
import { HttpModule }     from "@angular/http";
import { BrowserModule }  from "@angular/platform-browser";
import { AppComponent }   from "./app.component";
import { Routing }        from "./app.routing";

import { AccountInfoComponent, AccountsManagementComponent, AdminInfoComponent,
    HomeComponent, LoginComponent, NavBarComponent,
    PageNotFoundComponent, RegisterComponent, ServicePricingComponent, UserDataComponent } from "./components/index";
import { AlertComponent }    from "./directives/index";

import { MyDateRangePickerModule } from "mydaterangepicker";
import { AuthGuard } from "./guards/index";
import { AccountDataService, AlertService, AuthenticationService, HomeDataService,
    LoggerService, PricingService } from "./services/index";

@NgModule({
    bootstrap:    [ AppComponent ],
    declarations: [
        AccountInfoComponent,
        AccountsManagementComponent,
        AdminInfoComponent,
        AlertComponent,
        AppComponent,
        HomeComponent,
        LoginComponent,
        NavBarComponent,
        PageNotFoundComponent,
        RegisterComponent,
        ServicePricingComponent,
        UserDataComponent,
    ],
  imports: [
      BrowserModule,
      HttpModule,
      FormsModule,
      MyDateRangePickerModule,
      Routing,
  ],
  providers: [
      AuthGuard,
      AlertService,
      AuthenticationService,
      HomeDataService,
      LoggerService,
      PricingService,
      AccountInfoComponent,
      AccountDataService,
      {provide: LocationStrategy, useClass: HashLocationStrategy },
      {provide: APP_BASE_HREF, useValue: "/"},
  ],
})

export class AppModule { }
