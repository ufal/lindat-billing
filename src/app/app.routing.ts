import { Routes, RouterModule } from '@angular/router';
import { UserDataComponent, LoginComponent, RegisterComponent, HomeComponent } from './components/index';
import { AuthGuard } from './guards/index';

const appRoutes: Routes = [
    // intro site
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },

    // login page (intro side + not logged in)
    { path: 'login', component: LoginComponent},

    // registration of new user
    { path: 'register', component: RegisterComponent },

    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

    { path: 'data', component: UserDataComponent, canActivate: [AuthGuard]},

    { path: 'accounts', component: UserDataComponent, canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);