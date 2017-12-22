import { Component }    from "@angular/core";
import {BasicInfoService} from "./services/basic-info.service";
import { UserDataService }  from "./services/index";

@Component({
  moduleId: module.id,
  selector: "my-app",
  templateUrl: "app.component.html",
  providers: [BasicInfoService, UserDataService],
})

export class AppComponent  { }