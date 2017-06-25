import { Routes, RouterModule } from '@angular/router';

import { UserDataComponent } from './components/users/user-data.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/index';

const appRoutes: Routes = [
    { path: '', component: UserDataComponent/*, canActivate: [AuthGuard]*/ },
    { path: 'login', component: LoginComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);