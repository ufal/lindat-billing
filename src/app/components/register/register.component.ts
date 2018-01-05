import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AlertService, AuthenticationService } from "../../services/index";

@Component({
    moduleId: module.id,
    templateUrl: "register.component.html",
})

export class RegisterComponent {
    protected model: any = {};
    protected loading = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    // register new account
    protected register() {
        console.log("Registration Component - Register");
        if (this.isValid(this.model.password)) {
            this.loading = true;
            this.authenticationService.addAccount(this.model)
                .subscribe(
                    (data) => {
                        this.alertService.success("Registration successful", true);
                        this.router.navigate(["/login"]);
                    },
                    (error) => {
                        this.alertService.error(error.json().message.reason);
                        this.loading = false;
                    });
        }
    }

    // password validation
    protected isValid(password: string)
    {
        if (password.length < 5)
        {
            this.alertService.error("Password must be at least 5 characters long!");
            return false;
        }
        return true;
    }
}
