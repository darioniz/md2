var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, Input, NgZone, Optional, Output, ViewEncapsulation } from '@angular/core';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '../core/keyboard/keycodes';
import { DateAdapter } from '../core/datetime/index';
import { Md2DatepickerIntl } from './datepicker-intl';
import { MD_DATE_FORMATS } from '../core/datetime/date-formats';
/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
var Md2Calendar = (function () {
    function Md2Calendar(_elementRef, _intl, _ngZone, _dateAdapter, _dateFormats) {
        var _this = this;
        this._elementRef = _elementRef;
        this._intl = _intl;
        this._ngZone = _ngZone;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        /** Whether the calendar should be started in month or year view. */
        this.startView = 'month';
        /** Emits when the currently selected date changes. */
        this.selectedChange = new EventEmitter();
        /** Date filter for the month and year views. */
        this._dateFilterForViews = function (date) {
            return !!date &&
                (!_this.dateFilter || _this.dateFilter(date)) &&
                (!_this.minDate || _this._dateAdapter.compareDate(date, _this.minDate) >= 0) &&
                (!_this.maxDate || _this._dateAdapter.compareDate(date, _this.maxDate) <= 0);
        };
        /** Whether the calendar is in month view. */
        this._currentView = 'month';
        this._clockView = 'hour';
        if (!this._dateAdapter) {
            throw Error('DateAdapter');
        }
        if (!this._dateFormats) {
            throw Error('MD_DATE_FORMATS');
        }
    }
    Object.defineProperty(Md2Calendar.prototype, "_activeDate", {
        /**
         * The current active date. This determines which time period is shown and which date is
         * highlighted when using keyboard navigation.
         */
        get: function () { return this._clampedActiveDate; },
        set: function (value) {
            this._clampedActiveDate = this._dateAdapter.clampDate(value, this.minDate, this.maxDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "_yearText", {
        /** The label for the current calendar view. */
        get: function () {
            return this._dateAdapter.getYearName(this._activeDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "_dateText", {
        get: function () {
            return this._dateAdapter.getISODateString(this._activeDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "_periodButtonText", {
        get: function () {
            return this._currentView === 'month' ?
                this._dateAdapter.format(this._activeDate, this._dateFormats.display.monthYearLabel)
                    .toLocaleUpperCase() :
                this._dateAdapter.getYearName(this._activeDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "_periodButtonLabel", {
        get: function () {
            return this._currentView === 'month' ? this._intl.switchToYearViewLabel : this._intl.switchToMonthViewLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "_prevButtonLabel", {
        /** The label for the the previous button. */
        get: function () {
            return this._currentView === 'month' ? this._intl.prevMonthLabel : this._intl.prevYearLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "_nextButtonLabel", {
        /** The label for the the next button. */
        get: function () {
            return this._currentView === 'month' ? this._intl.nextMonthLabel : this._intl.nextYearLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "_okButtonLabel", {
        get: function () {
            return 'OK';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "_cancelButtonLabel", {
        get: function () {
            return 'CANCEL';
        },
        enumerable: true,
        configurable: true
    });
    Md2Calendar.prototype.ngAfterContentInit = function () {
        this._activeDate = this.startAt || this._dateAdapter.today();
        this._focusActiveCell();
        this._currentView = this.startView || 'month';
    };
    /** Handles date selection in the month view. */
    Md2Calendar.prototype._dateSelected = function (date) {
        if (!this._dateAdapter.sameDate(date, this.selected)) {
            this.selectedChange.emit(date);
        }
    };
    /** Handles month selection in the year view. */
    Md2Calendar.prototype._monthSelected = function (month) {
        this._activeDate = month;
        this._currentView = 'month';
    };
    Md2Calendar.prototype._timeSelected = function (time) {
        this._activeDate = time;
        this._currentView = 'month';
    };
    /** Handles user clicks on the period label. */
    Md2Calendar.prototype._currentPeriodClicked = function () {
        this._currentView = this._currentView === 'month' ? 'year' : 'month';
    };
    Md2Calendar.prototype._okButtonClicked = function () {
        this._currentView = this._currentView === 'month' ? 'time' : 'month';
    };
    /** Handles user clicks on the previous button. */
    Md2Calendar.prototype._previousClicked = function () {
        this._activeDate = this._currentView === 'month' ?
            this._dateAdapter.addCalendarMonths(this._activeDate, -1) :
            this._dateAdapter.addCalendarYears(this._activeDate, -1);
    };
    /** Handles user clicks on the next button. */
    Md2Calendar.prototype._nextClicked = function () {
        this._activeDate = this._currentView === 'month' ?
            this._dateAdapter.addCalendarMonths(this._activeDate, 1) :
            this._dateAdapter.addCalendarYears(this._activeDate, 1);
    };
    /** Whether the previous period button is enabled. */
    Md2Calendar.prototype._previousEnabled = function () {
        if (!this.minDate) {
            return true;
        }
        return !this.minDate || !this._isSameView(this._activeDate, this.minDate);
    };
    /** Whether the next period button is enabled. */
    Md2Calendar.prototype._nextEnabled = function () {
        return !this.maxDate || !this._isSameView(this._activeDate, this.maxDate);
    };
    /** Handles keydown events on the calendar body. */
    Md2Calendar.prototype._handleCalendarBodyKeydown = function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        if (this._currentView === 'month') {
            this._handleCalendarBodyKeydownInMonthView(event);
        }
        else {
            this._handleCalendarBodyKeydownInYearView(event);
        }
    };
    /** Focuses the active cell after the microtask queue is empty. */
    Md2Calendar.prototype._focusActiveCell = function () {
        var _this = this;
        this._ngZone.runOutsideAngular(function () { return _this._ngZone.onStable.first().subscribe(function () {
            var activeEl = _this._elementRef.nativeElement.querySelector('.md2-calendar-body-active');
            activeEl.focus();
        }); });
    };
    /** Whether the two dates represent the same view in the current view mode (month or year). */
    Md2Calendar.prototype._isSameView = function (date1, date2) {
        return this._currentView === 'month' ?
            this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2) &&
                this._dateAdapter.getMonth(date1) == this._dateAdapter.getMonth(date2) :
            this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2);
    };
    /** Handles keydown events on the calendar body when calendar is in month view. */
    Md2Calendar.prototype._handleCalendarBodyKeydownInMonthView = function (event) {
        switch (event.keyCode) {
            case LEFT_ARROW:
                this._activeDate = this._dateAdapter.addCalendarDays(this._activeDate, -1);
                break;
            case RIGHT_ARROW:
                this._activeDate = this._dateAdapter.addCalendarDays(this._activeDate, 1);
                break;
            case UP_ARROW:
                this._activeDate = this._dateAdapter.addCalendarDays(this._activeDate, -7);
                break;
            case DOWN_ARROW:
                this._activeDate = this._dateAdapter.addCalendarDays(this._activeDate, 7);
                break;
            case HOME:
                this._activeDate = this._dateAdapter.addCalendarDays(this._activeDate, 1 - this._dateAdapter.getDate(this._activeDate));
                break;
            case END:
                this._activeDate = this._dateAdapter.addCalendarDays(this._activeDate, (this._dateAdapter.getNumDaysInMonth(this._activeDate) -
                    this._dateAdapter.getDate(this._activeDate)));
                break;
            case PAGE_UP:
                this._activeDate = event.altKey ?
                    this._dateAdapter.addCalendarYears(this._activeDate, -1) :
                    this._dateAdapter.addCalendarMonths(this._activeDate, -1);
                break;
            case PAGE_DOWN:
                this._activeDate = event.altKey ?
                    this._dateAdapter.addCalendarYears(this._activeDate, 1) :
                    this._dateAdapter.addCalendarMonths(this._activeDate, 1);
                break;
            case ENTER:
                if (this._dateFilterForViews(this._activeDate)) {
                    this._dateSelected(this._activeDate);
                    // Prevent unexpected default actions such as form submission.
                    event.preventDefault();
                }
                return;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        this._focusActiveCell();
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /** Handles keydown events on the calendar body when calendar is in year view. */
    Md2Calendar.prototype._handleCalendarBodyKeydownInYearView = function (event) {
        switch (event.keyCode) {
            case LEFT_ARROW:
                this._activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, -1);
                break;
            case RIGHT_ARROW:
                this._activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, 1);
                break;
            case UP_ARROW:
                this._activeDate = this._prevMonthInSameCol(this._activeDate);
                break;
            case DOWN_ARROW:
                this._activeDate = this._nextMonthInSameCol(this._activeDate);
                break;
            case HOME:
                this._activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, -this._dateAdapter.getMonth(this._activeDate));
                break;
            case END:
                this._activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, 11 - this._dateAdapter.getMonth(this._activeDate));
                break;
            case PAGE_UP:
                this._activeDate =
                    this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -10 : -1);
                break;
            case PAGE_DOWN:
                this._activeDate =
                    this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? 10 : 1);
                break;
            case ENTER:
                this._monthSelected(this._activeDate);
                break;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        this._focusActiveCell();
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /**
     * Determine the date for the month that comes before the given month in the same column in the
     * calendar table.
     */
    Md2Calendar.prototype._prevMonthInSameCol = function (date) {
        // Determine how many months to jump forward given that there are 2 empty slots at the beginning
        // of each year.
        var increment = this._dateAdapter.getMonth(date) <= 4 ? -5 :
            (this._dateAdapter.getMonth(date) >= 7 ? -7 : -12);
        return this._dateAdapter.addCalendarMonths(date, increment);
    };
    /**
     * Determine the date for the month that comes after the given month in the same column in the
     * calendar table.
     */
    Md2Calendar.prototype._nextMonthInSameCol = function (date) {
        // Determine how many months to jump forward given that there are 2 empty slots at the beginning
        // of each year.
        var increment = this._dateAdapter.getMonth(date) <= 4 ? 7 :
            (this._dateAdapter.getMonth(date) >= 7 ? 5 : 12);
        return this._dateAdapter.addCalendarMonths(date, increment);
    };
    return Md2Calendar;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], Md2Calendar.prototype, "startAt", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2Calendar.prototype, "startView", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], Md2Calendar.prototype, "selected", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], Md2Calendar.prototype, "minDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], Md2Calendar.prototype, "maxDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], Md2Calendar.prototype, "dateFilter", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], Md2Calendar.prototype, "selectedChange", void 0);
Md2Calendar = __decorate([
    Component({selector: 'md2-calendar',
        template: "<div class=\"md2-calendar-header\"><div class=\"md2-calendar-header-year\" [class.active]=\"false\">{{ _yearText }}</div><div class=\"md2-calendar-header-date\" [class.active]=\"true\">{{ _dateText }}</div></div><div class=\"md2-calendar-content\" (keydown)=\"_handleCalendarBodyKeydown($event)\" [ngSwitch]=\"_currentView\" cdkMonitorSubtreeFocus><div class=\"md2-month-content\" *ngSwitchCase=\"'month'\"><div class=\"md2-calendar-controls\"><button type=\"button\" class=\"md2-calendar-previous-button\" [disabled]=\"!_previousEnabled()\" (click)=\"_previousClicked()\" [attr.aria-label]=\"_prevButtonLabel\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"></path></svg></button> <button type=\"button\" class=\"md2-calendar-period-button\" (click)=\"_currentPeriodClicked()\" [attr.aria-label]=\"_periodButtonLabel\">{{_periodButtonText}}</button> <button type=\"button\" class=\"md2-calendar-next-button\" [disabled]=\"!_nextEnabled()\" (click)=\"_nextClicked()\" [attr.aria-label]=\"_nextButtonLabel\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path></svg></button></div><md2-month-view [activeDate]=\"_activeDate\" [selected]=\"selected\" [dateFilter]=\"_dateFilterForViews\" (selectedChange)=\"_dateSelected($event)\"></md2-month-view></div><md2-year-view *ngSwitchCase=\"'year'\" [activeDate]=\"_activeDate\" [selected]=\"selected\" [dateFilter]=\"_dateFilterForViews\" (selectedChange)=\"_monthSelected($event)\"></md2-year-view><md2-clock *ngSwitchDefault [selected]=\"selected\" [startView]=\"_clockView\" (selectedChange)=\"_timeSelected($event)\"></md2-clock></div><div class=\"md2-calendar-footer\"><button type=\"button\" class=\"md2-calendar-cancel-button\" [attr.aria-label]=\"_cancelButtonLabel\">{{ _cancelButtonLabel }}</button> <button type=\"button\" class=\"md2-calendar-ok-button\" [attr.aria-label]=\"_okButtonLabel\" (click)=\"_okButtonClicked()\">{{ _okButtonLabel }}</button></div>",
        styles: [".md2-datepicker-content{background-color:#fff}.md2-calendar{display:block}.md2-calendar-header{padding:16px;font-size:14px;background-color:#106cc8;color:#fff}.md2-calendar-header-date,.md2-calendar-header-year{width:100%;font-weight:500;transition:.3s cubic-bezier(.25,.8,.25,1)}.md2-calendar-header-date:not(.active),.md2-calendar-header-year:not(.active){cursor:pointer;opacity:.6}.md2-calendar-header-date{font-size:30px;line-height:34px}.md2-calendar-content{padding:0 8px 8px 8px;outline:0}.md2-calendar-controls{display:flex;justify-content:space-between}.md2-calendar-period-button{display:inline-block;height:48px;padding:12px;font:inherit;font-size:14px;font-weight:700;outline:0;border:0;cursor:pointer;background:0 0;box-sizing:border-box}.md2-calendar-next-button,.md2-calendar-previous-button{display:inline-block;width:48px;height:48px;padding:12px;outline:0;border:0;cursor:pointer;background:0 0;box-sizing:border-box}.md2-calendar-next-button[disabled],.md2-calendar-previous-button[disabled]{color:rgba(0,0,0,.38);pointer-events:none}.md2-calendar-next-button svg,.md2-calendar-previous-button svg{fill:currentColor;vertical-align:top}.md2-calendar-table{border-spacing:0;border-collapse:collapse;width:100%}.md2-calendar-table-header{color:rgba(0,0,0,.38)}.md2-calendar-table-header th{text-align:center;font-size:11px;font-weight:400;padding:0 0 8px 0}.md2-calendar-footer{text-align:right}.md2-calendar-cancel-button,.md2-calendar-ok-button{display:inline-block;min-width:64px;margin:4px 8px 8px 0;padding:0 12px;font-size:14px;color:#106cc8;line-height:36px;text-align:center;text-transform:uppercase;outline:0;border:0;border-radius:2px;background:0 0;cursor:pointer;box-sizing:border-box;transition:all 450ms cubic-bezier(.23,1,.32,1)}.md2-calendar-cancel-button:hover,.md2-calendar-ok-button:hover{background:#ebebeb} /*# sourceMappingURL=calendar.css.map */ "],
        host: {
            '[class.md2-calendar]': 'true',
        },
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
    }),
    __param(3, Optional()),
    __param(4, Optional()), __param(4, Inject(MD_DATE_FORMATS)),
    __metadata("design:paramtypes", [ElementRef,
        Md2DatepickerIntl,
        NgZone,
        DateAdapter, Object])
], Md2Calendar);
export { Md2Calendar };
//# sourceMappingURL=calendar.js.map