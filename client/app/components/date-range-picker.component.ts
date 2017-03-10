import { Injectable, Component, OnInit } from '@angular/core';
import { IMyOptions, IMyDateRangeModel } from 'mydaterangepicker';

@Component({
    moduleId: module.id,
    selector: 'date-range-picker',
    templateUrl: 'date-range-picker.component.html',
})

@Injectable()
export class DateRangeComponent implements  OnInit {

    private startDate: string;
    private endDate: string;

    private myDateRangePickerOptions: IMyOptions = {
        quickRangeSelect: true,
        dateFormat: 'dd.mm.yyyy',
        showClearBtn: false,
        acceptBtnTxt: "Apply",
        markCurrentDay: true,
        minYear: 2015,
        maxYear: new Date().getFullYear(),
        inline: false,
    };

    ngOnInit() {
        console.log('onInit(): DateRangeComponent');
    }

// For example initialize to specific date (09.10.2018 - 19.10.2018). It is also possible
// to set initial date range value using the selDateRange attribute.
    private model: Object = {
        beginDate: {year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate()},
        endDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}
    };

    constructor() {
        console.log('constructor(): DateRangeComponent');
    }

    getStart() {
        console.log(this.startDate);
        //console.log(this.model.startDate);
        return this.startDate;
    }

    getEnd() {
        return this.endDate;
    }

    onDateRangeChanged(event: IMyDateRangeModel) {
        this.model = {beginDate: event.beginDate, endDate: event.endDate};
        this.startDate = event.beginDate.day + "-" + event.beginDate.month + "-" + event.beginDate.year;
        this.endDate = event.endDate.day + "-" + event.endDate.month + "-" + event.endDate.year;
        console.log('onDateRangeChanged(): Formatted: ', event.formatted);
    }
}