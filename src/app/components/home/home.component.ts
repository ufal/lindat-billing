import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, HomeDataService, LoggerService  } from '../../services/index';
import { JwtHelper } from 'angular2-jwt';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: [ 'home.component.css' ]
})

export class HomeComponent {
    data: Object[];
    isAdmin: boolean;
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        private homeDataService: HomeDataService,
        private alertService: AlertService,
        private loggerService: LoggerService) {
        this.getData();
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const token = this.jwtHelper.decodeToken(currentUser.token);
        if (token.admin) this.isAdmin = true;
        else
        {
            this.isAdmin = false;
            //this.title = token.username;
        }
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