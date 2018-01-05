import {Injectable}     from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class UserDataService{
    constructor(private http: Http) {
        console.log("User Service Initialized ...");
    }

    public getUser(name: string, from: string, to: string) {
        return this.http.get("./api/users/" + name + "/from=" + from + "/to=" + to)
            .map((res) => res.json());
    }

    public getAccount(name: string) {
        return this.http.get("./api/users/account/" + name).map((res) => res.json());
    }
}
