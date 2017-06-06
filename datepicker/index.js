var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule, PortalModule } from '../core';
import { Md2Datepicker } from './datepicker';
import { Md2Datepicker2, Md2DatepickerContent } from './datepicker2';
import { Md2DatepickerInput } from './datepicker-input';
import { Md2DatepickerToggle } from './datepicker-toggle';
import { Md2Calendar } from './calendar';
import { Md2MonthView } from './month-view';
import { Md2YearView } from './year-view';
import { Md2CalendarBody } from './calendar-body';
import { Md2Clock } from './clock';
import { Md2DatepickerIntl } from './datepicker-intl';
import { DateUtil } from './date-util';
import { DateLocale } from './date-locale';
import { StyleModule } from '../core/style/index';
export * from './datepicker';
export * from './datepicker2';
export * from './month-view';
export * from './year-view';
export * from './calendar-body';
export * from './clock';
export * from './date-util';
export * from './date-locale';
var Md2DatepickerModule = (function () {
    function Md2DatepickerModule() {
    }
    return Md2DatepickerModule;
}());
Md2DatepickerModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            OverlayModule,
            PortalModule,
            StyleModule,
        ],
        exports: [
            Md2Datepicker,
            Md2Datepicker2,
            Md2DatepickerContent,
            Md2DatepickerInput,
            Md2DatepickerToggle,
            Md2Calendar,
            Md2CalendarBody,
        ],
        declarations: [
            Md2Datepicker,
            Md2Datepicker2,
            Md2DatepickerContent,
            Md2DatepickerInput,
            Md2DatepickerToggle,
            Md2Calendar,
            Md2MonthView,
            Md2YearView,
            Md2CalendarBody,
            Md2Clock,
        ],
        providers: [Md2DatepickerIntl, DateLocale, DateUtil],
        entryComponents: [
            Md2Datepicker,
            Md2DatepickerContent
        ]
    })
], Md2DatepickerModule);
export { Md2DatepickerModule };
//# sourceMappingURL=index.js.map