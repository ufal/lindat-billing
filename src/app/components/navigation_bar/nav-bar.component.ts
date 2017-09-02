import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'nav-bar',
    templateUrl: 'nav-bar.component.html'
})

export class NavBarComponent {
    isAdmin: boolean;

    constructor(
        private authenticationService: AuthenticationService,
    ) {
        this.isAdmin = authenticationService.isAdmin();
    }
}