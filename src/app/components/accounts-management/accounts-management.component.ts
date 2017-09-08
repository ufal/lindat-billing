import { Component } from '@angular/core';
import { AuthenticationService, AccountDataService, AlertService } from '../../services/index';
import { Router } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'accounts-management',
    templateUrl: 'accounts-management.component.html',
    styleUrls: ['accounts-management.component.css']
})

export class AccountsManagementComponent {

    isAdmin: boolean;
    username: string;
    data: Object[];
    ipToAdd: string;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private accountDataService: AccountDataService
    ) {
        this.isAdmin = authenticationService.isAdmin();
        this.username = this.authenticationService.getUsername();
        this.getAllAccounts();
    }

    getAllAccounts() {
        this.accountDataService.getAll()
            .subscribe(data => {
                if (data[0] == "ERROR") {
                    this.alertService.error(data[1]);
                    this.data = [];
                } else {
                    this.alertService.nothing();
                    this.data = data;
                }
            });
    }

    addNewIP() {
        this.accountDataService.addNewIP(this.ipToAdd, this.username)
            .subscribe(message => {
                if (message.toString() == "ERROR") {
                    this.alertService.error('Failed to add IP!');
                } else if (message.toString() == "SUCCESS") {
                    this.alertService.success('New IP successfully added!');
                } else {
                    this.alertService.error('We are sorry but something unexpected just happened');
                }
            });
    }

    reportIP() {
        this.accountDataService.reportIP(this.ipToAdd, this.username)
            .subscribe(message => {
                if (message.toString() == "ERROR") {
                    this.alertService.error('Failed to report IP!');
                } else if (message.toString() == "SUCCESS") {
                    this.alertService.success('The IP was successfully reported!');
                } else {
                    this.alertService.error('Not yet implemented');
                }
            });
    }

    changePassword() {
        this.alertService.error('Not yet implemented');
    }

    expand(p: any) {
        p.expanded = !p.expanded;
    }
}