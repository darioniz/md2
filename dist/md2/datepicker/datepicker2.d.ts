import { AfterContentInit, EventEmitter, OnDestroy, ViewContainerRef, NgZone } from '@angular/core';
import { Overlay } from '../core/overlay/overlay';
import { Dir } from '../core/rtl/dir';
import { ScrollDispatcher } from '../core/overlay/index';
import { Md2DatepickerInput } from './datepicker-input';
import { DateAdapter } from '../core/datetime/index';
import { Md2Calendar } from './calendar';
import 'rxjs/add/operator/first';
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * Md2Calendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * @docs-private
 */
export declare class Md2DatepickerContent<D> implements AfterContentInit {
    datepicker: Md2Datepicker2<D>;
    _calendar: Md2Calendar<D>;
    ngAfterContentInit(): void;
    /**
     * Handles keydown event on datepicker content.
     * @param event The event.
     */
    _handleKeydown(event: KeyboardEvent): void;
}
/** Component responsible for managing the datepicker popup/dialog. */
export declare class Md2Datepicker2<D> implements OnDestroy {
    private _overlay;
    private _ngZone;
    private _viewContainerRef;
    private _scrollDispatcher;
    private _dateAdapter;
    private _dir;
    /** The date to open the calendar to initially. */
    startAt: D;
    private _startAt;
    /** The view that the calendar should start in. */
    startView: 'month' | 'year';
    /**
     * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
     * than a popup and elements have more padding to allow for bigger touch targets.
     */
    touchUi: boolean;
    /** Emits new selected date when selected date changes. */
    selectedChanged: EventEmitter<D>;
    /** Whether the calendar is open. */
    opened: boolean;
    /** The id for the datepicker calendar. */
    id: string;
    /** The currently selected date. */
    _selected: D;
    /** The minimum selectable date. */
    readonly _minDate: D;
    /** The maximum selectable date. */
    readonly _maxDate: D;
    readonly _dateFilter: (date: D | null) => boolean;
    /** A reference to the overlay when the calendar is opened as a popup. */
    private _popupRef;
    /** A reference to the overlay when the calendar is opened as a dialog. */
    private _dialogRef;
    /** A portal containing the calendar for this datepicker. */
    private _calendarPortal;
    /** The input element this datepicker is associated with. */
    private _datepickerInput;
    private _inputSubscription;
    constructor(_overlay: Overlay, _ngZone: NgZone, _viewContainerRef: ViewContainerRef, _scrollDispatcher: ScrollDispatcher, _dateAdapter: DateAdapter<D>, _dir: Dir);
    ngOnDestroy(): void;
    /** Selects the given date and closes the currently open popup or dialog. */
    _selectAndClose(date: D): void;
    /**
     * Register an input with this datepicker.
     * @param input The datepicker input to register with this datepicker.
     */
    _registerInput(input: Md2DatepickerInput<D>): void;
    /** Open the calendar. */
    open(): void;
    /** Close the calendar. */
    close(): void;
    /** Open the calendar as a dialog. */
    private _openAsDialog();
    /** Open the calendar as a popup. */
    private _openAsPopup();
    /** Create the dialog. */
    private _createDialog();
    /** Create the popup. */
    private _createPopup();
    /** Create the popup PositionStrategy. */
    private _createPopupPositionStrategy();
}
