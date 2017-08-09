import { Routes, RouterModule } from '@angular/router';
import { UserDataComponent, LoginComponent, RegisterComponent } from './components/index';
import { AuthGuard } from './guards/index';

const appRoutes: Routes = [
    // intro site
    { path: '', component: UserDataComponent, canActivate: [AuthGuard] },

    // login page (intro side + not logged in)
    { path: 'login', component: LoginComponent},

    // registration of new user
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);