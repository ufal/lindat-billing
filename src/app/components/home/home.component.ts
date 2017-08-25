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

    constructor(
        private homeDataService: HomeDataService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private loggerService: LoggerService) {
        this.getData();
        this.isAdmin = authenticationService.isAdmin();
    }

    getData()
    {
        this.homeDataService.getLogins()
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