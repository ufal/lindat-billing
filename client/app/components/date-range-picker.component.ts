import { Component, NgModule, OnInit } from '@angular/core';
import { IMyOptions, IMyDateRangeModel } from 'mydaterangepicker';

@Component({
    moduleId: module.id,
    selector: 'date-range-picker',
    templateUrl: 'date-range-picker.component.html',
})

export class DateRangeComponent implements  OnInit {

    options: IMyOptions = {
        quickRangeSelect: true,
        dateFormat: 'dd.mm.yyyy',
        showClearBtn: false,
        acceptBtnTxt: "Apply",
        markCurrentDay: true,
        minYear: 2015,
        maxYear: new Date().getFullYear(),
        inline: false,
    };

    constructor() {
        console.log('constructor(): DateRangeComponent');
    }

    ngOnInit() {
        console.log('onInit(): DateRangeComponent');
    }

// For example initialize to specific date (09.10.2018 - 19.10.2018). It is also possible
// to set initial date range value using the selDateRange attribute.
    model: Object = {
        beginDate: {year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate()},
        endDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}
    };
/*
    onDateRangeChanged(event: IMyDateRangeModel) {
        this.model = {beginDate: event.beginDate, endDate: event.endDate};
        console.log('onDateRangeChanged(): Formatted: ', event.formatted);
    }*/
}