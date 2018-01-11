import { Component } from "@angular/core";
import { IMyDateRange, IMyDateRangeModel, IMyOptions } from "mydaterangepicker";
import { AlertService, AuthenticationService, LoggerService, UserDataService } from "../../services/index";

@Component({
    moduleId: module.id,
    selector: "user-data",
    styleUrls: [ "user-data.component.css" ],
    templateUrl: "user-data.component.html",
})

export class UserDataComponent  {
    protected title: string;
    protected data: Object[];
    protected errorMessage: string;
    protected isAdmin: boolean;
    protected totalSum: number;

    protected model: IMyDateRange = {
        beginDate: {year: 0, month: 0, day: 0},
        endDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
    };
    protected readonly placeholderTxt: string = "Insert timespan";

    constructor(
        private userDataService: UserDataService,
        private alertService: AlertService,
        private loggerService: LoggerService,
        private authenticationService: AuthenticationService,
    ) {
        this.isAdmin = authenticationService.isAdmin();
        let today = new Date();
        today.setMonth(today.getMonth() - 1);
        this.model.beginDate.year = today.getFullYear();
        this.model.beginDate.month = today.getMonth() + 1;
        this.model.beginDate.day = today.getDate();
        this.totalSum = 0;
    }

    // expanding details of a service summary
    protected expand(p: any) {
        p.expanded = !p.expanded;
    }

    // debug only - testing data
    protected test(ip: string, from: string, to: string) {
        console.log("Showing prepared sample");
        this.title = ip;
        this.getData(ip, from, to);
    }

    // prepare information to get data of a specific user
    protected searchUser(/*event: Event*/) {
        //event.preventDefault();

        if (typeof this.model === undefined || !this.model)
        {
            this.errorMessage = "The dates you entered are not valid. Check them and try again.";
            this.data = [];
            return;
        }

        const from = this.getStart();
        const to = this.getEnd();

        console.log(from, "to", to);

        this.getData(this.title, from, to);
    }

    //  get data of a specific user
    protected getData(ip: string, from: string, to: string)
    {
        this.userDataService.getUser(ip, from, to)
            .subscribe((log) => {
                if (log[0] === "ERROR") {
                    this.alertService.error(log[1]);
                    this.data = [];
                    this.loggerService.log("debug", log[1]);
                } else if (log[0] === "EMPTY") {
                    let message = "User " + this.title
                        + " has no relevant data for the period between " + from + " and " + to;
                    this.alertService.error(message);
                    this.data = [];
                } else {
                    this.alertService.nothing();
                    //this.title = '';
                    this.data = log;
                    console.log(this.data);
                    this.totalSum = 0;
                    for (let item of log) {
                        this.totalSum += item.total * item.price;
                    }
                }
            });
    }

    protected lastPeriod(what: string)
    {
        let now = new Date();

        switch (what)
        {
            case "month" :
                now.setMonth(now.getMonth() - 1);
                break;
            case "week" :
                now.setDate(now.getDate() - 7);
                break;
            case "day"  :
                now.setDate(now.getDate() - 1);
                break;
            default :
        }

        const from = now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
        const to = new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear();

        this.getData(this.title, from, to);
    }

    // get the starting date of a period
    private getStart() {
        const date = this.model.beginDate;
        return date.day + "-" + date.month + "-" + date.year;
    }

    // get the ending date of a period
    private getEnd() {
        const date = this.model.endDate;
        return date.day + "-" + date.month + "-" + date.year;
    }

    // daterangepicker options
    protected  myDateRangePickerOptions: IMyOptions = {
        dateFormat: "dd.mm.yyyy",
        inline: false,
        markCurrentDay: true,
        maxYear: new Date().getFullYear(),
        minYear: 2015,
        showClearBtn: false,
        showClearDateRangeBtn: false,
    };

    // dates changed
    protected onDateRangeChanged(event: IMyDateRangeModel) {
        this.model = {beginDate: event.beginDate, endDate: event.endDate};
        console.log("onDateRangeChanged(): ", event.formatted, "with model", this.model);
    }
}
