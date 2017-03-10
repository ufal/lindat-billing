import { Component } from '@angular/core';
import { UserDataService } from '../services/user-data.service';

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

        var from = "";// + this.model.beginDate.year + "-" + this.model.beginDate.month + "-" + this.model.beginDate.day;
        var to = "";// + this.model.endDate.year + "-" + this.model.endDate.month + "-" + this.model.endDate.day;

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
