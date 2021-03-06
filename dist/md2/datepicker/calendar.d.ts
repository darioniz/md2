import { AfterContentInit, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { DateAdapter } from '../core/datetime/index';
import { Md2DatepickerIntl } from './datepicker-intl';
import { MdDateFormats } from '../core/datetime/date-formats';
/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
export declare class Md2Calendar<D> implements AfterContentInit {
    private _elementRef;
    private _intl;
    private _ngZone;
    private _dateAdapter;
    private _dateFormats;
    /** A date representing the period (month or year) to start the calendar in. */
    startAt: D;
    /** Whether the calendar should be started in month or year view. */
    startView: 'time' | 'month' | 'year';
    /** The currently selected date. */
    selected: D;
    /** The minimum selectable date. */
    minDate: D;
    /** The maximum selectable date. */
    maxDate: D;
    /** A function used to filter which dates are selectable. */
    dateFilter: (date: D) => boolean;
    /** Emits when the currently selected date changes. */
    selectedChange: EventEmitter<D>;
    /** Date filter for the month and year views. */
    _dateFilterForViews: (date: D) => boolean;
    /**
     * The current active date. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     */
    _activeDate: D;
    private _clampedActiveDate;
    /** Whether the calendar is in month view. */
    _currentView: 'time' | 'month' | 'year';
    _clockView: 'hour' | 'minute';
    /** The label for the current calendar view. */
    readonly _yearText: string;
    readonly _dateText: string;
    readonly _periodButtonText: string;
    readonly _periodButtonLabel: string;
    /** The label for the the previous button. */
    readonly _prevButtonLabel: string;
    /** The label for the the next button. */
    readonly _nextButtonLabel: string;
    readonly _okButtonLabel: string;
    readonly _cancelButtonLabel: string;
    constructor(_elementRef: ElementRef, _intl: Md2DatepickerIntl, _ngZone: NgZone, _dateAdapter: DateAdapter<D>, _dateFormats: MdDateFormats);
    ngAfterContentInit(): void;
    /** Handles date selection in the month view. */
    _dateSelected(date: D): void;
    /** Handles month selection in the year view. */
    _monthSelected(month: D): void;
    _timeSelected(time: D): void;
    /** Handles user clicks on the period label. */
    _currentPeriodClicked(): void;
    _okButtonClicked(): void;
    /** Handles user clicks on the previous button. */
    _previousClicked(): void;
    /** Handles user clicks on the next button. */
    _nextClicked(): void;
    /** Whether the previous period button is enabled. */
    _previousEnabled(): boolean;
    /** Whether the next period button is enabled. */
    _nextEnabled(): boolean;
    /** Handles keydown events on the calendar body. */
    _handleCalendarBodyKeydown(event: KeyboardEvent): void;
    /** Focuses the active cell after the microtask queue is empty. */
    _focusActiveCell(): void;
    /** Whether the two dates represent the same view in the current view mode (month or year). */
    private _isSameView(date1, date2);
    /** Handles keydown events on the calendar body when calendar is in month view. */
    private _handleCalendarBodyKeydownInMonthView(event);
    /** Handles keydown events on the calendar body when calendar is in year view. */
    private _handleCalendarBodyKeydownInYearView(event);
    /**
     * Determine the date for the month that comes before the given month in the same column in the
     * calendar table.
     */
    private _prevMonthInSameCol(date);
    /**
     * Determine the date for the month that comes after the given month in the same column in the
     * calendar table.
     */
    private _nextMonthInSameCol(date);
}
