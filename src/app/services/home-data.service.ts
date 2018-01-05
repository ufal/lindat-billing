import {Injectable}     from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class HomeDataService{
    constructor(private http: Http) {
        console.log("Home Service Initialized ...");
    }

    public getLogins(admin: boolean, username: string) {
        if (admin) {
            return this.http.get("./api/home").map((res) => res.json());
        }
        else {
            return this.http.get("./api/home/" + username).map((res) => res.json());
        }
    }
}
