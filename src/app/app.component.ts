import { Component }    from '@angular/core';
import { UserDataService }  from './services/user-data.service';
import { DateRangeComponent } from './components/date-range-picker.component';
import { DataRangePickerService } from './services/data-range-picker.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [UserDataService, DataRangePickerService, DateRangeComponent]
})

export class AppComponent  { }
