import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import {UserData} from '../../../user-data';

@Component({
    moduleId: module.id,
    selector: 'user-data',
    templateUrl: 'user-data.component.html',
})

export class UserDataComponent  {
    user: UserData;
    title: string;

    constructor(private userDataService:UserDataService){
        this.userDataService.getUser("")
            .subscribe(user => {
                this.user = user;
            });
    }

    searchUser(event: Event) {
        event.preventDefault();

        var newLogs = {
            //userName: this.title,
            //text: "a"
        }

        this.userDataService.getUser(this.title)
            .subscribe(log => {
                this.user.data = log;
                this.user.userName = this.title;
                this.title = '';
            });
        console.log(this.user.userName);
    //console.log(this.user.data);
    }
}
