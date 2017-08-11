import { Component } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Router } from "@angular/router";
import { AuthenticationService, UserDataService, AlertService } from "../../services/index";

@Component({
    moduleId: module.id,
    selector: 'account-info',
    templateUrl: 'account-info.component.html',
    styleUrls: ['info-box.component.css']
})

export class AccountInfoComponent {
    isAdmin: boolean;
    username: string;
    data: Object[];

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userDataService: UserDataService,
        private alertService: AlertService
    ) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const token = this.jwtHelper.decodeToken(currentUser.token);
        this.username = token.username;
        this.isAdmin = token.isAdmin;
        this.getIPs();
    }

    getIPs() {
        this.userDataService.getAccount(this.username)
            .subscribe(data => {
                if (data[0] == "ERROR") {
                    this.alertService.error(data[1]);
                    this.data = [];
                    console.log(data[1]);
                } else {
                    this.alertService.nothing();
                    this.data = data;
                    console.log(this.data);
                }
            });
    }

    addNewIP() {
        console.log('not implemented yet');
    }

    report() {
        console.log('not implemented yet');
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}