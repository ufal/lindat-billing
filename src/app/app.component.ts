import { Component }    from "@angular/core";
import {BasicInfoService} from "./services/basic-info.service";
import { UserDataService }  from "./services/index";

@Component({
  moduleId: module.id,
  providers: [BasicInfoService, UserDataService],
  selector: "my-app",
  templateUrl: "app.component.html",
})

export class AppComponent  { }
