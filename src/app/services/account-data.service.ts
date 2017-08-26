import {Injectable}     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountDataService{
    constructor(private http:Http) {
        console.log('Account Service Initialized ...');
    }

    getAll() {
        return this.http.get('./api/users/accounts').map(res => res.json());
    }
}