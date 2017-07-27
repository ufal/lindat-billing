import {Injectable}     from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../models/user';
import 'rxjs/add/operator/map';

@Injectable()
export class UserDataService{
    constructor(private http:Http) {
        console.log('User Service Initialized ...');
    }
/*
    getUser() {
        return this.http.get('http://localhost:3000/api/users')
            .map(res => res.json());
    }
*//*
    getUser(name: string) {
        return this.http.get('http://localhost:3020/api/users/' + name)
            .map(res => res.json());
    }*/

    getUser(name: string, from: string, to: string) {
        console.log('Routing to:' + './api/users/' + name + '/from=' + from + "/to=" + to);
        return this.http.get('./api/users/' + name + '/from=' + from + "/to=" + to)
            .map(res => res.json());
        //return this.http.get('http://localhost:3020/api/users/' + name + '/from=' + from + "/to=" + to)
        //    .map(res => res.json());
    }

    addUser(user: User) {
        return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}