import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    private jwtHelper: JwtHelper = new JwtHelper();

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("Auth Guard");
        let token = localStorage.getItem("currentUser");
        if (token) {
            if (!this.jwtHelper.isTokenExpired(token)) {
                // logged in so return true
                console.log("Already logged in");
                return true;
            }
            else {
                console.log("Token expired");
                localStorage.removeItem("currentUser");
            }
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(["/login"], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
