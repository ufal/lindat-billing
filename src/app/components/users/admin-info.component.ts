import { Component } from '@angular/core';
import { BasicInfoService, AuthenticationService } from '../../services/index';
import { JwtHelper } from 'angular2-jwt';
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'admin-info',
    templateUrl: 'admin-info.component.html'
})

export class AdminInfoComponent {

    isAdmin: boolean;
    username: string;
    version: string;

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        private router: Router,
        private basicInfoService: BasicInfoService,
        private authenticationService: AuthenticationService
    ) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const token = this.jwtHelper.decodeToken(currentUser.token);
        this.username = token.username;
        this.isAdmin = token.isAdmin;
        this.basicInfoService.getVersion().subscribe(version => this.version = version);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}