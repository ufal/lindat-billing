import { Component }    from '@angular/core';
import { UserDataService }  from './services/index';
import {BasicInfoService} from "./services/basic-info.service";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [UserDataService, BasicInfoService]
})

export class AppComponent  { }