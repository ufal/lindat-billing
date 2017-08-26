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
    data: Object[];

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private accountDataService: AccountDataService
    ) {
        this.isAdmin = authenticationService.isAdmin();
        this.getAllAccounts();
    }

    getAllAccounts()
    {
        this.accountDataService.getAll()
            .subscribe(data => {
                if (data[0] == "ERROR") {
                    this.alertService.error(data[1]);
                    this.data = [];
                } else {
                    this.alertService.nothing();
                    this.data = data;
                    console.log(this.data);
                }
            });
    }

    expand(p: any) {
        p.expanded = !p.expanded;
    }
}