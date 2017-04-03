import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { IMyOptions, IMyDateRangeModel, IMyDateRange, IMyDateSelected, IMyCalendarViewChanged, IMyInputFieldChanged } from 'mydaterangepicker';

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

    model: IMyDateRange = {
        beginDate: {year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate()},
        endDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}
    }
    placeholderTxt: string = 'Insert timespan';

    constructor(private userDataService:UserDataService){
        this.userDataService.getUser("","","")
            .subscribe(user => {
                //console.log(user);
                //this.user = user;
            });
    }

    onClickMe() {
        //this.searchUser();
    }

    searchUser(event: Event) {
        event.preventDefault();

        if (typeof this.model === undefined || !this.model)
        {
            this.errorMessage = 'The dates you entered are not valid. Check them and try again.';
            return;
        }

        var from = this.getStart();
        var to = this.getEnd();

        console.log(from, "to", to);

        this.userDataService.getUser(this.title, from, to)
            .subscribe(log => {
                if (log[0] == "ERROR") {
                    this.errorMessage = log[1];
                    this.data = [];
                    console.log(log[1]);
                } else if (log[0] == "EMPTY") {
                    this.errorMessage = '';
                    this.title = '';
                } else {
                    this.errorMessage = '';
                    //this.title = '';
                    this.data = log;
                    console.log(this.data);
                }
            });
    }

    getStart = () => {
        var date = this.model.beginDate;
        return date.day + "-" + date.month + "-" + date.year;
    }

    getEnd() {
        var date = this.model.endDate;
        return date.day + "-" + date.month + "-" + date.year;
    }

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


    onDateRangeChanged(event: IMyDateRangeModel) {
        this.model = {beginDate: event.beginDate, endDate: event.endDate};
        console.log('onDateRangeChanged(): ', event.formatted, 'with model', this.model);
    }

    clearDateRange() {
        this.model = null;
        console.log('DateRange Cleared');
    }
}
