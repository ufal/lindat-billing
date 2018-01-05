import { Component } from "@angular/core";
import {Router} from "@angular/router";
import { AuthenticationService, BasicInfoService } from "../../services/index";

@Component({
    moduleId: module.id,
    selector: "admin-info",
    styleUrls: ["info-box.component.css"],
    templateUrl: "admin-info.component.html",
})

export class AdminInfoComponent {

    protected isAdmin: boolean;
    private username: string;
    private version: string;
    private startTime: object;

    constructor(
        private router: Router,
        private basicInfoService: BasicInfoService,
        private authenticationService: AuthenticationService,
    ) {
        this.username = authenticationService.getUsername();
        this.isAdmin = authenticationService.isAdmin();
        this.basicInfoService.getVersion().subscribe((version) => this.version = version);
        this.basicInfoService.getStartTime().subscribe((startTime) => this.startTime = startTime);
    }

    protected logout() {
        this.authenticationService.logout();
        this.router.navigate(["/login"]);
    }
}
