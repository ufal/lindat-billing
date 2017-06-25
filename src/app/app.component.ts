import { Component }    from '@angular/core';
import { UserDataService }  from './services/index';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [UserDataService]
})

export class AppComponent  { }