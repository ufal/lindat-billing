import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';

@Component({
    moduleId: module.id,
    selector: 'user-data',
    templateUrl: 'user-data.component.html',
})

export class UserDataComponent  {
    title: string;
    data: Object[];

    constructor(private userDataService:UserDataService){
        this.userDataService.getUser("")
            .subscribe(user => {
                //console.log(user);
                //this.user = user;
            });
    }

    searchUser(event: Event) {
        event.preventDefault();

        this.userDataService.getUser(this.title)
            .subscribe(log => {
                console.log(log);
                this.title = '';
                this.data = log;
                console.log("zde");
                console.log(this.data);
            });
    }
}
