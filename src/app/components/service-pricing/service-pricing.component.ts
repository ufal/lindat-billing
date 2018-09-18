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
    protected data: any[];
    protected sizes: any[];
    protected username: string;

    constructor(
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private loggerService: LoggerService,
        private pricingService: PricingService)
    {
        this.isAdmin = authenticationService.isAdmin();
        this.username = authenticationService.getUsername();
        this.getData();
        this.getSizes();
    }

    protected getData() {
        this.pricingService.getPrices(this.username)
            .subscribe((pricing) => {
                if (pricing[0] === "ERROR") {
                    this.alertService.error(pricing[1]);
                    this.data = [];
                    this.loggerService.log("debug", pricing[1]);
                } else {
                    this.alertService.nothing();
                    this.data = pricing;
                }
            });
    }

    protected getSizes() {
        this.pricingService.getUnitSizes()
            .subscribe((sizing) => {
                this.sizes = sizing;
            });
    }

    protected increasePrice(item: any)
    {
        item.value = item.value + 1;
        this.updateDatabase(item);
    }

    protected decreasePrice(item: any)
    {
        if (item.value > 0) {
            item.value = item.value - 1;
            this.updateDatabase(item);
        }
    }

    protected updateDatabase(changed: any)
    {
        for (let item of this.data)
        {
            if (item.name === changed.name) {
                item.value = changed.value;
            }
        }
        this.pricingService.setPrices(this.username, this.data)
            .subscribe((pricing) => {
                if (pricing[0] === "ERROR") {
                    this.alertService.error(pricing[1]);
                    this.loggerService.log("debug", pricing[1]);
                } else {
                    this.alertService.nothing();
                }
            });
    }
}
