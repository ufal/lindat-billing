import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { JwtHelper } from "angular2-jwt";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { User } from "../models/user";

@Injectable()
export class AuthenticationService {
    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: Http) { }

    // login into the app - get the JWT
    public login(username: string, password: string) {
        console.log("Auth Service - Login");
        const body = {username, password};
        return this.http.post("./api/authenticate", body)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user.success && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem("currentUser", JSON.stringify(user));
                }
                return user;
            });
    }

    // handle registration
    public addAccount(user: User) {
        console.log("Auth Service - Registration");
        return this.http.post("./api/accounts", user, this.jwt());
    }

    // remove user from local storage to log user out
    public logout() {
        localStorage.removeItem("currentUser");
    }

    public isAdmin() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const token = this.jwtHelper.decodeToken(currentUser.token);
        if (token.admin) {
            return true;
        }
        else {
            return false;
        }
    }

    public getUsername() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const token = this.jwtHelper.decodeToken(currentUser.token);
        return token.username;
    }

    // create authorization header with jwt token
    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ Authorization: "Bearer " + currentUser.token });
            return new RequestOptions({ headers });
        }
    }
}
