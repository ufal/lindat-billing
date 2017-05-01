import { Injectable, Component, OnInit } from '@angular/core';
import { IMyOptions, IMyDateRangeModel, IMyDateSelected, IMyCalendarViewChanged, IMyInputFieldChanged } from 'mydaterangepicker';
//import {DataRangePickerService} from "../services/data-range-picker.service";

@Component({
    moduleId: module.id,
    selector: 'date-range-picker',
    templateUrl: 'date-range-picker.component.html',
})

@Injectable()
export class DateRangeComponent implements  OnInit {

    placeholderTxt: string = '';

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
        DateRangeComponent.selectedRange = {
            beginDate: {year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate()},
            endDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}
        }
        //var event = new Event(onDateRangeChanged, EventInit())
    }

// For example initialize to specific date (09.10.2018 - 19.10.2018). It is also possible
// to set initial date range value using the selDateRange attribute.
    static selectedRange: any = {
        beginDate: {year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate()},
        endDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
    };

    constructor() {
        console.log('constructor(): DateRangeComponent');
        DateRangeComponent.selectedRange = {
            beginDate: {year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate()},
            endDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}
        }
    }

    getStart = () => {
        var date = DateRangeComponent.selectedRange.beginDate;
        return date.day + "-" + date.month + "-" + date.year;
    }

    getEnd() {
        var date = DateRangeComponent.selectedRange.endDate;
        return date.day + "-" + date.month + "-" + date.year;
    }

    onDateRangeChanged(event: IMyDateRangeModel) {
        DateRangeComponent.selectedRange = {beginDate: event.beginDate, endDate: event.endDate};
        //this.startDate = "" + event.beginDate.day + "-" + event.beginDate.month + "-" + event.beginDate.year;
        //this.endDate = event.endDate.day + "-" + event.endDate.month + "-" + event.endDate.year;
        console.log('onDateRangeChanged(): Formatted: ', event.formatted, 'with selectedRange', DateRangeComponent.selectedRange);
    }

    clearDateRange() {
        DateRangeComponent.selectedRange = null;
    }

    onDisableComponent(checked: boolean) {
        let copy = this.getCopyOfOptions();
        copy.componentDisabled = checked;
        this.myDateRangePickerOptions = copy;
    }

    onEditableDateField(checked: boolean) {
        let copy = this.getCopyOfOptions();
        copy.editableDateRangeField = checked;
        this.myDateRangePickerOptions = copy;
    }

    onAlignSelectorRight(checked: boolean) {
        let copy = this.getCopyOfOptions();
        copy.alignSelectorRight = checked;
        this.myDateRangePickerOptions = copy;
    }

    onShowClearButton(checked: boolean) {
        let copy = this.getCopyOfOptions();
        copy.showClearDateRangeBtn = checked;
        this.myDateRangePickerOptions = copy;
    }

    onShowPlaceholderText(checked: boolean) {
        this.placeholderTxt = checked ? 'Select a date range' : '';
    }

    onDisableHeaderButtons(checked: boolean) {
        let copy = this.getCopyOfOptions();
        copy.disableHeaderButtons = checked;
        this.myDateRangePickerOptions = copy;
    }

    onQuickDateRangeSelection(checked: boolean) {
        let copy = this.getCopyOfOptions();
        copy.quickRangeSelect = checked;
        this.myDateRangePickerOptions = copy;
    }

    onShowWeekNumbers(checked: boolean) {
        let copy = this.getCopyOfOptions();
        copy.showWeekNumbers = checked;
        this.myDateRangePickerOptions = copy;
    }

    onInputFieldChanged(event: IMyInputFieldChanged) {
        console.log('onInputFieldChanged(): Value: ', event.value, ' - dateRangeFormat: ', event.dateRangeFormat, ' - valid: ', event.valid);
    }

    onCalendarViewChanged(event: IMyCalendarViewChanged) {
        console.log('onCalendarViewChanged(): Year: ', event.year, ' - month: ', event.month, ' - first: ', event.first, ' - last: ', event.last);
    }

    onDateSelected(event: IMyDateSelected) {
        console.log('onDateSelected(): Value: ', event);
    }

    getCopyOfOptions(): IMyOptions {
        return JSON.parse(JSON.stringify(this.myDateRangePickerOptions));
    }
}