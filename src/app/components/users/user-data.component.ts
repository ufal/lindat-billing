import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { IMyOptions, IMyDateRangeModel, IMyDateRange, IMyDateSelected, IMyCalendarViewChanged, IMyInputFieldChanged } from 'mydaterangepicker';
import { AlertService } from '../../services/index';
import { JwtHelper } from 'angular2-jwt';

@Component({
    moduleId: module.id,
    selector: 'user-data',
    templateUrl: 'user-data.component.html',
    styleUrls: [ 'user-data.component.css' ],
})

export class UserDataComponent  {
    title: string;
    data: Object[];
    errorMessage: string;
    isAdmin: boolean;

    jwtHelper: JwtHelper = new JwtHelper();

    model: IMyDateRange = {
        beginDate: {year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate()},
        endDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}
    };
    placeholderTxt: string = 'Insert timespan';

    constructor(
        private userDataService: UserDataService,
        private alertService: AlertService
    ) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const token = this.jwtHelper.decodeToken(currentUser.token);
        if (token.admin) this.isAdmin = true;
        else
        {
            this.isAdmin = false;
            this.title = token.username;
        }
    }

    onClickMe() {
        //this.searchUser();
    }

    // expanding details of a service summary
    expand(p: any) {
        p.expanded = !p.expanded;
    }

    // debug only - testing data
    test(ip: string, from: string, to: string) {
        console.log('Showing prepared sample');
        this.title = ip;
        this.getData(ip, from, to);
    }

    // prepare information to get data of a specific user
    searchUser(event: Event) {
        event.preventDefault();

        if (typeof this.model === undefined || !this.model)
        {
            this.errorMessage = 'The dates you entered are not valid. Check them and try again.';
            this.data = [];
            return;
        }

        const from = this.getStart();
        const to = this.getEnd();

        console.log(from, "to", to);

        this.getData(this.title, from, to);
    }

    //  get data of a specific user
    getData(ip: string, from: string, to: string)
    {
        this.userDataService.getUser(ip, from, to)
            .subscribe(log => {
                if (log[0] == "ERROR") {
                    this.alertService.error(log[1]);
                    this.data = [];
                    console.log(log[1]);
                } else if (log[0] == "EMPTY") {
                    let message = 'User ' + this.title
                        + ' has no relevant data for the period between ' + from + ' and ' + to;
                    this.alertService.error(message);
                    this.data = [];
                } else {
                    this.alertService.nothing();
                    //this.title = '';
                    this.data = log;
                    console.log(this.data);
                }
            });
    }

    // get the starting date of a period
    getStart = () => {
        const date = this.model.beginDate;
        return date.day + "-" + date.month + "-" + date.year;
    };

    // get the ending date of a period
    getEnd() {
        const date = this.model.endDate;
        return date.day + "-" + date.month + "-" + date.year;
    }

    // daterangepicker options
    private myDateRangePickerOptions: IMyOptions = {
        quickRangeSelect: true,
        dateFormat: 'dd.mm.yyyy',
        showClearBtn: false,
        acceptBtnTxt: "Apply",
        markCurrentDay: true,
        minYear: 2015,
        maxYear: new Date().getFullYear(),
        inline: false,
        showClearDateRangeBtn: false,
    };

    // dates changed
    onDateRangeChanged(event: IMyDateRangeModel) {
        this.model = {beginDate: event.beginDate, endDate: event.endDate};
        console.log('onDateRangeChanged(): ', event.formatted, 'with model', this.model);
    }

    clearDateRange() {
        this.model = null;
        console.log('DateRange Cleared');
    }
}
