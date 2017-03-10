import { Component }    from '@angular/core';
import { UserDataService }  from './services/user-data.service';
import { DateRangeComponent } from './components/date-range-picker.component';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [UserDataService, DateRangeComponent]
})

export class AppComponent  { }
