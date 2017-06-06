import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  Optional,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {
  DOWN_ARROW,
  END,
  ENTER,
  HOME,
  LEFT_ARROW,
  PAGE_DOWN,
  PAGE_UP,
  RIGHT_ARROW,
  UP_ARROW
} from '../core/keyboard/keycodes';
import { DateAdapter } from '../core/datetime/index';
import { Md2DatepickerIntl } from './datepicker-intl';
import { MD_DATE_FORMATS, MdDateFormats } from '../core/datetime/date-formats';
import { MATERIAL_COMPATIBILITY_MODE } from '../core';


/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
@Component({
  moduleId: module.id,
  selector: 'md2-calendar',
  templateUrl: 'calendar.html',
  styleUrls: ['calendar.css'],
  host: {
    '[class.md2-calendar]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Md2Calendar<D> implements AfterContentInit {
  /** A date representing the period (month or year) to start the calendar in. */
  @Input() startAt: D;

  /** Whether the calendar should be started in month or year view. */
  @Input() startView: 'time' | 'month' | 'year' = 'month';

  /** The currently selected date. */
  @Input() selected: D;

  /** The minimum selectable date. */
  @Input() minDate: D;

  /** The maximum selectable date. */
  @Input() maxDate: D;

  /** A function used to filter which dates are selectable. */
  @Input() dateFilter: (date: D) => boolean;

  /** Emits when the currently selected date changes. */
  @Output() selectedChange = new EventEmitter<D>();

  /** Date filter for the month and year views. */
  _dateFilterForViews = (date: D) => {
    return !!date &&
      (!this.dateFilter || this.dateFilter(date)) &&
      (!this.minDate || this._dateAdapter.compareDate(date, this.minDate) >= 0) &&
      (!this.maxDate || this._dateAdapter.compareDate(date, this.maxDate) <= 0);
  }

  /**
   * The current active date. This determines which time period is shown and which date is
   * highlighted when using keyboard navigation.
   */
  get _activeDate(): D { return this._clampedActiveDate; }
  set _activeDate(value: D) {
    this._clampedActiveDate = this._dateAdapter.clampDate(value, this.minDate, this.maxDate);
  }
  private _clampedActiveDate: D;

  /** Whether the calendar is in month view. */
  _currentView: 'time' | 'month' | 'year' = 'month';
  _clockView: 'hour' | 'minute' = 'hour';

  /** The label for the current calendar view. */
  get _yearText(): string {
    return this._dateAdapter.getYearName(this._activeDate);
  }

  get _dateText(): string {
    return this._dateAdapter.getISODateString(this._activeDate);
  }

  get _periodButtonText(): string {
    return this._currentView === 'month' ?
      this._dateAdapter.format(this._activeDate, this._dateFormats.display.monthYearLabel)
        .toLocaleUpperCase() :
      this._dateAdapter.getYearName(this._activeDate);
  }

  get _periodButtonLabel(): string {
    return this._currentView === 'month' ? this._intl.switchToYearViewLabel : this._intl.switchToMonthViewLabel;
  }

  /** The label for the the previous button. */
  get _prevButtonLabel(): string {
    return this._currentView === 'month' ? this._intl.prevMonthLabel : this._intl.prevYearLabel;
  }

  /** The label for the the next button. */
  get _nextButtonLabel(): string {
    return this._currentView === 'month' ? this._intl.nextMonthLabel : this._intl.nextYearLabel;
  }

  get _okButtonLabel(): string {
    return 'OK';
  }

  get _cancelButtonLabel(): string {
    return 'CANCEL';
  }

  constructor(private _elementRef: ElementRef,
    private _intl: Md2DatepickerIntl,
    private _ngZone: NgZone,
    @Optional() private _dateAdapter: DateAdapter<D>,
    @Optional() @Inject(MD_DATE_FORMATS) private _dateFormats: MdDateFormats) {
    if (!this._dateAdapter) {
      throw Error('DateAdapter');
    }
    if (!this._dateFormats) {
      throw Error('MD_DATE_FORMATS');
    }
  }

  ngAfterContentInit() {
    this._activeDate = this.startAt || this._dateAdapter.today();
    this._focusActiveCell();
    this._currentView = this.startView || 'month';
  }

  /** Handles date selection in the month view. */
  _dateSelected(date: D): void {
    if (!this._dateAdapter.sameDate(date, this.selected)) {
      this.selectedChange.emit(date);
    }
  }

  /** Handles month selection in the year view. */
  _monthSelected(month: D): void {
    this._activeDate = month;
    this._currentView = 'month';
  }

  _timeSelected(time: D): void {
    this._activeDate = time;
    this._currentView = 'month';
  }

  /** Handles user clicks on the period label. */
  _currentPeriodClicked(): void {
    this._currentView = this._currentView === 'month' ? 'year' : 'month';
  }

  _okButtonClicked(): void {
    this._currentView = this._currentView === 'month' ? 'time' : 'month';
  }

  /** Handles user clicks on the previous button. */
  _previousClicked(): void {
    this._activeDate = this._currentView === 'month' ?
      this._dateAdapter.addCalendarMonths(this._activeDate, -1) :
      this._dateAdapter.addCalendarYears(this._activeDate, -1);
  }

  /** Handles user clicks on the next button. */
  _nextClicked(): void {
    this._activeDate = this._currentView === 'month' ?
      this._dateAdapter.addCalendarMonths(this._activeDate, 1) :
      this._dateAdapter.addCalendarYears(this._activeDate, 1);
  }

  /** Whether the previous period button is enabled. */
  _previousEnabled(): boolean {
    if (!this.minDate) {
      return true;
    }
    return !this.minDate || !this._isSameView(this._activeDate, this.minDate);
  }

  /** Whether the next period button is enabled. */
  _nextEnabled(): boolean {
    return !this.maxDate || !this._isSameView(this._activeDate, this.maxDate);
  }

  /** Handles keydown events on the calendar body. */
  _handleCalendarBodyKeydown(event: KeyboardEvent): void {
    // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
    // disabled ones from being selected. This may not be ideal, we should look into whether
    // navigation should skip over disabled dates, and if so, how to implement that efficiently.
    if (this._currentView === 'month') {
      this._handleCalendarBodyKeydownInMonthView(event);
    } else {
      this._handleCalendarBodyKeydownInYearView(event);
    }
  }

  /** Focuses the active cell after the microtask queue is empty. */
  _focusActiveCell() {
    this._ngZone.runOutsideAngular(() => this._ngZone.onStable.first().subscribe(() => {
      let activeEl = this._elementRef.nativeElement.querySelector('.md2-calendar-body-active');
      activeEl.focus();
    }));
  }

  /** Whether the two dates represent the same view in the current view mode (month or year). */
  private _isSameView(date1: D, date2: D): boolean {
    return this._currentView === 'month' ?
      this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2) &&
      this._dateAdapter.getMonth(date1) == this._dateAdapter.getMonth(date2) :
      this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2);
  }

  /** Handles keydown events on the calendar body when calendar is in month view. */
  private _handleCalendarBodyKeydownInMonthView(event: KeyboardEvent): void {
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
        this._activeDate = this._dateAdapter.addCalendarDays(this._activeDate,
          1 - this._dateAdapter.getDate(this._activeDate));
        break;
      case END:
        this._activeDate = this._dateAdapter.addCalendarDays(this._activeDate,
          (this._dateAdapter.getNumDaysInMonth(this._activeDate) -
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
  }

  /** Handles keydown events on the calendar body when calendar is in year view. */
  private _handleCalendarBodyKeydownInYearView(event: KeyboardEvent): void {
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
        this._activeDate = this._dateAdapter.addCalendarMonths(this._activeDate,
          -this._dateAdapter.getMonth(this._activeDate));
        break;
      case END:
        this._activeDate = this._dateAdapter.addCalendarMonths(this._activeDate,
          11 - this._dateAdapter.getMonth(this._activeDate));
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
  }

  /**
   * Determine the date for the month that comes before the given month in the same column in the
   * calendar table.
   */
  private _prevMonthInSameCol(date: D): D {
    // Determine how many months to jump forward given that there are 2 empty slots at the beginning
    // of each year.
    let increment = this._dateAdapter.getMonth(date) <= 4 ? -5 :
      (this._dateAdapter.getMonth(date) >= 7 ? -7 : -12);
    return this._dateAdapter.addCalendarMonths(date, increment);
  }

  /**
   * Determine the date for the month that comes after the given month in the same column in the
   * calendar table.
   */
  private _nextMonthInSameCol(date: D): D {
    // Determine how many months to jump forward given that there are 2 empty slots at the beginning
    // of each year.
    let increment = this._dateAdapter.getMonth(date) <= 4 ? 7 :
      (this._dateAdapter.getMonth(date) >= 7 ? 5 : 12);
    return this._dateAdapter.addCalendarMonths(date, increment);
  }
}
