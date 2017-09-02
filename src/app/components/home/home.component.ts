import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, HomeDataService, LoggerService, AuthenticationService  } from '../../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: [ 'home.component.css' ]
})

export class HomeComponent {
    data: Object[];
    isAdmin: boolean;
    username: string;

    constructor(
        private homeDataService: HomeDataService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private loggerService: LoggerService) {
        this.isAdmin = authenticationService.isAdmin();
        this.username = authenticationService.getUsername();
        this.getData();
    }

    getData()
    {
        this.homeDataService.getLogins(this.isAdmin, this.username)
            .subscribe(log => {
                if (log[0] == "ERROR") {
                    this.alertService.error(log[1]);
                    this.data = [];
                    this.loggerService.log('error',log[1]);
                } else {
                    this.alertService.nothing();
                    this.data = log;
                }
            });
    }

}