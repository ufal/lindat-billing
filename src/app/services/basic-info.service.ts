import { Injectable }   from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class BasicInfoService{
    constructor(private http: Http) {
    }

    public getVersion() {
        return this.http.get("./api/version").map((res) => res.json());
    }

    public getStartTime() {
        return this.http.get("./api/startTime").map((res) => res.json());
    }
}
