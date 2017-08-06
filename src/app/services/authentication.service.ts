import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../models/user';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    // login into the app - get the JWT
    login(username: string, password: string) {
        console.log('Auth Service - Login');
        var body = {username: username, password: password};
        return this.http.post('./api/authenticate', body)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user.success && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });
    }

    // handle registration
    addAccount(user: User) {
        console.log('Auth Service - Registration');
        return this.http.post('./api/accounts', user, this.jwt());
    }

    // remove user from local storage to log user out
    logout() {
        localStorage.removeItem('currentUser');
    }

    // create authorization header with jwt token
    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}