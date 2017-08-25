import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../models/user';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: Http) { }

    // login into the app - get the JWT
    login(username: string, password: string) {
        console.log('Auth Service - Login');
        const body = {username: username, password: password};
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

    isAdmin() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const token = this.jwtHelper.decodeToken(currentUser.token);
        if (token.admin) return true;
        else return false;
    }

    getUsername() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const token = this.jwtHelper.decodeToken(currentUser.token);
        return token.username;
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