import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AlertService, AuthenticationService } from "../../services/index";

@Component({
    moduleId: module.id,
    templateUrl: "service-pricing.component.html",
})

export class ServicePricingComponent {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }
}
