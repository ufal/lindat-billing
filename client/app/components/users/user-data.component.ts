import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { IMyOptions } from 'mydaterangepicker';

@Component({
    moduleId: module.id,
    selector: 'user-data',
    templateUrl: 'user-data.component.html',
})

export class UserDataComponent  {
    title: string;
    data: Object[];
    errorMessage: string;

    constructor(private userDataService:UserDataService){
        this.userDataService.getUser("")
            .subscribe(user => {
                //console.log(user);
                //this.user = user;
            });
    }

    options: IMyOptions = {
        quickRangeSelect: true,
        dateFormat: 'dd.mm.yyyy',
        showClearBtn: false,
        acceptBtnTxt: "Set",
        markCurrentDay: true,
        minYear: 2015,
        maxYear: new Date().getFullYear(),
        inline: false,
    };

    // For example initialize to specific date (09.10.2018 - 19.10.2018). It is also possible
    // to set initial date range value using the selDateRange attribute.
    private model:
        Object = {
        beginDate: {year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate()},
        endDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}
    };

    searchUser(event: Event) {
        event.preventDefault();

        this.userDataService.getUser(this.title)
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
                    this.title = '';
                    this.data = log;
                    console.log(this.data);
                }
            });
    }
}
