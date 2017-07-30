import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../models/user';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        console.log('Auth Service Login');
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

    addAccount(user: User) {
        console.log('register');
        return this.http.post('/api/accounts', user, this.jwt()).map((response: Response) => response.json());
    }

    logout() {
        console.log('logout');
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
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