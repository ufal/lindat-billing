import {Injectable}     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserDataService{
    constructor(private http:Http) {
        console.log('User Service Initialized ...');
    }

    getUser(name: string, from: string, to: string) {
        console.log('Routing to:' + './api/users/' + name + '/from=' + from + "/to=" + to);
        return this.http.get('./api/users/' + name + '/from=' + from + "/to=" + to)
            .map(res => res.json());
    }
}