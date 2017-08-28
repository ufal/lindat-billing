import { Component } from '@angular/core';
import { BasicInfoService, AuthenticationService } from '../../services/index';
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'admin-info',
    templateUrl: 'admin-info.component.html',
    styleUrls: ['info-box.component.css']
})

export class AdminInfoComponent {

    isAdmin: boolean;
    username: string;
    version: string;
    startTime: object;

    constructor(
        private router: Router,
        private basicInfoService: BasicInfoService,
        private authenticationService: AuthenticationService
    ) {
        this.username = authenticationService.getUsername();
        this.isAdmin = authenticationService.isAdmin();
        this.basicInfoService.getVersion().subscribe(version => this.version = version);
        this.basicInfoService.getStartTime().subscribe(startTime => this.startTime = startTime);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}