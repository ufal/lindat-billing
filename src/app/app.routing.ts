import { Routes, RouterModule } from '@angular/router';
import { UserDataComponent } from './components/users/user-data.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
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