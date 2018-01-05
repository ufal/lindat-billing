import { Component }    from "@angular/core";
import { BasicInfoService, UserDataService } from "./services";

@Component({
  moduleId: module.id,
  providers: [BasicInfoService, UserDataService],
  selector: "my-app",
  templateUrl: "app.component.html",
})

export class AppComponent  { }
