import { Component }    from '@angular/core';
import { UserDataService }  from './services/user-data.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [UserDataService]
})

export class AppComponent  { }
