import {Injectable}     from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class AccountDataService{
    constructor(private http: Http) {
        console.log("Account Service Initialized ...");
    }

    public getAll() {
        return this.http.get("./api/users/accounts").map((res) => res.json());
    }

    public addNewIP(address: string, username: string) {
        const body = {username, address};
        return this.http.post("./api/users/account/addNewIP", body);
    }

    public reportIP(address: string, username: string) {
        const body = {username, address};
        return this.http.post("./api/users/account/reportIP", body);
    }
}
