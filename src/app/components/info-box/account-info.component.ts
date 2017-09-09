import { Component } from '@angular/core';
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

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userDataService: UserDataService,
        private alertService: AlertService
    ) {
        this.username = authenticationService.getUsername();
        this.isAdmin = authenticationService.isAdmin();
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

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}