import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AlertService, AuthenticationService, HomeDataService, LoggerService  } from "../../services";

@Component({
    moduleId: module.id,
    styleUrls: [ "home.component.css" ],
    templateUrl: "home.component.html",
})

export class HomeComponent {
    private data: Object[];
    private isAdmin: boolean;
    private username: string;

    constructor(
        private homeDataService: HomeDataService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private loggerService: LoggerService) {
        this.isAdmin = authenticationService.isAdmin();
        this.username = authenticationService.getUsername();
        this.getData();
    }

    protected getData()
    {
        this.homeDataService.getLogins(this.isAdmin, this.username)
            .subscribe((log) => {
                if (log[0] === "ERROR") {
                    this.alertService.error(log[1]);
                    this.data = [];
                    this.loggerService.log("error", log[1]);
                } else {
                    this.alertService.nothing();
                    this.data = log;
                }
            });
    }

}
