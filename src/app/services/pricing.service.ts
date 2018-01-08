import {Injectable}     from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class PricingService{
    constructor(private http: Http) {
        console.log("Pricing Service Initialized ...");
    }

    public getPrices(name: string) {
        return this.http.get("./api/pricing/" + name)
            .map((res) => res.json());
    }

}
