import { Component, OnInit } from "@angular/core";

import { AlertService } from "../services/index";

@Component({
    moduleId: module.id,
    selector: "alert",
    templateUrl: "alert.component.html",
})

export class AlertComponent {
    private message: any;

    constructor(private alertService: AlertService) { }

    protected ngOnInit() {
        this.alertService.getMessage().subscribe((message) => { this.message = message; });
    }
}
