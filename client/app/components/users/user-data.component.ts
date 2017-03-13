import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { DateRangeComponent } from '../date-range-picker.component';

@Component({
    moduleId: module.id,
    selector: 'user-data',
    templateUrl: 'user-data.component.html',
})

export class UserDataComponent  {
    title: string;
    data: Object[];
    errorMessage: string;

    constructor(private userDataService:UserDataService, private dateRangeComponent:DateRangeComponent){
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

        var from = this.dateRangeComponent.getStart();
        var to = this.dateRangeComponent.getEnd();

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
                    this.title = '';
                    this.data = log;
                    console.log(this.data);
                }
            });
    }
}
