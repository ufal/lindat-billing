import { RouterModule, Routes } from "@angular/router";
import { AccountsManagementComponent, HomeComponent, LoginComponent, PageNotFoundComponent, RegisterComponent,
    ServicePricingComponent, UserDataComponent } from "./components/index";
import { AuthGuard } from "./guards/index";

const appRoutes: Routes = [
    // intro site
    //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: "", redirectTo: "home", pathMatch: "full" },

    // login page (intro side + not logged in)
    { path: "login", component: LoginComponent},

    // registration of new user
    { path: "register", component: RegisterComponent },

    { path: "home", component: HomeComponent, canActivate: [AuthGuard] },

    { path: "data", component: UserDataComponent, canActivate: [AuthGuard]},

    { path: "accounts", component: AccountsManagementComponent, canActivate: [AuthGuard]},

    { path: "pricing", component: ServicePricingComponent, canActivate: [AuthGuard]},

    // otherwise redirect to not found
    { path: "**", component: PageNotFoundComponent },
];

export const Routing = RouterModule.forRoot(appRoutes);
