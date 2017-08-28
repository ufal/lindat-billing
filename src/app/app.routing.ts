import { Routes, RouterModule } from '@angular/router';
import { UserDataComponent, LoginComponent, RegisterComponent, HomeComponent, PageNotFoundComponent, AccountsManagementComponent } from './components/index';
import { AuthGuard } from './guards/index';

const appRoutes: Routes = [
    // intro site
    //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    // login page (intro side + not logged in)
    { path: 'login', component: LoginComponent},

    // registration of new user
    { path: 'register', component: RegisterComponent },

    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

    { path: 'data', component: UserDataComponent, canActivate: [AuthGuard]},

    { path: 'accounts', component: AccountsManagementComponent, canActivate: [AuthGuard]},

    // otherwise redirect to not found
    { path: '**', component: PageNotFoundComponent }
];

export const Routing = RouterModule.forRoot(appRoutes);