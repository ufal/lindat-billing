import {Injectable}     from '@angular/core';
import { DateRangeComponent } from '../components/date-range-picker.component';

@Injectable()
export class DataRangePickerService {
    constructor(private dateRangeComponent:DateRangeComponent) {
        console.log('DateRange Service Initialized ...');
    }

    getStart(): string {
        return this.dateRangeComponent.getStart();
    }

    getEnd(): string {
        return this.dateRangeComponent.getEnd();
    }

}