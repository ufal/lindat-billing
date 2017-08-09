import { Component } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
    moduleId: module.id,
    selector: 'account-info',
    templateUrl: 'account-info.component.html'
})

export class AccountInfoComponent {

    isAdmin: boolean;
    username: string;

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private router: Router, private authenticationService: AuthenticationService) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const token = this.jwtHelper.decodeToken(currentUser.token);
        this.username = token.username;
        this.isAdmin = token.isAdmin;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}