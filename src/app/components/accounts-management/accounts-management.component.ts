import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AccountDataService, AlertService, AuthenticationService } from "../../services/index";

@Component({
    moduleId: module.id,
    selector: "accounts-management",
    styleUrls: ["accounts-management.component.css"],
    templateUrl: "accounts-management.component.html",
})

export class AccountsManagementComponent {

    protected isAdmin: boolean;
    protected username: string;
    protected data: Object[];
    protected ipToAdd: string;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private accountDataService: AccountDataService,
    ) {
        this.isAdmin = authenticationService.isAdmin();
        this.username = this.authenticationService.getUsername();
        this.getAllAccounts();
    }

    protected getAllAccounts() {
        this.accountDataService.getAll()
            .subscribe((data) => {
                if (data[0] === "ERROR") {
                    this.alertService.error(data[1]);
                    this.data = [];
                } else {
                    this.alertService.nothing();
                    this.data = data;
                }
            });
    }

    protected addNewIP() {
        this.accountDataService.addNewIP(this.ipToAdd, this.username)
            .subscribe((message) => {
                if (message.toString() === "ERROR") {
                    this.alertService.error("Failed to add IP!");
                } else if (message.toString() === "SUCCESS") {
                    this.alertService.success("New IP successfully added!");
                } else {
                    this.alertService.error("We are sorry but something unexpected just happened");
                }
            });
    }

    protected reportIP() {
        this.accountDataService.reportIP(this.ipToAdd, this.username)
            .subscribe((message) => {
                if (message.toString() === "ERROR") {
                    this.alertService.error("Failed to report IP!");
                } else if (message.toString() === "SUCCESS") {
                    this.alertService.success("The IP was successfully reported!");
                } else {
                    this.alertService.error("Not yet implemented");
                }
            });
    }

    protected changePassword() {
        this.alertService.error("Not yet implemented");
    }

    protected expand(p: any) {
        p.expanded = !p.expanded;
    }
}
