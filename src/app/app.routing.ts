import { Routes, RouterModule } from '@angular/router';

import { UserDataComponent } from './components/users/user-data.component';

const appRoutes: Routes = [
    { path: '', component: UserDataComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);