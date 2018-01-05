import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { AlertService, AuthenticationService } from "../../services/index";

@Component({
    moduleId: module.id,
    templateUrl: "login.component.html",
})

export class LoginComponent implements OnInit {
    protected model: any = {};
    protected loading = false;
    protected returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    public ngOnInit() {
        console.log("Login Component - Initialization");
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    }

    protected login() {
        console.log("Login Component - Login");
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                (data) => {
                    this.alertService.success("Login succesful");
                    this.router.navigate([this.returnUrl]);
                },
                (error) => {
                    this.alertService.error(error.json().message.reason);
                    this.loading = false;
                });
    }
}
