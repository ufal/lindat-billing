import { Component } from "@angular/core";
import { AlertService, AuthenticationService, LoggerService, PricingService } from "../../services/index";

@Component({
    moduleId: module.id,
    selector: "service-pricing",
    styleUrls: [ "service-pricing.component.css" ],
    templateUrl: "service-pricing.component.html",
})

export class ServicePricingComponent {
    protected isAdmin: boolean;
    protected data: Object[];

    constructor(
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private loggerService: LoggerService,
        private pricingService: PricingService)
    {
        this.isAdmin = authenticationService.isAdmin();
        this.getData();
    }

    protected getData()
    {
        this.pricingService.getPrices("")
            .subscribe((pricing) => {
                if (pricing[0] === "ERROR") {
                    this.alertService.error(pricing[1]);
                    this.data = [];
                    this.loggerService.log("debug", pricing[1]);
                } else {
                    this.alertService.nothing();
                    this.data = pricing;
                    console.log(this.data);
                }
            });
    }
}
