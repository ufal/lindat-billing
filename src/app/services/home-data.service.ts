import {Injectable}     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeDataService{
    constructor(private http:Http) {
        console.log('Home Service Initialized ...');
    }

    getLogins(admin: boolean, username: string) {
        if (admin) return this.http.get('./api/home').map(res => res.json());
        else return this.http.get('./api/home/' + username).map(res => res.json());
    }
}