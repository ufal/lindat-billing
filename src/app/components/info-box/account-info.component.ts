import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AlertService, AuthenticationService, UserDataService } from "../../services";

@Component({
    moduleId: module.id,
    selector: "account-info",
    styleUrls: ["info-box.component.css"],
    templateUrl: "account-info.component.html",
})

export class AccountInfoComponent {
    private isAdmin: boolean;
    private username: string;
    private data: Object[];

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userDataService: UserDataService,
        private alertService: AlertService,
    ) {
        this.username = authenticationService.getUsername();
        this.isAdmin = authenticationService.isAdmin();
        this.getIPs();
    }

    protected getIPs() {
        this.userDataService.getAccount(this.username)
            .subscribe((data) => {
                if (data[0] === "ERROR") {
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

    protected logout() {
        this.authenticationService.logout();
        this.router.navigate(["/login"]);
    }
}
