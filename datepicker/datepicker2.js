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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Optional, Output, ViewChild, ViewContainerRef, ViewEncapsulation, NgZone, } from '@angular/core';
import { Overlay } from '../core/overlay/overlay';
import { ComponentPortal } from '../core/portal/portal';
import { OverlayState } from '../core/overlay/overlay-state';
import { Dir } from '../core/rtl/dir';
import { RepositionScrollStrategy, ScrollDispatcher } from '../core/overlay/index';
import { DateAdapter } from '../core/datetime/index';
import { ESCAPE } from '../core/keyboard/keycodes';
import { Md2Calendar } from './calendar';
import 'rxjs/add/operator/first';
/** Used to generate a unique ID for each datepicker instance. */
var datepickerUid = 0;
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * Md2Calendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * @docs-private
 */
var Md2DatepickerContent = (function () {
    function Md2DatepickerContent() {
    }
    Md2DatepickerContent.prototype.ngAfterContentInit = function () {
        this._calendar._focusActiveCell();
    };
    /**
     * Handles keydown event on datepicker content.
     * @param event The event.
     */
    Md2DatepickerContent.prototype._handleKeydown = function (event) {
        switch (event.keyCode) {
            case ESCAPE:
                this.datepicker.close();
                break;
            default:
                // Return so that we don't preventDefault on keys that are not explicitly handled.
                return;
        }
        event.preventDefault();
    };
    return Md2DatepickerContent;
}());
__decorate([
    ViewChild(Md2Calendar),
    __metadata("design:type", Md2Calendar)
], Md2DatepickerContent.prototype, "_calendar", void 0);
Md2DatepickerContent = __decorate([
    Component({selector: 'md2-datepicker-content',
        template: "<md2-calendar cdkTrapFocus [id]=\"datepicker.id\" [startAt]=\"datepicker.startAt\" [startView]=\"datepicker.startView\" [minDate]=\"datepicker._minDate\" [maxDate]=\"datepicker._maxDate\" [dateFilter]=\"datepicker._dateFilter\" [selected]=\"datepicker._selected\" (selectedChange)=\"datepicker._selectAndClose($event)\"></md2-calendar>",
        styles: [".md2-datepicker-content{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);display:block;border-radius:2px;overflow:hidden}.md2-calendar{width:296px}.md2-datepicker-content-touch{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);display:block;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.6)} /*# sourceMappingURL=datepicker-content.css.map */ "],
        host: {
            'class': 'md2-datepicker-content',
            '[class.md2-datepicker-content-touch]': 'datepicker.touchUi',
            '(keydown)': '_handleKeydown($event)',
        },
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], Md2DatepickerContent);
export { Md2DatepickerContent };
// TODO(mmalerba): We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="md2Datepicker"). We can change this to a directive if
// angular adds support for `exportAs: '$implicit'` on directives.
/** Component responsible for managing the datepicker popup/dialog. */
var Md2Datepicker2 = (function () {
    function Md2Datepicker2(_overlay, _ngZone, _viewContainerRef, _scrollDispatcher, _dateAdapter, _dir) {
        this._overlay = _overlay;
        this._ngZone = _ngZone;
        this._viewContainerRef = _viewContainerRef;
        this._scrollDispatcher = _scrollDispatcher;
        this._dateAdapter = _dateAdapter;
        this._dir = _dir;
        /** The view that the calendar should start in. */
        this.startView = 'month';
        /**
         * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
         * than a popup and elements have more padding to allow for bigger touch targets.
         */
        this.touchUi = false;
        /** Emits new selected date when selected date changes. */
        this.selectedChanged = new EventEmitter();
        /** Whether the calendar is open. */
        this.opened = false;
        /** The id for the datepicker calendar. */
        this.id = "md2-datepicker-" + datepickerUid++;
        /** The currently selected date. */
        this._selected = null;
        if (!this._dateAdapter) {
            throw Error('DateAdapter');
        }
    }
    Object.defineProperty(Md2Datepicker2.prototype, "startAt", {
        /** The date to open the calendar to initially. */
        get: function () {
            // If an explicit startAt is set we start there, otherwise we start at whatever the currently
            // selected value is.
            return this._startAt || (this._datepickerInput ? this._datepickerInput.value : null);
        },
        set: function (date) { this._startAt = date; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker2.prototype, "_minDate", {
        /** The minimum selectable date. */
        get: function () {
            return this._datepickerInput && this._datepickerInput.min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker2.prototype, "_maxDate", {
        /** The maximum selectable date. */
        get: function () {
            return this._datepickerInput && this._datepickerInput.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker2.prototype, "_dateFilter", {
        get: function () {
            return this._datepickerInput && this._datepickerInput._dateFilter;
        },
        enumerable: true,
        configurable: true
    });
    Md2Datepicker2.prototype.ngOnDestroy = function () {
        this.close();
        if (this._popupRef) {
            this._popupRef.dispose();
        }
        if (this._dialogRef) {
            this._dialogRef.dispose();
        }
        if (this._inputSubscription) {
            this._inputSubscription.unsubscribe();
        }
    };
    /** Selects the given date and closes the currently open popup or dialog. */
    Md2Datepicker2.prototype._selectAndClose = function (date) {
        var oldValue = this._selected;
        this._selected = date;
        if (!this._dateAdapter.sameDate(oldValue, this._selected)) {
            this.selectedChanged.emit(date);
        }
        this.close();
    };
    /**
     * Register an input with this datepicker.
     * @param input The datepicker input to register with this datepicker.
     */
    Md2Datepicker2.prototype._registerInput = function (input) {
        var _this = this;
        if (this._datepickerInput) {
            throw new Error('An Md2Datepicker can only be associated with a single input.');
        }
        this._datepickerInput = input;
        this._inputSubscription =
            this._datepickerInput._valueChange.subscribe(function (value) { return _this._selected = value; });
    };
    /** Open the calendar. */
    Md2Datepicker2.prototype.open = function () {
        if (this.opened) {
            return;
        }
        if (!this._datepickerInput) {
            throw new Error('Attempted to open an Md2Datepicker with no associated input.');
        }
        if (!this._calendarPortal) {
            this._calendarPortal = new ComponentPortal(Md2DatepickerContent, this._viewContainerRef);
        }
        this.touchUi ? this._openAsDialog() : this._openAsPopup();
        this.opened = true;
    };
    /** Close the calendar. */
    Md2Datepicker2.prototype.close = function () {
        if (!this.opened) {
            return;
        }
        if (this._popupRef && this._popupRef.hasAttached()) {
            this._popupRef.detach();
        }
        if (this._dialogRef && this._dialogRef.hasAttached()) {
            this._dialogRef.detach();
        }
        if (this._calendarPortal && this._calendarPortal.isAttached) {
            this._calendarPortal.detach();
        }
        this.opened = false;
    };
    /** Open the calendar as a dialog. */
    Md2Datepicker2.prototype._openAsDialog = function () {
        var _this = this;
        if (!this._dialogRef) {
            this._createDialog();
        }
        if (!this._dialogRef.hasAttached()) {
            var componentRef = this._dialogRef.attach(this._calendarPortal);
            componentRef.instance.datepicker = this;
        }
        this._dialogRef.backdropClick().first().subscribe(function () { return _this.close(); });
    };
    /** Open the calendar as a popup. */
    Md2Datepicker2.prototype._openAsPopup = function () {
        var _this = this;
        if (!this._popupRef) {
            this._createPopup();
        }
        if (!this._popupRef.hasAttached()) {
            var componentRef = this._popupRef.attach(this._calendarPortal);
            componentRef.instance.datepicker = this;
            // Update the position once the calendar has rendered.
            this._ngZone.onStable.first().subscribe(function () { return _this._popupRef.updatePosition(); });
        }
        this._popupRef.backdropClick().first().subscribe(function () { return _this.close(); });
    };
    /** Create the dialog. */
    Md2Datepicker2.prototype._createDialog = function () {
        var overlayState = new OverlayState();
        overlayState.positionStrategy = this._overlay.position().global()
            .centerHorizontally()
            .centerVertically();
        overlayState.hasBackdrop = true;
        overlayState.backdropClass = 'cdk-overlay-dark-backdrop';
        overlayState.direction = this._dir ? this._dir.value : 'ltr';
        this._dialogRef = this._overlay.create(overlayState);
    };
    /** Create the popup. */
    Md2Datepicker2.prototype._createPopup = function () {
        var overlayState = new OverlayState();
        overlayState.positionStrategy = this._createPopupPositionStrategy();
        overlayState.hasBackdrop = true;
        if (this.touchUi) {
            overlayState.backdropClass = 'cdk-overlay-dark-backdrop';
        }
        else {
            overlayState.backdropClass = 'cdk-overlay-transparent-backdrop';
        }
        overlayState.direction = this._dir ? this._dir.value : 'ltr';
        overlayState.scrollStrategy = new RepositionScrollStrategy(this._scrollDispatcher);
        this._popupRef = this._overlay.create(overlayState);
    };
    /** Create the popup PositionStrategy. */
    Md2Datepicker2.prototype._createPopupPositionStrategy = function () {
        return this._overlay.position()
            .connectedTo(this._datepickerInput.getPopupConnectionElementRef(), { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
            .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
            .withFallbackPosition({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' })
            .withFallbackPosition({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' });
    };
    return Md2Datepicker2;
}());
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Md2Datepicker2.prototype, "startAt", null);
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2Datepicker2.prototype, "startView", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], Md2Datepicker2.prototype, "touchUi", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], Md2Datepicker2.prototype, "selectedChanged", void 0);
Md2Datepicker2 = __decorate([
    Component({selector: 'md2-datepicker2',
        template: '<ng-content></ng-content>',
    }),
    __param(4, Optional()),
    __param(5, Optional()),
    __metadata("design:paramtypes", [Overlay,
        NgZone,
        ViewContainerRef,
        ScrollDispatcher,
        DateAdapter,
        Dir])
], Md2Datepicker2);
export { Md2Datepicker2 };
//# sourceMappingURL=datepicker2.js.map