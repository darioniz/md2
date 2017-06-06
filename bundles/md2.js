/**
  * @license Md2 v0.0.21
  * Copyright (c) 2017 Promact, Inc. http://code.promactinfo.com/md2/
  * License: MIT
  */
import { ApplicationRef, Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ContentChildren, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Injectable, InjectionToken, Injector, Input, IterableDiffers, NgModule, NgZone, Optional, Output, Pipe, QueryList, Renderer, Renderer2, Self, SkipSelf, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, forwardRef, isDevMode } from '@angular/core';
import { DOCUMENT, HammerGestureConfig } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/auditTime';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, NgForm, Validators } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';

var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
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
const MATERIAL_COMPATIBILITY_MODE = new InjectionToken('md-compatibility-mode');
/** Injection token that configures whether the Material sanity checks are enabled. */
const MATERIAL_SANITY_CHECKS = new InjectionToken('md-sanity-checks');
/**
 * Returns an exception to be thrown if the consumer has used
 * an invalid Material prefix on a component.
 * @docs-private
 */
function getMdCompatibilityInvalidPrefixError(prefix, nodeName) {
    return new Error(`The "${prefix}-" prefix cannot be used in ng-material v1 compatibility mode. ` +
        `It was used on an "${nodeName.toLowerCase()}" element.`);
}
/** Selector that matches all elements that may have style collisions with AngularJS Material. */
const MAT_ELEMENTS_SELECTOR = `
  [mat-button],
  [mat-card-subtitle],
  [mat-card-title],
  [mat-dialog-actions],
  [mat-dialog-close],
  [mat-dialog-content],
  [mat-dialog-title],
  [mat-fab],
  [mat-icon-button],
  [mat-menu-trigger-for],
  [mat-mini-fab],
  [mat-raised-button],
  [mat-tab-label],
  [mat-tab-link],
  [mat-tab-nav-bar],
  [matTooltip],
  mat-autocomplete,
  mat-button-toggle,
  mat-button-toggle-group,
  mat-button-toggle,
  mat-card,
  mat-card-actions,
  mat-card-content,
  mat-card-footer,
  mat-card-header,
  mat-card-subtitle,
  mat-card-title,
  mat-card-title-group,
  mat-checkbox,
  mat-chip,
  mat-dialog-actions,
  mat-dialog-container,
  mat-dialog-content,
  mat-divider,
  mat-grid-list,
  mat-grid-tile,
  mat-grid-tile-footer,
  mat-grid-tile-header,
  mat-hint,
  mat-icon,
  mat-list,
  mat-list-item,
  mat-menu,
  mat-nav-list,
  mat-option,
  mat-placeholder,
  mat-progress-bar,
  mat-pseudo-checkbox,
  mat-radio-button,
  mat-radio-group,
  mat-select,
  mat-sidenav,
  mat-sidenav-container,
  mat-slider,
  mat-spinner,
  mat-tab,
  mat-tab-group,
  mat-toolbar,
  mat-error`;
/** Selector that matches all elements that may have style collisions with AngularJS Material. */
const MD_ELEMENTS_SELECTOR = `
  [md-button],
  [md-card-subtitle],
  [md-card-title],
  [md-dialog-actions],
  [md-dialog-close],
  [md-dialog-content],
  [md-dialog-title],
  [md-fab],
  [md-icon-button],
  [md-menu-trigger-for],
  [md-mini-fab],
  [md-raised-button],
  [md-tab-label],
  [md-tab-link],
  [md-tab-nav-bar],
  [mdTooltip],
  md-autocomplete,
  md-button-toggle,
  md-button-toggle-group,
  md-button-toggle,
  md-card,
  md-card-actions,
  md-card-content,
  md-card-footer,
  md-card-header,
  md-card-subtitle,
  md-card-title,
  md-card-title-group,
  md-checkbox,
  md-chip,
  md-dialog-actions,
  md-dialog-container,
  md-dialog-content,
  md-divider,
  md-grid-list,
  md-grid-tile,
  md-grid-tile-footer,
  md-grid-tile-header,
  md-hint,
  md-icon,
  md-list,
  md-list-item,
  md-menu,
  md-nav-list,
  md-option,
  md-placeholder,
  md-progress-bar,
  md-pseudo-checkbox,
  md-radio-button,
  md-radio-group,
  md-select,
  md-sidenav,
  md-sidenav-container,
  md-slider,
  md-spinner,
  md-tab,
  md-tab-group,
  md-toolbar,
  md-error`;
/** Directive that enforces that the `mat-` prefix cannot be used. */
let MatPrefixRejector = class MatPrefixRejector {
    constructor(isCompatibilityMode, elementRef) {
        if (!isCompatibilityMode) {
            throw getMdCompatibilityInvalidPrefixError('mat', elementRef.nativeElement.nodeName);
        }
    }
};
MatPrefixRejector = __decorate$3([
    Directive({ selector: MAT_ELEMENTS_SELECTOR }),
    __param(0, Optional()), __param(0, Inject(MATERIAL_COMPATIBILITY_MODE)),
    __metadata("design:paramtypes", [Boolean, ElementRef])
], MatPrefixRejector);
/** Directive that enforces that the `md-` prefix cannot be used. */
let MdPrefixRejector = class MdPrefixRejector {
    constructor(isCompatibilityMode, elementRef) {
        if (isCompatibilityMode) {
            throw getMdCompatibilityInvalidPrefixError('md', elementRef.nativeElement.nodeName);
        }
    }
};
MdPrefixRejector = __decorate$3([
    Directive({ selector: MD_ELEMENTS_SELECTOR }),
    __param(0, Optional()), __param(0, Inject(MATERIAL_COMPATIBILITY_MODE)),
    __metadata("design:paramtypes", [Boolean, ElementRef])
], MdPrefixRejector);
/**
 * Module that enforces the default compatibility mode settings. When this module is loaded
 * without NoConflictStyleCompatibilityMode also being imported, it will throw an error if
 * there are any uses of the `mat-` prefix.
 */
let CompatibilityModule = class CompatibilityModule {
    constructor(_document, _sanityChecksEnabled) {
        this._document = _document;
        /** Whether we've done the global sanity checks (e.g. a theme is loaded, there is a doctype). */
        this._hasDoneGlobalChecks = false;
        if (_sanityChecksEnabled && !this._hasDoneGlobalChecks && _document && isDevMode()) {
            // Delay running the check to allow more time for the user's styles to load.
            this._checkDoctype();
            this._checkTheme();
            this._hasDoneGlobalChecks = true;
        }
    }
    _checkDoctype() {
        if (!this._document.doctype) {
            console.warn('Current document does not have a doctype. This may cause ' +
                'some Angular Material components not to behave as expected.');
        }
    }
    _checkTheme() {
        if (typeof getComputedStyle === 'function') {
            const testElement = this._document.createElement('div');
            testElement.classList.add('mat-theme-loaded-marker');
            this._document.body.appendChild(testElement);
            if (getComputedStyle(testElement).display !== 'none') {
                console.warn('Could not find Angular Material core theme. Most Material ' +
                    'components may not work as expected. For more info refer ' +
                    'to the theming guide: https://material.angular.io/guide/theming');
            }
            this._document.body.removeChild(testElement);
        }
    }
};
CompatibilityModule = __decorate$3([
    NgModule({
        declarations: [MatPrefixRejector, MdPrefixRejector],
        exports: [MatPrefixRejector, MdPrefixRejector],
        providers: [{
                provide: MATERIAL_SANITY_CHECKS, useValue: true,
            }],
    }),
    __param(0, Optional()), __param(0, Inject(DOCUMENT)),
    __param(1, Optional()), __param(1, Inject(MATERIAL_SANITY_CHECKS)),
    __metadata("design:paramtypes", [Object, Boolean])
], CompatibilityModule);
/**
 * Module that enforces "no-conflict" compatibility mode settings. When this module is loaded,
 * it will throw an error if there are any uses of the `md-` prefix.
 */
let NoConflictStyleCompatibilityMode = class NoConflictStyleCompatibilityMode {
};
NoConflictStyleCompatibilityMode = __decorate$3([
    NgModule({
        providers: [{
                provide: MATERIAL_COMPATIBILITY_MODE, useValue: true,
            }],
    })
], NoConflictStyleCompatibilityMode);

var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Module that captures anything that should be loaded and/or run for *all* Angular Material
 * components. This includes Bidi, compatibility mode, etc.
 *
 * This module should be imported to each top-level component module (e.g., MdTabsModule).
 */
let MdCommonModule = class MdCommonModule {
};
MdCommonModule = __decorate$2([
    NgModule({
        imports: [CompatibilityModule],
        exports: [CompatibilityModule],
    })
], MdCommonModule);

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a @ContentChildren(MdLine) query, then
 * counted by checking the query list's length.
 */
let MdLine = class MdLine {
};
MdLine = __decorate$1([
    Directive({
        selector: '[md-line], [mat-line]',
        host: {
            '[class.mat-line]': 'true'
        }
    })
], MdLine);
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * @docs-private
 */
class MdLineSetter {
    constructor(_lines, _renderer, _element) {
        this._lines = _lines;
        this._renderer = _renderer;
        this._element = _element;
        this._setLineClass(this._lines.length);
        this._lines.changes.subscribe(() => {
            this._setLineClass(this._lines.length);
        });
    }
    _setLineClass(count) {
        this._resetClasses();
        if (count === 2 || count === 3) {
            this._setClass(`mat-${count}-line`, true);
        }
        else if (count > 3) {
            this._setClass(`mat-multi-line`, true);
        }
    }
    _resetClasses() {
        this._setClass('mat-2-line', false);
        this._setClass('mat-3-line', false);
        this._setClass('mat-multi-line', false);
    }
    _setClass(className, isAdd) {
        if (isAdd) {
            this._renderer.addClass(this._element.nativeElement, className);
        }
        else {
            this._renderer.removeClass(this._element.nativeElement, className);
        }
    }
}
let MdLineModule = class MdLineModule {
};
MdLineModule = __decorate$1([
    NgModule({
        imports: [MdCommonModule],
        exports: [MdLine, MdCommonModule],
        declarations: [MdLine],
    })
], MdLineModule);

var __decorate$4 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Directive to listen for changes of direction of part of the DOM.
 *
 * Applications should use this directive instead of the native attribute so that Material
 * components can listen on changes of direction.
 */
let Dir = class Dir {
    /**
     * Directive to listen for changes of direction of part of the DOM.
     *
     * Applications should use this directive instead of the native attribute so that Material
     * components can listen on changes of direction.
     */
    constructor() {
        /** Layout direction of the element. */
        this._dir = 'ltr';
        /** Event emitted when the direction changes. */
        this.dirChange = new EventEmitter();
    }
    /** @docs-private */
    get dir() {
        return this._dir;
    }
    set dir(v) {
        let old = this._dir;
        this._dir = v;
        if (old != this._dir) {
            this.dirChange.emit();
        }
    }
    /** Current layout direction of the element. */
    get value() { return this.dir; }
    set value(v) { this.dir = v; }
};
__decorate$4([
    Input('dir'),
    __metadata$1("design:type", String)
], Dir.prototype, "_dir", void 0);
__decorate$4([
    Output(),
    __metadata$1("design:type", Object)
], Dir.prototype, "dirChange", void 0);
__decorate$4([
    HostBinding('attr.dir'),
    __metadata$1("design:type", String),
    __metadata$1("design:paramtypes", [String])
], Dir.prototype, "dir", null);
Dir = __decorate$4([
    Directive({
        selector: '[dir]',
        // TODO(hansl): maybe `$implicit` isn't the best option here, but for now that's the best we got.
        exportAs: '$implicit'
    })
], Dir);
let RtlModule = class RtlModule {
};
RtlModule = __decorate$4([
    NgModule({
        exports: [Dir],
        declarations: [Dir]
    })
], RtlModule);

var __decorate$5 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Factory that creates a new MutationObserver and allows us to stub it out in unit tests.
 * @docs-private
 */
let MdMutationObserverFactory = class MdMutationObserverFactory {
    create(callback) {
        return new MutationObserver(callback);
    }
};
MdMutationObserverFactory = __decorate$5([
    Injectable()
], MdMutationObserverFactory);
/**
 * Directive that triggers a callback whenever the content of
 * its associated element has changed.
 */
let ObserveContent = class ObserveContent {
    constructor(_mutationObserverFactory, _elementRef) {
        this._mutationObserverFactory = _mutationObserverFactory;
        this._elementRef = _elementRef;
        /** Event emitted for each change in the element's content. */
        this.event = new EventEmitter();
        /** Used for debouncing the emitted values to the observeContent event. */
        this._debouncer = new Subject();
    }
    ngAfterContentInit() {
        if (this.debounce > 0) {
            this._debouncer
                .debounceTime(this.debounce)
                .subscribe(mutations => this.event.emit(mutations));
        }
        else {
            this._debouncer.subscribe(mutations => this.event.emit(mutations));
        }
        this._observer = this._mutationObserverFactory.create((mutations) => {
            this._debouncer.next(mutations);
        });
        this._observer.observe(this._elementRef.nativeElement, {
            characterData: true,
            childList: true,
            subtree: true
        });
    }
    ngOnDestroy() {
        if (this._observer) {
            this._observer.disconnect();
            this._debouncer.complete();
            this._debouncer = this._observer = null;
        }
    }
};
__decorate$5([
    Output('cdkObserveContent'),
    __metadata$2("design:type", Object)
], ObserveContent.prototype, "event", void 0);
__decorate$5([
    Input(),
    __metadata$2("design:type", Number)
], ObserveContent.prototype, "debounce", void 0);
ObserveContent = __decorate$5([
    Directive({
        selector: '[cdkObserveContent]'
    }),
    __metadata$2("design:paramtypes", [MdMutationObserverFactory,
        ElementRef])
], ObserveContent);
let ObserveContentModule = class ObserveContentModule {
};
ObserveContentModule = __decorate$5([
    NgModule({
        exports: [ObserveContent],
        declarations: [ObserveContent],
        providers: [MdMutationObserverFactory]
    })
], ObserveContentModule);

/** Possible states for a ripple element. */
var RippleState;
(function (RippleState) {
    RippleState[RippleState["FADING_IN"] = 0] = "FADING_IN";
    RippleState[RippleState["VISIBLE"] = 1] = "VISIBLE";
    RippleState[RippleState["FADING_OUT"] = 2] = "FADING_OUT";
    RippleState[RippleState["HIDDEN"] = 3] = "HIDDEN";
})(RippleState || (RippleState = {}));
/**
 * Reference to a previously launched ripple element.
 */
class RippleRef {
    constructor(_renderer, element, config) {
        this._renderer = _renderer;
        this.element = element;
        this.config = config;
        /** Current state of the ripple reference. */
        this.state = RippleState.HIDDEN;
    }
    /** Fades out the ripple element. */
    fadeOut() {
        this._renderer.fadeOutRipple(this);
    }
}

/** Fade-in duration for the ripples. Can be modified with the speedFactor option. */
const RIPPLE_FADE_IN_DURATION = 450;
/** Fade-out duration for the ripples in milliseconds. This can't be modified by the speedFactor. */
const RIPPLE_FADE_OUT_DURATION = 400;
/**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * @docs-private
 */
class RippleRenderer {
    constructor(elementRef, _ngZone, _ruler, platform) {
        this._ngZone = _ngZone;
        this._ruler = _ruler;
        /** Whether the mouse is currently down or not. */
        this._isMousedown = false;
        /** Events to be registered on the trigger element. */
        this._triggerEvents = new Map();
        /** Set of currently active ripple references. */
        this._activeRipples = new Set();
        /** Ripple config for all ripples created by events. */
        this.rippleConfig = {};
        /** Whether mouse ripples should be created or not. */
        this.rippleDisabled = false;
        // Only do anything if we're on the browser.
        if (platform.isBrowser) {
            this._containerElement = elementRef.nativeElement;
            // Specify events which need to be registered on the trigger.
            this._triggerEvents.set('mousedown', this.onMousedown.bind(this));
            this._triggerEvents.set('mouseup', this.onMouseup.bind(this));
            this._triggerEvents.set('mouseleave', this.onMouseLeave.bind(this));
            // By default use the host element as trigger element.
            this.setTriggerElement(this._containerElement);
        }
    }
    /** Fades in a ripple at the given coordinates. */
    fadeInRipple(pageX, pageY, config = {}) {
        let containerRect = this._containerElement.getBoundingClientRect();
        if (config.centered) {
            pageX = containerRect.left + containerRect.width / 2;
            pageY = containerRect.top + containerRect.height / 2;
        }
        else {
            // Subtract scroll values from the coordinates because calculations below
            // are always relative to the viewport rectangle.
            let scrollPosition = this._ruler.getViewportScrollPosition();
            pageX -= scrollPosition.left;
            pageY -= scrollPosition.top;
        }
        let radius = config.radius || distanceToFurthestCorner(pageX, pageY, containerRect);
        let duration = RIPPLE_FADE_IN_DURATION * (1 / (config.speedFactor || 1));
        let offsetX = pageX - containerRect.left;
        let offsetY = pageY - containerRect.top;
        let ripple = document.createElement('div');
        ripple.classList.add('mat-ripple-element');
        ripple.style.left = `${offsetX - radius}px`;
        ripple.style.top = `${offsetY - radius}px`;
        ripple.style.height = `${radius * 2}px`;
        ripple.style.width = `${radius * 2}px`;
        // If the color is not set, the default CSS color will be used.
        ripple.style.backgroundColor = config.color;
        ripple.style.transitionDuration = `${duration}ms`;
        this._containerElement.appendChild(ripple);
        // By default the browser does not recalculate the styles of dynamically created
        // ripple elements. This is critical because then the `scale` would not animate properly.
        enforceStyleRecalculation(ripple);
        ripple.style.transform = 'scale(1)';
        // Exposed reference to the ripple that will be returned.
        let rippleRef = new RippleRef(this, ripple, config);
        rippleRef.state = RippleState.FADING_IN;
        // Add the ripple reference to the list of all active ripples.
        this._activeRipples.add(rippleRef);
        // Wait for the ripple element to be completely faded in.
        // Once it's faded in, the ripple can be hidden immediately if the mouse is released.
        this.runTimeoutOutsideZone(() => {
            rippleRef.state = RippleState.VISIBLE;
            if (!config.persistent && !this._isMousedown) {
                rippleRef.fadeOut();
            }
        }, duration);
        return rippleRef;
    }
    /** Fades out a ripple reference. */
    fadeOutRipple(rippleRef) {
        // For ripples that are not active anymore, don't re-un the fade-out animation.
        if (!this._activeRipples.delete(rippleRef)) {
            return;
        }
        let rippleEl = rippleRef.element;
        rippleEl.style.transitionDuration = `${RIPPLE_FADE_OUT_DURATION}ms`;
        rippleEl.style.opacity = '0';
        rippleRef.state = RippleState.FADING_OUT;
        // Once the ripple faded out, the ripple can be safely removed from the DOM.
        this.runTimeoutOutsideZone(() => {
            rippleRef.state = RippleState.HIDDEN;
            rippleEl.parentNode.removeChild(rippleEl);
        }, RIPPLE_FADE_OUT_DURATION);
    }
    /** Fades out all currently active ripples. */
    fadeOutAll() {
        this._activeRipples.forEach(ripple => ripple.fadeOut());
    }
    /** Sets the trigger element and registers the mouse events. */
    setTriggerElement(element) {
        // Remove all previously register event listeners from the trigger element.
        if (this._triggerElement) {
            this._triggerEvents.forEach((fn, type) => this._triggerElement.removeEventListener(type, fn));
        }
        if (element) {
            // If the element is not null, register all event listeners on the trigger element.
            this._ngZone.runOutsideAngular(() => {
                this._triggerEvents.forEach((fn, type) => element.addEventListener(type, fn));
            });
        }
        this._triggerElement = element;
    }
    /** Listener being called on mousedown event. */
    onMousedown(event) {
        if (!this.rippleDisabled) {
            this._isMousedown = true;
            this.fadeInRipple(event.pageX, event.pageY, this.rippleConfig);
        }
    }
    /** Listener being called on mouseup event. */
    onMouseup() {
        this._isMousedown = false;
        // Fade-out all ripples that are completely visible and not persistent.
        this._activeRipples.forEach(ripple => {
            if (!ripple.config.persistent && ripple.state === RippleState.VISIBLE) {
                ripple.fadeOut();
            }
        });
    }
    /** Listener being called on mouseleave event. */
    onMouseLeave() {
        if (this._isMousedown) {
            this.onMouseup();
        }
    }
    /** Runs a timeout outside of the Angular zone to avoid triggering the change detection. */
    runTimeoutOutsideZone(fn, delay = 0) {
        this._ngZone.runOutsideAngular(() => setTimeout(fn, delay));
    }
}
/** Enforces a style recalculation of a DOM element by computing its styles. */
// TODO(devversion): Move into global utility function.
function enforceStyleRecalculation(element) {
    // Enforce a style recalculation by calling `getComputedStyle` and accessing any property.
    // Calling `getPropertyValue` is important to let optimizers know that this is not a noop.
    // See: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
    window.getComputedStyle(element).getPropertyValue('opacity');
}
/**
 * Returns the distance from the point (x, y) to the furthest corner of a rectangle.
 */
function distanceToFurthestCorner(x, y, rect) {
    const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
    const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return Math.sqrt(distX * distX + distY * distY);
}

var __decorate$12 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Whether the current platform supports the V8 Break Iterator. The V8 check
// is necessary to detect all Blink based browsers.
const hasV8BreakIterator = (typeof (Intl) !== 'undefined' && Intl.v8BreakIterator);
/**
 * Service to detect the current platform by comparing the userAgent strings and
 * checking browser-specific global properties.
 * @docs-private
 */
let Platform = class Platform {
    /**
     * Service to detect the current platform by comparing the userAgent strings and
     * checking browser-specific global properties.
     * @docs-private
     */
    constructor() {
        this.isBrowser = typeof document === 'object' && !!document;
        /** Layout Engines */
        this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
        this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
        // EdgeHTML and Trident mock Blink specific things and need to be excluded from this check.
        this.BLINK = this.isBrowser &&
            (!!(window.chrome || hasV8BreakIterator) && !!CSS && !this.EDGE && !this.TRIDENT);
        // Webkit is part of the userAgent in EdgeHTML, Blink and Trident. Therefore we need to
        // ensure that Webkit runs standalone and is not used as another engine's base.
        this.WEBKIT = this.isBrowser &&
            /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT;
        /** Browsers and Platform Types */
        this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        // It's difficult to detect the plain Gecko engine, because most of the browsers identify
        // them self as Gecko-like browsers and modify the userAgent's according to that.
        // Since we only cover one explicit Firefox case, we can simply check for Firefox
        // instead of having an unstable check for Gecko.
        this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
        // Trident on mobile adds the android platform to the userAgent to trick detections.
        this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;
    }
};
Platform = __decorate$12([
    Injectable()
], Platform);

let supportedInputTypes;
/** @returns The input types supported by this browser. */
function getSupportedInputTypes() {
    if (!supportedInputTypes) {
        let featureTestInput = document.createElement('input');
        supportedInputTypes = new Set([
            // `color` must come first. Chrome 56 shows a warning if we change the type to `color` after
            // first changing it to something else:
            // The specified value "" does not conform to the required format.
            // The format is "#rrggbb" where rr, gg, bb are two-digit hexadecimal numbers.
            'color',
            'button',
            'checkbox',
            'date',
            'datetime-local',
            'email',
            'file',
            'hidden',
            'image',
            'month',
            'number',
            'password',
            'radio',
            'range',
            'reset',
            'search',
            'submit',
            'tel',
            'text',
            'time',
            'url',
            'week',
        ].filter(value => {
            featureTestInput.setAttribute('type', value);
            return featureTestInput.type === value;
        }));
    }
    return supportedInputTypes;
}

var __decorate$11 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let PlatformModule = class PlatformModule {
};
PlatformModule = __decorate$11([
    NgModule({
        providers: [Platform]
    })
], PlatformModule);

var __decorate$10 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$5 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Time in ms to throttle the scrolling events by default. */
const DEFAULT_SCROLL_TIME = 20;
/**
 * Service contained all registered Scrollable references and emits an event when any one of the
 * Scrollable references emit a scrolled event.
 */
let ScrollDispatcher = class ScrollDispatcher {
    constructor(_ngZone, _platform) {
        this._ngZone = _ngZone;
        this._platform = _platform;
        /** Subject for notifying that a registered scrollable reference element has been scrolled. */
        this._scrolled = new Subject();
        /** Keeps track of the global `scroll` and `resize` subscriptions. */
        this._globalSubscription = null;
        /** Keeps track of the amount of subscriptions to `scrolled`. Used for cleaning up afterwards. */
        this._scrolledCount = 0;
        /**
         * Map of all the scrollable references that are registered with the service and their
         * scroll event subscriptions.
         */
        this.scrollableReferences = new Map();
    }
    /**
     * Registers a Scrollable with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event in its scrolled observable.
     * @param scrollable Scrollable instance to be registered.
     */
    register(scrollable) {
        const scrollSubscription = scrollable.elementScrolled().subscribe(() => this._notify());
        this.scrollableReferences.set(scrollable, scrollSubscription);
    }
    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     * @param scrollable Scrollable instance to be deregistered.
     */
    deregister(scrollable) {
        if (this.scrollableReferences.has(scrollable)) {
            this.scrollableReferences.get(scrollable).unsubscribe();
            this.scrollableReferences.delete(scrollable);
        }
    }
    /**
     * Subscribes to an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     */
    scrolled(auditTimeInMs = DEFAULT_SCROLL_TIME, callback) {
        // Scroll events can only happen on the browser, so do nothing if we're not on the browser.
        if (!this._platform.isBrowser) {
            return Subscription.EMPTY;
        }
        // In the case of a 0ms delay, use an observable without auditTime
        // since it does add a perceptible delay in processing overhead.
        let observable = auditTimeInMs > 0 ?
            this._scrolled.asObservable().auditTime(auditTimeInMs) :
            this._scrolled.asObservable();
        this._scrolledCount++;
        if (!this._globalSubscription) {
            this._globalSubscription = this._ngZone.runOutsideAngular(() => {
                return Observable.merge(Observable.fromEvent(window.document, 'scroll'), Observable.fromEvent(window, 'resize')).subscribe(() => this._notify());
            });
        }
        // Note that we need to do the subscribing from here, in order to be able to remove
        // the global event listeners once there are no more subscriptions.
        let subscription = observable.subscribe(callback);
        subscription.add(() => {
            this._scrolledCount--;
            if (this._globalSubscription && !this.scrollableReferences.size && !this._scrolledCount) {
                this._globalSubscription.unsubscribe();
                this._globalSubscription = null;
            }
        });
        return subscription;
    }
    /** Returns all registered Scrollables that contain the provided element. */
    getScrollContainers(elementRef) {
        const scrollingContainers = [];
        this.scrollableReferences.forEach((subscription, scrollable) => {
            if (this.scrollableContainsElement(scrollable, elementRef)) {
                scrollingContainers.push(scrollable);
            }
        });
        return scrollingContainers;
    }
    /** Returns true if the element is contained within the provided Scrollable. */
    scrollableContainsElement(scrollable, elementRef) {
        let element = elementRef.nativeElement;
        let scrollableElement = scrollable.getElementRef().nativeElement;
        // Traverse through the element parents until we reach null, checking if any of the elements
        // are the scrollable's element.
        do {
            if (element == scrollableElement) {
                return true;
            }
        } while (element = element.parentElement);
    }
    /** Sends a notification that a scroll event has been fired. */
    _notify() {
        this._scrolled.next();
    }
};
ScrollDispatcher = __decorate$10([
    Injectable(),
    __metadata$5("design:paramtypes", [NgZone, Platform])
], ScrollDispatcher);
function SCROLL_DISPATCHER_PROVIDER_FACTORY(parentDispatcher, ngZone, platform) {
    return parentDispatcher || new ScrollDispatcher(ngZone, platform);
}
const SCROLL_DISPATCHER_PROVIDER = {
    // If there is already a ScrollDispatcher available, use that. Otherwise, provide a new one.
    provide: ScrollDispatcher,
    deps: [[new Optional(), new SkipSelf(), ScrollDispatcher], NgZone, Platform],
    useFactory: SCROLL_DISPATCHER_PROVIDER_FACTORY
};

var __decorate$9 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$4 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Simple utility for getting the bounds of the browser viewport.
 * @docs-private
 */
let ViewportRuler = class ViewportRuler {
    constructor(scrollDispatcher) {
        // Subscribe to scroll and resize events and update the document rectangle on changes.
        scrollDispatcher.scrolled(null, () => this._cacheViewportGeometry());
    }
    /** Gets a ClientRect for the viewport's bounds. */
    getViewportRect(documentRect = this._documentRect) {
        // Cache the document bounding rect so that we don't recompute it for multiple calls.
        if (!documentRect) {
            this._cacheViewportGeometry();
            documentRect = this._documentRect;
        }
        // Use the document element's bounding rect rather than the window scroll properties
        // (e.g. pageYOffset, scrollY) due to in issue in Chrome and IE where window scroll
        // properties and client coordinates (boundingClientRect, clientX/Y, etc.) are in different
        // conceptual viewports. Under most circumstances these viewports are equivalent, but they
        // can disagree when the page is pinch-zoomed (on devices that support touch).
        // See https://bugs.chromium.org/p/chromium/issues/detail?id=489206#c4
        // We use the documentElement instead of the body because, by default (without a css reset)
        // browsers typically give the document body an 8px margin, which is not included in
        // getBoundingClientRect().
        const scrollPosition = this.getViewportScrollPosition(documentRect);
        const height = window.innerHeight;
        const width = window.innerWidth;
        return {
            top: scrollPosition.top,
            left: scrollPosition.left,
            bottom: scrollPosition.top + height,
            right: scrollPosition.left + width,
            height,
            width,
        };
    }
    /**
     * Gets the (top, left) scroll position of the viewport.
     * @param documentRect
     */
    getViewportScrollPosition(documentRect = this._documentRect) {
        // Cache the document bounding rect so that we don't recompute it for multiple calls.
        if (!documentRect) {
            this._cacheViewportGeometry();
            documentRect = this._documentRect;
        }
        // The top-left-corner of the viewport is determined by the scroll position of the document
        // body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
        // whether `document.body` or `document.documentElement` is the scrolled element, so reading
        // `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
        // `document.documentElement` works consistently, where the `top` and `left` values will
        // equal negative the scroll position.
        const top = -documentRect.top || document.body.scrollTop || window.scrollY ||
            document.documentElement.scrollTop || 0;
        const left = -documentRect.left || document.body.scrollLeft || window.scrollX ||
            document.documentElement.scrollLeft || 0;
        return { top, left };
    }
    /** Caches the latest client rectangle of the document element. */
    _cacheViewportGeometry() {
        this._documentRect = document.documentElement.getBoundingClientRect();
    }
};
ViewportRuler = __decorate$9([
    Injectable(),
    __metadata$4("design:paramtypes", [ScrollDispatcher])
], ViewportRuler);
function VIEWPORT_RULER_PROVIDER_FACTORY(parentRuler, scrollDispatcher) {
    return parentRuler || new ViewportRuler(scrollDispatcher);
}
const VIEWPORT_RULER_PROVIDER = {
    // If there is already a ViewportRuler available, use that. Otherwise, provide a new one.
    provide: ViewportRuler,
    deps: [[new Optional(), new SkipSelf(), ViewportRuler], ScrollDispatcher],
    useFactory: VIEWPORT_RULER_PROVIDER_FACTORY
};

var __decorate$8 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$3 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$1 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/** Injection token that can be used to specify the global ripple options. */
const MD_RIPPLE_GLOBAL_OPTIONS = new InjectionToken('md-ripple-global-options');
let MdRipple = class MdRipple {
    constructor(elementRef, ngZone, ruler, platform, globalOptions) {
        /**
         * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
         * will be the distance from the center of the ripple to the furthest corner of the host element's
         * bounding rectangle.
         */
        this.radius = 0;
        /**
         * If set, the normal duration of ripple animations is divided by this value. For example,
         * setting it to 0.5 will cause the animations to take twice as long.
         * A changed speedFactor will not modify the fade-out duration of the ripples.
         */
        this.speedFactor = 1;
        this._rippleRenderer = new RippleRenderer(elementRef, ngZone, ruler, platform);
        this._globalOptions = globalOptions ? globalOptions : {};
        this._updateRippleRenderer();
    }
    ngOnChanges(changes) {
        if (changes['trigger'] && this.trigger) {
            this._rippleRenderer.setTriggerElement(this.trigger);
        }
        this._updateRippleRenderer();
    }
    ngOnDestroy() {
        // Set the trigger element to null to cleanup all listeners.
        this._rippleRenderer.setTriggerElement(null);
    }
    /** Launches a manual ripple at the specified position. */
    launch(pageX, pageY, config = this.rippleConfig) {
        return this._rippleRenderer.fadeInRipple(pageX, pageY, config);
    }
    /** Fades out all currently showing ripple elements. */
    fadeOutAll() {
        this._rippleRenderer.fadeOutAll();
    }
    /** Ripple configuration from the directive's input values. */
    get rippleConfig() {
        return {
            centered: this.centered,
            speedFactor: this.speedFactor * (this._globalOptions.baseSpeedFactor || 1),
            radius: this.radius,
            color: this.color
        };
    }
    /** Updates the ripple renderer with the latest ripple configuration. */
    _updateRippleRenderer() {
        this._rippleRenderer.rippleDisabled = this._globalOptions.disabled || this.disabled;
        this._rippleRenderer.rippleConfig = this.rippleConfig;
    }
};
__decorate$8([
    Input('mdRippleTrigger'),
    __metadata$3("design:type", HTMLElement)
], MdRipple.prototype, "trigger", void 0);
__decorate$8([
    Input('mdRippleCentered'),
    __metadata$3("design:type", Boolean)
], MdRipple.prototype, "centered", void 0);
__decorate$8([
    Input('mdRippleDisabled'),
    __metadata$3("design:type", Boolean)
], MdRipple.prototype, "disabled", void 0);
__decorate$8([
    Input('mdRippleRadius'),
    __metadata$3("design:type", Number)
], MdRipple.prototype, "radius", void 0);
__decorate$8([
    Input('mdRippleSpeedFactor'),
    __metadata$3("design:type", Number)
], MdRipple.prototype, "speedFactor", void 0);
__decorate$8([
    Input('mdRippleColor'),
    __metadata$3("design:type", String)
], MdRipple.prototype, "color", void 0);
__decorate$8([
    Input('mdRippleUnbounded'),
    __metadata$3("design:type", Boolean)
], MdRipple.prototype, "unbounded", void 0);
MdRipple = __decorate$8([
    Directive({
        selector: '[md-ripple], [mat-ripple], [mdRipple], [matRipple]',
        exportAs: 'mdRipple',
        host: {
            'class': 'mat-ripple',
            '[class.mat-ripple-unbounded]': 'unbounded'
        }
    }),
    __param$1(4, Optional()), __param$1(4, Inject(MD_RIPPLE_GLOBAL_OPTIONS)),
    __metadata$3("design:paramtypes", [ElementRef,
        NgZone,
        ViewportRuler,
        Platform, Object])
], MdRipple);

var __decorate$14 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$6 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Sends an event when the directive's element is scrolled. Registers itself with the
 * ScrollDispatcher service to include itself as part of its collection of scrolling events that it
 * can be listened to through the service.
 */
let Scrollable = class Scrollable {
    constructor(_elementRef, _scroll, _ngZone, _renderer) {
        this._elementRef = _elementRef;
        this._scroll = _scroll;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._elementScrolled = new Subject();
    }
    ngOnInit() {
        this._scrollListener = this._ngZone.runOutsideAngular(() => {
            return this._renderer.listen(this.getElementRef().nativeElement, 'scroll', (event) => {
                this._elementScrolled.next(event);
            });
        });
        this._scroll.register(this);
    }
    ngOnDestroy() {
        this._scroll.deregister(this);
        if (this._scrollListener) {
            this._scrollListener();
            this._scrollListener = null;
        }
    }
    /**
     * Returns observable that emits when a scroll event is fired on the host element.
     */
    elementScrolled() {
        return this._elementScrolled.asObservable();
    }
    getElementRef() {
        return this._elementRef;
    }
};
Scrollable = __decorate$14([
    Directive({
        selector: '[cdk-scrollable], [cdkScrollable]'
    }),
    __metadata$6("design:paramtypes", [ElementRef,
        ScrollDispatcher,
        NgZone,
        Renderer2])
], Scrollable);

/**
 * Strategy that will update the element position as the user is scrolling.
 */
class RepositionScrollStrategy {
    constructor(_scrollDispatcher, _scrollThrottle = 0) {
        this._scrollDispatcher = _scrollDispatcher;
        this._scrollThrottle = _scrollThrottle;
        this._scrollSubscription = null;
    }
    attach(overlayRef) {
        this._overlayRef = overlayRef;
    }
    enable() {
        if (!this._scrollSubscription) {
            this._scrollSubscription = this._scrollDispatcher.scrolled(this._scrollThrottle, () => {
                this._overlayRef.updatePosition();
            });
        }
    }
    disable() {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
            this._scrollSubscription = null;
        }
    }
}

/**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
class CloseScrollStrategy {
    constructor(_scrollDispatcher) {
        this._scrollDispatcher = _scrollDispatcher;
        this._scrollSubscription = null;
    }
    attach(overlayRef) {
        this._overlayRef = overlayRef;
    }
    enable() {
        if (!this._scrollSubscription) {
            this._scrollSubscription = this._scrollDispatcher.scrolled(null, () => {
                if (this._overlayRef.hasAttached()) {
                    this._overlayRef.detach();
                }
                this.disable();
            });
        }
    }
    disable() {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
            this._scrollSubscription = null;
        }
    }
}

/**
 * Scroll strategy that doesn't do anything.
 */
class NoopScrollStrategy {
    enable() { }
    disable() { }
    attach() { }
}

/**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
class BlockScrollStrategy {
    constructor(_viewportRuler) {
        this._viewportRuler = _viewportRuler;
        this._previousHTMLStyles = { top: null, left: null };
        this._isEnabled = false;
    }
    attach() { }
    enable() {
        if (this._canBeEnabled()) {
            const root = document.documentElement;
            this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition();
            // Cache the previous inline styles in case the user had set them.
            this._previousHTMLStyles.left = root.style.left;
            this._previousHTMLStyles.top = root.style.top;
            // Note: we're using the `html` node, instead of the `body`, because the `body` may
            // have the user agent margin, whereas the `html` is guaranteed not to have one.
            root.style.left = `${-this._previousScrollPosition.left}px`;
            root.style.top = `${-this._previousScrollPosition.top}px`;
            root.classList.add('cdk-global-scrollblock');
            this._isEnabled = true;
        }
    }
    disable() {
        if (this._isEnabled) {
            this._isEnabled = false;
            document.documentElement.style.left = this._previousHTMLStyles.left;
            document.documentElement.style.top = this._previousHTMLStyles.top;
            document.documentElement.classList.remove('cdk-global-scrollblock');
            window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top);
        }
    }
    _canBeEnabled() {
        // Since the scroll strategies can't be singletons, we have to use a global CSS class
        // (`cdk-global-scrollblock`) to make sure that we don't try to disable global
        // scrolling multiple times.
        if (document.documentElement.classList.contains('cdk-global-scrollblock') || this._isEnabled) {
            return false;
        }
        const body = document.body;
        const viewport = this._viewportRuler.getViewportRect();
        return body.scrollHeight > viewport.height || body.scrollWidth > viewport.width;
    }
}

var __decorate$13 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let ScrollDispatchModule = class ScrollDispatchModule {
};
ScrollDispatchModule = __decorate$13([
    NgModule({
        imports: [PlatformModule],
        exports: [Scrollable],
        declarations: [Scrollable],
        providers: [SCROLL_DISPATCHER_PROVIDER],
    })
], ScrollDispatchModule);

var __decorate$7 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let MdRippleModule = class MdRippleModule {
};
MdRippleModule = __decorate$7([
    NgModule({
        imports: [MdCommonModule, PlatformModule, ScrollDispatchModule],
        exports: [MdRipple, MdCommonModule],
        declarations: [MdRipple],
        providers: [VIEWPORT_RULER_PROVIDER],
    })
], MdRippleModule);

var __decorate$16 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$7 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with <md-checkbox> and should *not* be used if the user would directly interact
 * with the checkbox. The pseudo-checkbox should only be used as an implementation detail of
 * more complex components that appropriately handle selected / checked state.
 * @docs-private
 */
let MdPseudoCheckbox = class MdPseudoCheckbox {
    constructor(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /** Display state of the checkbox. */
        this.state = 'unchecked';
        /** Whether the checkbox is disabled. */
        this.disabled = false;
        this.color = 'accent';
    }
    /** Color of the checkbox. */
    get color() { return this._color; }
    set color(value) {
        if (value) {
            let nativeElement = this._elementRef.nativeElement;
            this._renderer.removeClass(nativeElement, `mat-${this.color}`);
            this._renderer.addClass(nativeElement, `mat-${value}`);
            this._color = value;
        }
    }
};
__decorate$16([
    Input(),
    __metadata$7("design:type", String)
], MdPseudoCheckbox.prototype, "state", void 0);
__decorate$16([
    Input(),
    __metadata$7("design:type", Boolean)
], MdPseudoCheckbox.prototype, "disabled", void 0);
__decorate$16([
    Input(),
    __metadata$7("design:type", String),
    __metadata$7("design:paramtypes", [String])
], MdPseudoCheckbox.prototype, "color", null);
MdPseudoCheckbox = __decorate$16([
    Component({encapsulation: ViewEncapsulation.None,
        selector: 'md-pseudo-checkbox, mat-pseudo-checkbox',
        styles: [".mat-pseudo-checkbox{width:20px;height:20px;border:2px solid;border-radius:2px;cursor:pointer;display:inline-block;vertical-align:middle;box-sizing:border-box;position:relative;transition:border-color 90ms cubic-bezier(0,0,.2,.1),background-color 90ms cubic-bezier(0,0,.2,.1)}.mat-pseudo-checkbox::after{position:absolute;opacity:0;content:'';border-bottom:2px solid currentColor;transition:opacity 90ms cubic-bezier(0,0,.2,.1)}.mat-pseudo-checkbox.mat-pseudo-checkbox-checked,.mat-pseudo-checkbox.mat-pseudo-checkbox-indeterminate{border:none}.mat-pseudo-checkbox-disabled{cursor:default}.mat-pseudo-checkbox-indeterminate::after{top:9px;left:2px;width:16px;opacity:1}.mat-pseudo-checkbox-checked::after{top:5px;left:3px;width:12px;height:5px;border-left:2px solid currentColor;transform:rotate(-45deg);opacity:1} /*# sourceMappingURL=pseudo-checkbox.css.map */ "],
        template: '',
        host: {
            '[class.mat-pseudo-checkbox]': 'true',
            '[class.mat-pseudo-checkbox-indeterminate]': 'state === "indeterminate"',
            '[class.mat-pseudo-checkbox-checked]': 'state === "checked"',
            '[class.mat-pseudo-checkbox-disabled]': 'disabled',
        },
    }),
    __metadata$7("design:paramtypes", [ElementRef, Renderer2])
], MdPseudoCheckbox);

var __decorate$15 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let MdSelectionModule = class MdSelectionModule {
};
MdSelectionModule = __decorate$15([
    NgModule({
        exports: [MdPseudoCheckbox],
        declarations: [MdPseudoCheckbox]
    })
], MdSelectionModule);

// Due to a bug in the ChromeDriver, Angular keyboard events are not triggered by `sendKeys`
// during E2E tests when using dot notation such as `(keydown.rightArrow)`. To get around this,
// we are temporarily using a single (keydown) handler.
// See: https://github.com/angular/angular/issues/9419
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;
const PAGE_UP = 33;
const PAGE_DOWN = 34;
const HOME = 36;
const END = 35;
const ENTER = 13;
const SPACE = 32;
const TAB = 9;
const ESCAPE = 27;
const BACKSPACE = 8;
const DELETE = 46;
const COMMA = 188;

/** Coerces a data-bound value (typically a string) to a boolean. */
/** Coerces a data-bound value (typically a string) to a boolean. */ function coerceBooleanProperty(value) {
    return value != null && `${value}` !== 'false';
}

/** Mixin to augment a directive with a `disabled` property. */
function mixinDisabled(base) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this._disabled = false;
        }
        get disabled() { return this._disabled; }
        set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    };
}

var __decorate$18 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$9 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Boilerplate for applying mixins to MdOptgroup.
class MdOptgroupBase {
}
const _MdOptgroupMixinBase = mixinDisabled(MdOptgroupBase);
// Counter for unique group ids.
let nextId = 0;
/**
 * Component that is used to group instances of `md-option`.
 */
let MdOptgroup = class MdOptgroup extends _MdOptgroupMixinBase {
    /**
     * Component that is used to group instances of `md-option`.
     */
    constructor() {
        super(...arguments);
        /** Unique id for the underlying label. */
        this._labelId = `mat-optgroup-label-${nextId++}`;
    }
};
__decorate$18([
    Input(),
    __metadata$9("design:type", String)
], MdOptgroup.prototype, "label", void 0);
MdOptgroup = __decorate$18([
    Component({selector: 'md-optgroup, mat-optgroup',
        template: "<label class=\"mat-optgroup-label\" [id]=\"_labelId\">{{ label }}</label><ng-content select=\"md-option, mat-option\"></ng-content>",
        encapsulation: ViewEncapsulation.None,
        inputs: ['disabled'],
        host: {
            'class': 'mat-optgroup',
            'role': 'group',
            '[class.mat-optgroup-disabled]': 'disabled',
            '[attr.aria-disabled]': 'disabled.toString()',
            '[attr.aria-labelledby]': '_labelId',
        }
    })
], MdOptgroup);

var __decorate$17 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$8 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$2 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueIdCounter = 0;
/** Event object emitted by MdOption when selected or deselected. */
class MdOptionSelectionChange {
    constructor(source, isUserInput = false) {
        this.source = source;
        this.isUserInput = isUserInput;
    }
}
/**
 * Single option inside of a `<md-select>` element.
 */
let MdOption = class MdOption {
    constructor(_element, group, _isCompatibilityMode) {
        this._element = _element;
        this.group = group;
        this._isCompatibilityMode = _isCompatibilityMode;
        this._selected = false;
        this._active = false;
        /** Whether the option is disabled.  */
        this._disabled = false;
        this._id = `md-option-${_uniqueIdCounter++}`;
        /** Whether the wrapping component is in multiple selection mode. */
        this.multiple = false;
        /** Event emitted when the option is selected or deselected. */
        this.onSelectionChange = new EventEmitter();
    }
    /** The unique ID of the option. */
    get id() { return this._id; }
    /** Whether or not the option is currently selected. */
    get selected() { return this._selected; }
    /** Whether the option is disabled. */
    get disabled() { return (this.group && this.group.disabled) || this._disabled; }
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     */
    get active() {
        return this._active;
    }
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     */
    get viewValue() {
        // TODO(kara): Add input property alternative for node envs.
        return this._getHostElement().textContent.trim();
    }
    /** Selects the option. */
    select() {
        this._selected = true;
        this._emitSelectionChangeEvent();
    }
    /** Deselects the option. */
    deselect() {
        this._selected = false;
        this._emitSelectionChangeEvent();
    }
    /** Sets focus onto this option. */
    focus() {
        this._getHostElement().focus();
    }
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setActiveStyles() {
        this._active = true;
    }
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setInactiveStyles() {
        this._active = false;
    }
    /** Ensures the option is selected when activated from the keyboard. */
    _handleKeydown(event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this._selectViaInteraction();
        }
    }
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     */
    _selectViaInteraction() {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this._emitSelectionChangeEvent(true);
        }
    }
    /** Returns the correct tabindex for the option depending on disabled state. */
    _getTabIndex() {
        return this.disabled ? '-1' : '0';
    }
    /** Fetches the host DOM element. */
    _getHostElement() {
        return this._element.nativeElement;
    }
    /** Emits the selection change event. */
    _emitSelectionChangeEvent(isUserInput = false) {
        this.onSelectionChange.emit(new MdOptionSelectionChange(this, isUserInput));
    }
};
__decorate$17([
    Input(),
    __metadata$8("design:type", Object)
], MdOption.prototype, "value", void 0);
__decorate$17([
    Input(),
    __metadata$8("design:type", Object),
    __metadata$8("design:paramtypes", [Object])
], MdOption.prototype, "disabled", null);
__decorate$17([
    Output(),
    __metadata$8("design:type", Object)
], MdOption.prototype, "onSelectionChange", void 0);
MdOption = __decorate$17([
    Component({selector: 'md-option, mat-option',
        host: {
            'role': 'option',
            '[attr.tabindex]': '_getTabIndex()',
            '[class.mat-selected]': 'selected',
            '[class.mat-option-multiple]': 'multiple',
            '[class.mat-active]': 'active',
            '[id]': 'id',
            '[attr.aria-selected]': 'selected.toString()',
            '[attr.aria-disabled]': 'disabled.toString()',
            '[class.mat-option-disabled]': 'disabled',
            '(click)': '_selectViaInteraction()',
            '(keydown)': '_handleKeydown($event)',
            '[class.mat-option]': 'true',
        },
        template: "<span [ngSwitch]=\"_isCompatibilityMode\" *ngIf=\"multiple\"><mat-pseudo-checkbox class=\"mat-option-pseudo-checkbox\" *ngSwitchCase=\"true\" [state]=\"selected ? 'checked' : ''\" color=\"primary\"></mat-pseudo-checkbox><md-pseudo-checkbox class=\"mat-option-pseudo-checkbox\" *ngSwitchDefault [state]=\"selected ? 'checked' : ''\" color=\"primary\"></md-pseudo-checkbox></span><ng-content></ng-content><div class=\"mat-option-ripple\" *ngIf=\"!disabled\" md-ripple [mdRippleTrigger]=\"_getHostElement()\"></div>",
        encapsulation: ViewEncapsulation.None
    }),
    __param$2(1, Optional()),
    __param$2(2, Optional()), __param$2(2, Inject(MATERIAL_COMPATIBILITY_MODE)),
    __metadata$8("design:paramtypes", [ElementRef,
        MdOptgroup, Boolean])
], MdOption);

var __decorate$6 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let MdOptionModule = class MdOptionModule {
};
MdOptionModule = __decorate$6([
    NgModule({
        imports: [MdRippleModule, CommonModule, MdSelectionModule],
        exports: [MdOption, MdOptgroup],
        declarations: [MdOption, MdOptgroup]
    })
], MdOptionModule);

/**
 * Throws an exception when attempting to attach a null portal to a host.
 * @docs-private
 */
/**
 * Throws an exception when attempting to attach a null portal to a host.
 * @docs-private
 */ function throwNullPortalError() {
    throw new Error('Must provide a portal to attach');
}
/**
 * Throws an exception when attempting to attach a portal to a host that is already attached.
 * @docs-private
 */
function throwPortalAlreadyAttachedError() {
    throw new Error('Host already has a portal attached');
}
/**
 * Throws an exception when attempting to attach a portal to an already-disposed host.
 * @docs-private
 */
function throwPortalHostAlreadyDisposedError() {
    throw new Error('This PortalHost has already been disposed');
}
/**
 * Throws an exception when attempting to attach an unknown portal type.
 * @docs-private
 */
function throwUnknownPortalTypeError() {
    throw new Error('Attempting to attach an unknown Portal type. BasePortalHost accepts either' +
        'a ComponentPortal or a TemplatePortal.');
}
/**
 * Throws an exception when attempting to attach a portal to a null host.
 * @docs-private
 */
function throwNullPortalHostError() {
    throw new Error('Attempting to attach a portal to a null PortalHost');
}
/**
 * Throws an exception when attempting to detach a portal that is not attached.
 * @docs-privatew
 */
function throwNoPortalAttachedError() {
    throw new Error('Attempting to detach a portal that is not attached to a host');
}
//# sourceMappingURL=portal-errors.js.map

/**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalHost`.
 */
class Portal {
    /** Attach this portal to a host. */
    attach(host) {
        if (host == null) {
            throwNullPortalHostError();
        }
        if (host.hasAttached()) {
            throwPortalAlreadyAttachedError();
        }
        this._attachedHost = host;
        return host.attach(this);
    }
    /** Detach this portal from its host */
    detach() {
        let host = this._attachedHost;
        if (host == null) {
            throwNoPortalAttachedError();
        }
        this._attachedHost = null;
        return host.detach();
    }
    /** Whether this portal is attached to a host. */
    get isAttached() {
        return this._attachedHost != null;
    }
    /**
     * Sets the PortalHost reference without performing `attach()`. This is used directly by
     * the PortalHost when it is performing an `attach()` or `detach()`.
     */
    setAttachedHost(host) {
        this._attachedHost = host;
    }
}
/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 */
class ComponentPortal extends Portal {
    constructor(component, viewContainerRef = null, injector = null) {
        super();
        this.component = component;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
    }
}
/**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
class TemplatePortal extends Portal {
    constructor(template, viewContainerRef) {
        super();
        /**
         * Additional locals for the instantiated embedded view.
         * These locals can be seen as "exports" for the template, such as how ngFor has
         * index / event / odd.
         * See https://angular.io/docs/ts/latest/api/core/EmbeddedViewRef-class.html
         */
        this.locals = new Map();
        this.templateRef = template;
        this.viewContainerRef = viewContainerRef;
    }
    get origin() {
        return this.templateRef.elementRef;
    }
    attach(host, locals) {
        this.locals = locals == null ? new Map() : locals;
        return super.attach(host);
    }
    detach() {
        this.locals = new Map();
        return super.detach();
    }
}
/**
 * Partial implementation of PortalHost that only deals with attaching either a
 * ComponentPortal or a TemplatePortal.
 */
class BasePortalHost {
    constructor() {
        /** Whether this host has already been permanently disposed. */
        this._isDisposed = false;
    }
    /** Whether this host has an attached portal. */
    hasAttached() {
        return !!this._attachedPortal;
    }
    attach(portal) {
        if (!portal) {
            throwNullPortalError();
        }
        if (this.hasAttached()) {
            throwPortalAlreadyAttachedError();
        }
        if (this._isDisposed) {
            throwPortalHostAlreadyDisposedError();
        }
        if (portal instanceof ComponentPortal) {
            this._attachedPortal = portal;
            return this.attachComponentPortal(portal);
        }
        else if (portal instanceof TemplatePortal) {
            this._attachedPortal = portal;
            return this.attachTemplatePortal(portal);
        }
        throwUnknownPortalTypeError();
    }
    detach() {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost(null);
            this._attachedPortal = null;
        }
        this._invokeDisposeFn();
    }
    dispose() {
        if (this.hasAttached()) {
            this.detach();
        }
        this._invokeDisposeFn();
        this._isDisposed = true;
    }
    setDisposeFn(fn) {
        this._disposeFn = fn;
    }
    _invokeDisposeFn() {
        if (this._disposeFn) {
            this._disposeFn();
            this._disposeFn = null;
        }
    }
}

var __decorate$19 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$10 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Directive version of a `TemplatePortal`. Because the directive *is* a TemplatePortal,
 * the directive instance itself can be attached to a host, enabling declarative use of portals.
 *
 * Usage:
 * <ng-template portal #greeting>
 *   <p> Hello {{name}} </p>
 * </ng-template>
 */
let TemplatePortalDirective = class TemplatePortalDirective extends TemplatePortal {
    constructor(templateRef, viewContainerRef) {
        super(templateRef, viewContainerRef);
    }
};
TemplatePortalDirective = __decorate$19([
    Directive({
        selector: '[cdk-portal], [cdkPortal], [portal]',
        exportAs: 'cdkPortal',
    }),
    __metadata$10("design:paramtypes", [TemplateRef, ViewContainerRef])
], TemplatePortalDirective);
/**
 * Directive version of a PortalHost. Because the directive *is* a PortalHost, portals can be
 * directly attached to it, enabling declarative use.
 *
 * Usage:
 * <ng-template [cdkPortalHost]="greeting"></ng-template>
 */
let PortalHostDirective = class PortalHostDirective extends BasePortalHost {
    constructor(_componentFactoryResolver, _viewContainerRef) {
        super();
        this._componentFactoryResolver = _componentFactoryResolver;
        this._viewContainerRef = _viewContainerRef;
    }
    /** @deprecated */
    get _deprecatedPortal() { return this.portal; }
    set _deprecatedPortal(v) { this.portal = v; }
    /** Portal associated with the Portal host. */
    get portal() {
        return this._portal;
    }
    set portal(portal) {
        if (this.hasAttached()) {
            super.detach();
        }
        if (portal) {
            super.attach(portal);
        }
        this._portal = portal;
    }
    ngOnDestroy() {
        super.dispose();
        this._portal = null;
    }
    /**
     * Attach the given ComponentPortal to this PortalHost using the ComponentFactoryResolver.
     *
     * @param portal Portal to be attached to the portal host.
     */
    attachComponentPortal(portal) {
        portal.setAttachedHost(this);
        // If the portal specifies an origin, use that as the logical location of the component
        // in the application tree. Otherwise use the location of this PortalHost.
        let viewContainerRef = portal.viewContainerRef != null ?
            portal.viewContainerRef :
            this._viewContainerRef;
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        let ref = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, portal.injector || viewContainerRef.parentInjector);
        super.setDisposeFn(() => ref.destroy());
        this._portal = portal;
        return ref;
    }
    /**
     * Attach the given TemplatePortal to this PortlHost as an embedded View.
     * @param portal Portal to be attached.
     */
    attachTemplatePortal(portal) {
        portal.setAttachedHost(this);
        this._viewContainerRef.createEmbeddedView(portal.templateRef);
        super.setDisposeFn(() => this._viewContainerRef.clear());
        this._portal = portal;
        // TODO(jelbourn): return locals from view
        return new Map();
    }
};
__decorate$19([
    Input('portalHost'),
    __metadata$10("design:type", Object),
    __metadata$10("design:paramtypes", [Object])
], PortalHostDirective.prototype, "_deprecatedPortal", null);
PortalHostDirective = __decorate$19([
    Directive({
        selector: '[cdkPortalHost], [portalHost]',
        inputs: ['portal: cdkPortalHost']
    }),
    __metadata$10("design:paramtypes", [ComponentFactoryResolver,
        ViewContainerRef])
], PortalHostDirective);
let PortalModule = class PortalModule {
};
PortalModule = __decorate$19([
    NgModule({
        exports: [TemplatePortalDirective, PortalHostDirective],
        declarations: [TemplatePortalDirective, PortalHostDirective],
    })
], PortalModule);

/**
 * OverlayState is a bag of values for either the initial configuration or current state of an
 * overlay.
 */
class OverlayState {
    constructor() {
        /** Strategy to be used when handling scroll events while the overlay is open. */
        this.scrollStrategy = new NoopScrollStrategy();
        /** Whether the overlay has a backdrop. */
        this.hasBackdrop = false;
        /** Custom class to add to the backdrop */
        this.backdropClass = 'cdk-overlay-dark-backdrop';
        /** The direction of the text in the overlay panel. */
        this.direction = 'ltr';
        // TODO(jelbourn): configuration still to add
        // - focus trap
        // - disable pointer events
        // - z-index
    }
}

/**
 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 *
 * This is the only part of the portal core that directly touches the DOM.
 */
class DomPortalHost extends BasePortalHost {
    constructor(_hostDomElement, _componentFactoryResolver, _appRef, _defaultInjector) {
        super();
        this._hostDomElement = _hostDomElement;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._defaultInjector = _defaultInjector;
    }
    /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @param portal Portal to be attached
     */
    attachComponentPortal(portal) {
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        let componentRef;
        // If the portal specifies a ViewContainerRef, we will use that as the attachment point
        // for the component (in terms of Angular's component tree, not rendering).
        // When the ViewContainerRef is missing, we use the factory to create the component directly
        // and then manually attach the view to the application.
        if (portal.viewContainerRef) {
            componentRef = portal.viewContainerRef.createComponent(componentFactory, portal.viewContainerRef.length, portal.injector || portal.viewContainerRef.parentInjector);
            this.setDisposeFn(() => componentRef.destroy());
        }
        else {
            componentRef = componentFactory.create(portal.injector || this._defaultInjector);
            this._appRef.attachView(componentRef.hostView);
            this.setDisposeFn(() => {
                this._appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            });
        }
        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));
        return componentRef;
    }
    /**
     * Attaches a template portal to the DOM as an embedded view.
     * @param portal Portal to be attached.
     */
    attachTemplatePortal(portal) {
        let viewContainer = portal.viewContainerRef;
        let viewRef = viewContainer.createEmbeddedView(portal.templateRef);
        viewRef.detectChanges();
        // The method `createEmbeddedView` will add the view as a child of the viewContainer.
        // But for the DomPortalHost the view can be added everywhere in the DOM (e.g Overlay Container)
        // To move the view to the specified host element. We just re-append the existing root nodes.
        viewRef.rootNodes.forEach(rootNode => this._hostDomElement.appendChild(rootNode));
        this.setDisposeFn((() => {
            let index = viewContainer.indexOf(viewRef);
            if (index !== -1) {
                viewContainer.remove(index);
            }
        }));
        // TODO(jelbourn): Return locals from view.
        return new Map();
    }
    /**
     * Clears out a portal from the DOM.
     */
    dispose() {
        super.dispose();
        if (this._hostDomElement.parentNode != null) {
            this._hostDomElement.parentNode.removeChild(this._hostDomElement);
        }
    }
    /** Gets the root HTMLElement for an instantiated component. */
    _getComponentRootNode(componentRef) {
        return componentRef.hostView.rootNodes[0];
    }
}

/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
class OverlayRef {
    constructor(_portalHost, _pane, _state, _ngZone) {
        this._portalHost = _portalHost;
        this._pane = _pane;
        this._state = _state;
        this._ngZone = _ngZone;
        this._backdropElement = null;
        this._backdropClick = new Subject();
        this._attachments = new Subject();
        this._detachments = new Subject();
        this._state.scrollStrategy.attach(this);
    }
    /** The overlay's HTML element */
    get overlayElement() {
        return this._pane;
    }
    /**
     * Attaches the overlay to a portal instance and adds the backdrop.
     * @param portal Portal instance to which to attach the overlay.
     * @returns The portal attachment result.
     */
    attach(portal) {
        let attachResult = this._portalHost.attach(portal);
        // Update the pane element with the given state configuration.
        this._updateStackingOrder();
        this.updateSize();
        this.updateDirection();
        this.updatePosition();
        this._attachments.next();
        this._state.scrollStrategy.enable();
        // Enable pointer events for the overlay pane element.
        this._togglePointerEvents(true);
        if (this._state.hasBackdrop) {
            this._attachBackdrop();
        }
        return attachResult;
    }
    /**
     * Detaches an overlay from a portal.
     * @returns Resolves when the overlay has been detached.
     */
    detach() {
        this.detachBackdrop();
        // When the overlay is detached, the pane element should disable pointer events.
        // This is necessary because otherwise the pane element will cover the page and disable
        // pointer events therefore. Depends on the position strategy and the applied pane boundaries.
        this._togglePointerEvents(false);
        this._state.scrollStrategy.disable();
        this._detachments.next();
        return this._portalHost.detach();
    }
    /**
     * Cleans up the overlay from the DOM.
     */
    dispose() {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.dispose();
        }
        this.detachBackdrop();
        this._portalHost.dispose();
        this._state.scrollStrategy.disable();
        this._detachments.next();
        this._detachments.complete();
        this._attachments.complete();
    }
    /**
     * Checks whether the overlay has been attached.
     */
    hasAttached() {
        return this._portalHost.hasAttached();
    }
    /**
     * Returns an observable that emits when the backdrop has been clicked.
     */
    backdropClick() {
        return this._backdropClick.asObservable();
    }
    /** Returns an observable that emits when the overlay has been attached. */
    attachments() {
        return this._attachments.asObservable();
    }
    /** Returns an observable that emits when the overlay has been detached. */
    detachments() {
        return this._detachments.asObservable();
    }
    /**
     * Gets the current state config of the overlay.
     */
    getState() {
        return this._state;
    }
    /** Updates the position of the overlay based on the position strategy. */
    updatePosition() {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.apply(this._pane);
        }
    }
    /** Updates the text direction of the overlay panel. */
    updateDirection() {
        this._pane.setAttribute('dir', this._state.direction);
    }
    /** Updates the size of the overlay based on the overlay config. */
    updateSize() {
        if (this._state.width || this._state.width === 0) {
            this._pane.style.width = formatCssUnit(this._state.width);
        }
        if (this._state.height || this._state.height === 0) {
            this._pane.style.height = formatCssUnit(this._state.height);
        }
        if (this._state.minWidth || this._state.minWidth === 0) {
            this._pane.style.minWidth = formatCssUnit(this._state.minWidth);
        }
        if (this._state.minHeight || this._state.minHeight === 0) {
            this._pane.style.minHeight = formatCssUnit(this._state.minHeight);
        }
    }
    /** Toggles the pointer events for the overlay pane element. */
    _togglePointerEvents(enablePointer) {
        this._pane.style.pointerEvents = enablePointer ? 'auto' : 'none';
    }
    /** Attaches a backdrop for this overlay. */
    _attachBackdrop() {
        this._backdropElement = document.createElement('div');
        this._backdropElement.classList.add('cdk-overlay-backdrop');
        this._backdropElement.classList.add(this._state.backdropClass);
        // Insert the backdrop before the pane in the DOM order,
        // in order to handle stacked overlays properly.
        this._pane.parentElement.insertBefore(this._backdropElement, this._pane);
        // Forward backdrop clicks such that the consumer of the overlay can perform whatever
        // action desired when such a click occurs (usually closing the overlay).
        this._backdropElement.addEventListener('click', () => this._backdropClick.next(null));
        // Add class to fade-in the backdrop after one frame.
        requestAnimationFrame(() => {
            if (this._backdropElement) {
                this._backdropElement.classList.add('cdk-overlay-backdrop-showing');
            }
        });
    }
    /**
     * Updates the stacking order of the element, moving it to the top if necessary.
     * This is required in cases where one overlay was detached, while another one,
     * that should be behind it, was destroyed. The next time both of them are opened,
     * the stacking will be wrong, because the detached element's pane will still be
     * in its original DOM position.
     */
    _updateStackingOrder() {
        if (this._pane.nextSibling) {
            this._pane.parentNode.appendChild(this._pane);
        }
    }
    /** Detaches the backdrop (if any) associated with the overlay. */
    detachBackdrop() {
        let backdropToDetach = this._backdropElement;
        if (backdropToDetach) {
            let finishDetach = () => {
                // It may not be attached to anything in certain cases (e.g. unit tests).
                if (backdropToDetach && backdropToDetach.parentNode) {
                    backdropToDetach.parentNode.removeChild(backdropToDetach);
                }
                // It is possible that a new portal has been attached to this overlay since we started
                // removing the backdrop. If that is the case, only clear the backdrop reference if it
                // is still the same instance that we started to remove.
                if (this._backdropElement == backdropToDetach) {
                    this._backdropElement = null;
                }
            };
            backdropToDetach.classList.remove('cdk-overlay-backdrop-showing');
            backdropToDetach.classList.remove(this._state.backdropClass);
            backdropToDetach.addEventListener('transitionend', finishDetach);
            // If the backdrop doesn't have a transition, the `transitionend` event won't fire.
            // In this case we make it unclickable and we try to remove it after a delay.
            backdropToDetach.style.pointerEvents = 'none';
            // Run this outside the Angular zone because there's nothing that Angular cares about.
            // If it were to run inside the Angular zone, every test that used Overlay would have to be
            // either async or fakeAsync.
            this._ngZone.runOutsideAngular(() => {
                setTimeout(finishDetach, 500);
            });
        }
    }
}
function formatCssUnit(value) {
    return typeof value === 'string' ? value : `${value}px`;
}

var __decorate$23 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$14 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$4 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/** Horizontal dimension of a connection point on the perimeter of the origin or overlay element. */
/** The points of the origin element and the overlay element to connect. */
class ConnectionPositionPair {
    constructor(origin, overlay) {
        this.originX = origin.originX;
        this.originY = origin.originY;
        this.overlayX = overlay.overlayX;
        this.overlayY = overlay.overlayY;
    }
}
/**
 * Set of properties regarding the position of the origin and overlay relative to the viewport
 * with respect to the containing Scrollable elements.
 *
 * The overlay and origin are clipped if any part of their bounding client rectangle exceeds the
 * bounds of any one of the strategy's Scrollable's bounding client rectangle.
 *
 * The overlay and origin are outside view if there is no overlap between their bounding client
 * rectangle and any one of the strategy's Scrollable's bounding client rectangle.
 *
 *       -----------                    -----------
 *       | outside |                    | clipped |
 *       |  view   |              --------------------------
 *       |         |              |     |         |        |
 *       ----------               |     -----------        |
 *  --------------------------    |                        |
 *  |                        |    |      Scrollable        |
 *  |                        |    |                        |
 *  |                        |     --------------------------
 *  |      Scrollable        |
 *  |                        |
 *  --------------------------
 */
class ScrollableViewProperties {
}
/** The change event emitted by the strategy when a fallback position is used. */
let ConnectedOverlayPositionChange = class ConnectedOverlayPositionChange {
    constructor(connectionPair, scrollableViewProperties) {
        this.connectionPair = connectionPair;
        this.scrollableViewProperties = scrollableViewProperties;
    }
};
ConnectedOverlayPositionChange = __decorate$23([
    __param$4(1, Optional()),
    __metadata$14("design:paramtypes", [ConnectionPositionPair,
        ScrollableViewProperties])
], ConnectedOverlayPositionChange);

/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
class ConnectedPositionStrategy {
    constructor(_connectedTo, _originPos, _overlayPos, _viewportRuler) {
        this._connectedTo = _connectedTo;
        this._originPos = _originPos;
        this._overlayPos = _overlayPos;
        this._viewportRuler = _viewportRuler;
        this._dir = 'ltr';
        /** The offset in pixels for the overlay connection point on the x-axis */
        this._offsetX = 0;
        /** The offset in pixels for the overlay connection point on the y-axis */
        this._offsetY = 0;
        /** The Scrollable containers used to check scrollable view properties on position change. */
        this.scrollables = [];
        /** Ordered list of preferred positions, from most to least desirable. */
        this._preferredPositions = [];
        this._onPositionChange = new Subject();
        this._origin = this._connectedTo.nativeElement;
        this.withFallbackPosition(_originPos, _overlayPos);
    }
    /** Whether the we're dealing with an RTL context */
    get _isRtl() {
        return this._dir === 'rtl';
    }
    /** Emits an event when the connection point changes. */
    get onPositionChange() {
        return this._onPositionChange.asObservable();
    }
    /** Ordered list of preferred positions, from most to least desirable. */
    get positions() {
        return this._preferredPositions;
    }
    /**
     * To be used to for any cleanup after the element gets destroyed.
     */
    dispose() { }
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin fits on-screen.
     * @docs-private
     *
     * @param element Element to which to apply the CSS styles.
     * @returns Resolves when the styles have been applied.
     */
    apply(element) {
        // Cache the overlay pane element in case re-calculating position is necessary
        this._pane = element;
        // We need the bounding rects for the origin and the overlay to determine how to position
        // the overlay relative to the origin.
        const originRect = this._origin.getBoundingClientRect();
        const overlayRect = element.getBoundingClientRect();
        // We use the viewport rect to determine whether a position would go off-screen.
        const viewportRect = this._viewportRuler.getViewportRect();
        // Fallback point if none of the fallbacks fit into the viewport.
        let fallbackPoint = null;
        let fallbackPosition = null;
        // We want to place the overlay in the first of the preferred positions such that the
        // overlay fits on-screen.
        for (let pos of this._preferredPositions) {
            // Get the (x, y) point of connection on the origin, and then use that to get the
            // (top, left) coordinate for the overlay at `pos`.
            let originPoint = this._getOriginConnectionPoint(originRect, pos);
            let overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportRect, pos);
            // If the overlay in the calculated position fits on-screen, put it there and we're done.
            if (overlayPoint.fitsInViewport) {
                this._setElementPosition(element, overlayRect, overlayPoint, pos);
                // Save the last connected position in case the position needs to be re-calculated.
                this._lastConnectedPosition = pos;
                // Notify that the position has been changed along with its change properties.
                const scrollableViewProperties = this.getScrollableViewProperties(element);
                const positionChange = new ConnectedOverlayPositionChange(pos, scrollableViewProperties);
                this._onPositionChange.next(positionChange);
                return Promise.resolve(null);
            }
            else if (!fallbackPoint || fallbackPoint.visibleArea < overlayPoint.visibleArea) {
                fallbackPoint = overlayPoint;
                fallbackPosition = pos;
            }
        }
        // If none of the preferred positions were in the viewport, take the one
        // with the largest visible area.
        this._setElementPosition(element, overlayRect, fallbackPoint, fallbackPosition);
        return Promise.resolve(null);
    }
    /**
     * This re-aligns the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     */
    recalculateLastPosition() {
        const originRect = this._origin.getBoundingClientRect();
        const overlayRect = this._pane.getBoundingClientRect();
        const viewportRect = this._viewportRuler.getViewportRect();
        const lastPosition = this._lastConnectedPosition || this._preferredPositions[0];
        let originPoint = this._getOriginConnectionPoint(originRect, lastPosition);
        let overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportRect, lastPosition);
        this._setElementPosition(this._pane, overlayRect, overlayPoint, lastPosition);
    }
    /**
     * Sets the list of Scrollable containers that host the origin element so that
     * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
     * Scrollable must be an ancestor element of the strategy's origin element.
     */
    withScrollableContainers(scrollables) {
        this.scrollables = scrollables;
    }
    /**
     * Adds a new preferred fallback position.
     * @param originPos
     * @param overlayPos
     */
    withFallbackPosition(originPos, overlayPos) {
        this._preferredPositions.push(new ConnectionPositionPair(originPos, overlayPos));
        return this;
    }
    /**
     * Sets the layout direction so the overlay's position can be adjusted to match.
     * @param dir New layout direction.
     */
    withDirection(dir) {
        this._dir = dir;
        return this;
    }
    /**
     * Sets an offset for the overlay's connection point on the x-axis
     * @param offset New offset in the X axis.
     */
    withOffsetX(offset) {
        this._offsetX = offset;
        return this;
    }
    /**
     * Sets an offset for the overlay's connection point on the y-axis
     * @param  offset New offset in the Y axis.
     */
    withOffsetY(offset) {
        this._offsetY = offset;
        return this;
    }
    /**
     * Gets the horizontal (x) "start" dimension based on whether the overlay is in an RTL context.
     * @param rect
     */
    _getStartX(rect) {
        return this._isRtl ? rect.right : rect.left;
    }
    /**
     * Gets the horizontal (x) "end" dimension based on whether the overlay is in an RTL context.
     * @param rect
     */
    _getEndX(rect) {
        return this._isRtl ? rect.left : rect.right;
    }
    /**
     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
     * @param originRect
     * @param pos
     */
    _getOriginConnectionPoint(originRect, pos) {
        const originStartX = this._getStartX(originRect);
        const originEndX = this._getEndX(originRect);
        let x;
        if (pos.originX == 'center') {
            x = originStartX + (originRect.width / 2);
        }
        else {
            x = pos.originX == 'start' ? originStartX : originEndX;
        }
        let y;
        if (pos.originY == 'center') {
            y = originRect.top + (originRect.height / 2);
        }
        else {
            y = pos.originY == 'top' ? originRect.top : originRect.bottom;
        }
        return { x, y };
    }
    /**
     * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
     * origin point to which the overlay should be connected, as well as how much of the element
     * would be inside the viewport at that position.
     */
    _getOverlayPoint(originPoint, overlayRect, viewportRect, pos) {
        // Calculate the (overlayStartX, overlayStartY), the start of the potential overlay position
        // relative to the origin point.
        let overlayStartX;
        if (pos.overlayX == 'center') {
            overlayStartX = -overlayRect.width / 2;
        }
        else if (pos.overlayX === 'start') {
            overlayStartX = this._isRtl ? -overlayRect.width : 0;
        }
        else {
            overlayStartX = this._isRtl ? 0 : -overlayRect.width;
        }
        let overlayStartY;
        if (pos.overlayY == 'center') {
            overlayStartY = -overlayRect.height / 2;
        }
        else {
            overlayStartY = pos.overlayY == 'top' ? 0 : -overlayRect.height;
        }
        // The (x, y) coordinates of the overlay.
        let x = originPoint.x + overlayStartX + this._offsetX;
        let y = originPoint.y + overlayStartY + this._offsetY;
        // How much the overlay would overflow at this position, on each side.
        let leftOverflow = 0 - x;
        let rightOverflow = (x + overlayRect.width) - viewportRect.width;
        let topOverflow = 0 - y;
        let bottomOverflow = (y + overlayRect.height) - viewportRect.height;
        // Visible parts of the element on each axis.
        let visibleWidth = this._subtractOverflows(overlayRect.width, leftOverflow, rightOverflow);
        let visibleHeight = this._subtractOverflows(overlayRect.height, topOverflow, bottomOverflow);
        // The area of the element that's within the viewport.
        let visibleArea = visibleWidth * visibleHeight;
        let fitsInViewport = (overlayRect.width * overlayRect.height) === visibleArea;
        return { x, y, fitsInViewport, visibleArea };
    }
    /**
     * Gets the view properties of the trigger and overlay, including whether they are clipped
     * or completely outside the view of any of the strategy's scrollables.
     */
    getScrollableViewProperties(overlay) {
        const originBounds = this._getElementBounds(this._origin);
        const overlayBounds = this._getElementBounds(overlay);
        const scrollContainerBounds = this.scrollables.map((scrollable) => {
            return this._getElementBounds(scrollable.getElementRef().nativeElement);
        });
        return {
            isOriginClipped: this.isElementClipped(originBounds, scrollContainerBounds),
            isOriginOutsideView: this.isElementOutsideView(originBounds, scrollContainerBounds),
            isOverlayClipped: this.isElementClipped(overlayBounds, scrollContainerBounds),
            isOverlayOutsideView: this.isElementOutsideView(overlayBounds, scrollContainerBounds),
        };
    }
    /** Whether the element is completely out of the view of any of the containers. */
    isElementOutsideView(elementBounds, containersBounds) {
        return containersBounds.some((containerBounds) => {
            const outsideAbove = elementBounds.bottom < containerBounds.top;
            const outsideBelow = elementBounds.top > containerBounds.bottom;
            const outsideLeft = elementBounds.right < containerBounds.left;
            const outsideRight = elementBounds.left > containerBounds.right;
            return outsideAbove || outsideBelow || outsideLeft || outsideRight;
        });
    }
    /** Whether the element is clipped by any of the containers. */
    isElementClipped(elementBounds, containersBounds) {
        return containersBounds.some((containerBounds) => {
            const clippedAbove = elementBounds.top < containerBounds.top;
            const clippedBelow = elementBounds.bottom > containerBounds.bottom;
            const clippedLeft = elementBounds.left < containerBounds.left;
            const clippedRight = elementBounds.right > containerBounds.right;
            return clippedAbove || clippedBelow || clippedLeft || clippedRight;
        });
    }
    /** Physically positions the overlay element to the given coordinate. */
    _setElementPosition(element, overlayRect, overlayPoint, pos) {
        // We want to set either `top` or `bottom` based on whether the overlay wants to appear above
        // or below the origin and the direction in which the element will expand.
        let verticalStyleProperty = pos.overlayY === 'bottom' ? 'bottom' : 'top';
        // When using `bottom`, we adjust the y position such that it is the distance
        // from the bottom of the viewport rather than the top.
        let y = verticalStyleProperty === 'top' ?
            overlayPoint.y :
            document.documentElement.clientHeight - (overlayPoint.y + overlayRect.height);
        // We want to set either `left` or `right` based on whether the overlay wants to appear "before"
        // or "after" the origin, which determines the direction in which the element will expand.
        // For the horizontal axis, the meaning of "before" and "after" change based on whether the
        // page is in RTL or LTR.
        let horizontalStyleProperty;
        if (this._dir === 'rtl') {
            horizontalStyleProperty = pos.overlayX === 'end' ? 'left' : 'right';
        }
        else {
            horizontalStyleProperty = pos.overlayX === 'end' ? 'right' : 'left';
        }
        // When we're setting `right`, we adjust the x position such that it is the distance
        // from the right edge of the viewport rather than the left edge.
        let x = horizontalStyleProperty === 'left' ?
            overlayPoint.x :
            document.documentElement.clientWidth - (overlayPoint.x + overlayRect.width);
        // Reset any existing styles. This is necessary in case the preferred position has
        // changed since the last `apply`.
        ['top', 'bottom', 'left', 'right'].forEach((p) => element.style[p] = null);
        element.style[verticalStyleProperty] = `${y}px`;
        element.style[horizontalStyleProperty] = `${x}px`;
    }
    /** Returns the bounding positions of the provided element with respect to the viewport. */
    _getElementBounds(element) {
        const boundingClientRect = element.getBoundingClientRect();
        return {
            top: boundingClientRect.top,
            right: boundingClientRect.left + boundingClientRect.width,
            bottom: boundingClientRect.top + boundingClientRect.height,
            left: boundingClientRect.left
        };
    }
    /**
     * Subtracts the amount that an element is overflowing on an axis from it's length.
     */
    _subtractOverflows(length, ...overflows) {
        return overflows.reduce((currentValue, currentOverflow) => {
            return currentValue - Math.max(currentOverflow, 0);
        }, length);
    }
}

/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport. We use flexbox, instead of
 * transforms, in order to avoid issues with subpixel rendering which can cause the
 * element to become blurry.
 */
class GlobalPositionStrategy {
    constructor() {
        this._cssPosition = 'static';
        this._topOffset = '';
        this._bottomOffset = '';
        this._leftOffset = '';
        this._rightOffset = '';
        this._alignItems = '';
        this._justifyContent = '';
        this._width = '';
        this._height = '';
    }
    /**
     * Sets the top position of the overlay. Clears any previously set vertical position.
     * @param value New top offset.
     */
    top(value) {
        this._bottomOffset = '';
        this._topOffset = value;
        this._alignItems = 'flex-start';
        return this;
    }
    /**
     * Sets the left position of the overlay. Clears any previously set horizontal position.
     * @param value New left offset.
     */
    left(value) {
        this._rightOffset = '';
        this._leftOffset = value;
        this._justifyContent = 'flex-start';
        return this;
    }
    /**
     * Sets the bottom position of the overlay. Clears any previously set vertical position.
     * @param value New bottom offset.
     */
    bottom(value) {
        this._topOffset = '';
        this._bottomOffset = value;
        this._alignItems = 'flex-end';
        return this;
    }
    /**
     * Sets the right position of the overlay. Clears any previously set horizontal position.
     * @param value New right offset.
     */
    right(value) {
        this._leftOffset = '';
        this._rightOffset = value;
        this._justifyContent = 'flex-end';
        return this;
    }
    /**
     * Sets the overlay width and clears any previously set width.
     * @param value New width for the overlay
     */
    width(value) {
        this._width = value;
        // When the width is 100%, we should reset the `left` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.left('0px');
        }
        return this;
    }
    /**
     * Sets the overlay height and clears any previously set height.
     * @param value New height for the overlay
     */
    height(value) {
        this._height = value;
        // When the height is 100%, we should reset the `top` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.top('0px');
        }
        return this;
    }
    /**
     * Centers the overlay horizontally with an optional offset.
     * Clears any previously set horizontal position.
     *
     * @param offset Overlay offset from the horizontal center.
     */
    centerHorizontally(offset = '') {
        this.left(offset);
        this._justifyContent = 'center';
        return this;
    }
    /**
     * Centers the overlay vertically with an optional offset.
     * Clears any previously set vertical position.
     *
     * @param offset Overlay offset from the vertical center.
     */
    centerVertically(offset = '') {
        this.top(offset);
        this._alignItems = 'center';
        return this;
    }
    /**
     * Apply the position to the element.
     * @docs-private
     *
     * @param element Element to which to apply the CSS.
     * @returns Resolved when the styles have been applied.
     */
    apply(element) {
        if (!this._wrapper) {
            this._wrapper = document.createElement('div');
            this._wrapper.classList.add('cdk-global-overlay-wrapper');
            element.parentNode.insertBefore(this._wrapper, element);
            this._wrapper.appendChild(element);
        }
        let styles = element.style;
        let parentStyles = element.parentNode.style;
        styles.position = this._cssPosition;
        styles.marginTop = this._topOffset;
        styles.marginLeft = this._leftOffset;
        styles.marginBottom = this._bottomOffset;
        styles.marginRight = this._rightOffset;
        styles.width = this._width;
        styles.height = this._height;
        parentStyles.justifyContent = this._justifyContent;
        parentStyles.alignItems = this._alignItems;
        return Promise.resolve(null);
    }
    /**
     * Removes the wrapper element from the DOM.
     */
    dispose() {
        if (this._wrapper && this._wrapper.parentNode) {
            this._wrapper.parentNode.removeChild(this._wrapper);
            this._wrapper = null;
        }
    }
}

var __decorate$22 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$13 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Builder for overlay position strategy. */
let OverlayPositionBuilder = class OverlayPositionBuilder {
    constructor(_viewportRuler) {
        this._viewportRuler = _viewportRuler;
    }
    /**
     * Creates a global position strategy.
     */
    global() {
        return new GlobalPositionStrategy();
    }
    /**
     * Creates a relative position strategy.
     * @param elementRef
     * @param originPos
     * @param overlayPos
     */
    connectedTo(elementRef, originPos, overlayPos) {
        return new ConnectedPositionStrategy(elementRef, originPos, overlayPos, this._viewportRuler);
    }
};
OverlayPositionBuilder = __decorate$22([
    Injectable(),
    __metadata$13("design:paramtypes", [ViewportRuler])
], OverlayPositionBuilder);

var __decorate$24 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * The OverlayContainer is the container in which all overlays will load.
 * It should be provided in the root component to ensure it is properly shared.
 */
let OverlayContainer = class OverlayContainer {
    /**
     * Base theme to be applied to all overlay-based components.
     */
    get themeClass() { return this._themeClass; }
    set themeClass(value) {
        if (this._containerElement) {
            this._containerElement.classList.remove(this._themeClass);
            if (value) {
                this._containerElement.classList.add(value);
            }
        }
        this._themeClass = value;
    }
    /**
     * This method returns the overlay container element.  It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @returns the container element
     */
    getContainerElement() {
        if (!this._containerElement) {
            this._createContainer();
        }
        return this._containerElement;
    }
    /**
     * Create the overlay container element, which is simply a div
     * with the 'cdk-overlay-container' class on the document body.
     */
    _createContainer() {
        let container = document.createElement('div');
        container.classList.add('cdk-overlay-container');
        if (this._themeClass) {
            container.classList.add(this._themeClass);
        }
        document.body.appendChild(container);
        this._containerElement = container;
    }
};
OverlayContainer = __decorate$24([
    Injectable()
], OverlayContainer);
function OVERLAY_CONTAINER_PROVIDER_FACTORY(parentContainer) {
    return parentContainer || new OverlayContainer();
}
const OVERLAY_CONTAINER_PROVIDER = {
    // If there is already an OverlayContainer available, use that. Otherwise, provide a new one.
    provide: OverlayContainer,
    deps: [[new Optional(), new SkipSelf(), OverlayContainer]],
    useFactory: OVERLAY_CONTAINER_PROVIDER_FACTORY
};

var __decorate$21 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$12 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Next overlay unique ID. */
let nextUniqueId = 0;
/** The default state for newly created overlays. */
let defaultState = new OverlayState();
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
let Overlay = class Overlay {
    constructor(_overlayContainer, _componentFactoryResolver, _positionBuilder, _appRef, _injector, _ngZone) {
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._positionBuilder = _positionBuilder;
        this._appRef = _appRef;
        this._injector = _injector;
        this._ngZone = _ngZone;
    }
    /**
     * Creates an overlay.
     * @param state State to apply to the overlay.
     * @returns Reference to the created overlay.
     */
    create(state$$1 = defaultState) {
        return this._createOverlayRef(this._createPaneElement(), state$$1);
    }
    /**
     * Returns a position builder that can be used, via fluent API,
     * to construct and configure a position strategy.
     */
    position() {
        return this._positionBuilder;
    }
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @returns Newly-created pane element
     */
    _createPaneElement() {
        let pane = document.createElement('div');
        pane.id = `cdk-overlay-${nextUniqueId++}`;
        pane.classList.add('cdk-overlay-pane');
        this._overlayContainer.getContainerElement().appendChild(pane);
        return pane;
    }
    /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param pane The DOM element to turn into a portal host.
     * @returns A portal host for the given DOM element.
     */
    _createPortalHost(pane) {
        return new DomPortalHost(pane, this._componentFactoryResolver, this._appRef, this._injector);
    }
    /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param pane DOM element for the overlay
     * @param state
     */
    _createOverlayRef(pane, state$$1) {
        return new OverlayRef(this._createPortalHost(pane), pane, state$$1, this._ngZone);
    }
};
Overlay = __decorate$21([
    Injectable(),
    __metadata$12("design:paramtypes", [OverlayContainer,
        ComponentFactoryResolver,
        OverlayPositionBuilder,
        ApplicationRef,
        Injector,
        NgZone])
], Overlay);
/** Providers for Overlay and its related injectables. */
const OVERLAY_PROVIDERS = [
    Overlay,
    OverlayPositionBuilder,
    VIEWPORT_RULER_PROVIDER,
    OVERLAY_CONTAINER_PROVIDER,
];

var __decorate$20 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$11 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$3 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/** Default set of positions for the overlay. Follows the behavior of a dropdown. */
let defaultPositionList = [
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
];
/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
let OverlayOrigin = class OverlayOrigin {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
};
OverlayOrigin = __decorate$20([
    Directive({
        selector: '[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]',
        exportAs: 'cdkOverlayOrigin',
    }),
    __metadata$11("design:paramtypes", [ElementRef])
], OverlayOrigin);
/**
 * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
 */
let ConnectedOverlayDirective = class ConnectedOverlayDirective {
    // TODO(jelbourn): inputs for size, scroll behavior, animation, etc.
    constructor(_overlay, _renderer, _scrollDispatcher, templateRef, viewContainerRef, _dir) {
        this._overlay = _overlay;
        this._renderer = _renderer;
        this._scrollDispatcher = _scrollDispatcher;
        this._dir = _dir;
        this._hasBackdrop = false;
        this._offsetX = 0;
        this._offsetY = 0;
        /** Strategy to be used when handling scroll events while the overlay is open. */
        this.scrollStrategy = new RepositionScrollStrategy(this._scrollDispatcher);
        /** Whether the overlay is open. */
        this.open = false;
        /** Event emitted when the backdrop is clicked. */
        this.backdropClick = new EventEmitter();
        /** Event emitted when the position has changed. */
        this.positionChange = new EventEmitter();
        /** Event emitted when the overlay has been attached. */
        this.attach = new EventEmitter();
        /** Event emitted when the overlay has been detached. */
        this.detach = new EventEmitter();
        this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
    }
    /** The offset in pixels for the overlay connection point on the x-axis */
    get offsetX() {
        return this._offsetX;
    }
    set offsetX(offsetX) {
        this._offsetX = offsetX;
        if (this._position) {
            this._position.withOffsetX(offsetX);
        }
    }
    /** The offset in pixels for the overlay connection point on the y-axis */
    get offsetY() {
        return this._offsetY;
    }
    set offsetY(offsetY) {
        this._offsetY = offsetY;
        if (this._position) {
            this._position.withOffsetY(offsetY);
        }
    }
    /** Whether or not the overlay should attach a backdrop. */
    get hasBackdrop() {
        return this._hasBackdrop;
    }
    set hasBackdrop(value) {
        this._hasBackdrop = coerceBooleanProperty(value);
    }
    /** The associated overlay reference. */
    get overlayRef() {
        return this._overlayRef;
    }
    /** The element's layout direction. */
    get dir() {
        return this._dir ? this._dir.value : 'ltr';
    }
    ngOnDestroy() {
        this._destroyOverlay();
    }
    ngOnChanges(changes) {
        if (changes['open']) {
            this.open ? this._attachOverlay() : this._detachOverlay();
        }
    }
    /** Creates an overlay */
    _createOverlay() {
        if (!this.positions || !this.positions.length) {
            this.positions = defaultPositionList;
        }
        this._overlayRef = this._overlay.create(this._buildConfig());
    }
    /** Builds the overlay config based on the directive's inputs */
    _buildConfig() {
        let overlayConfig = new OverlayState();
        if (this.width || this.width === 0) {
            overlayConfig.width = this.width;
        }
        if (this.height || this.height === 0) {
            overlayConfig.height = this.height;
        }
        if (this.minWidth || this.minWidth === 0) {
            overlayConfig.minWidth = this.minWidth;
        }
        if (this.minHeight || this.minHeight === 0) {
            overlayConfig.minHeight = this.minHeight;
        }
        overlayConfig.hasBackdrop = this.hasBackdrop;
        if (this.backdropClass) {
            overlayConfig.backdropClass = this.backdropClass;
        }
        this._position = this._createPositionStrategy();
        overlayConfig.positionStrategy = this._position;
        overlayConfig.scrollStrategy = this.scrollStrategy;
        return overlayConfig;
    }
    /** Returns the position strategy of the overlay to be set on the overlay config */
    _createPositionStrategy() {
        const pos = this.positions[0];
        const originPoint = { originX: pos.originX, originY: pos.originY };
        const overlayPoint = { overlayX: pos.overlayX, overlayY: pos.overlayY };
        const strategy = this._overlay.position()
            .connectedTo(this.origin.elementRef, originPoint, overlayPoint)
            .withOffsetX(this.offsetX)
            .withOffsetY(this.offsetY);
        this._handlePositionChanges(strategy);
        return strategy;
    }
    _handlePositionChanges(strategy) {
        for (let i = 1; i < this.positions.length; i++) {
            strategy.withFallbackPosition({ originX: this.positions[i].originX, originY: this.positions[i].originY }, { overlayX: this.positions[i].overlayX, overlayY: this.positions[i].overlayY });
        }
        this._positionSubscription =
            strategy.onPositionChange.subscribe(pos => this.positionChange.emit(pos));
    }
    /** Attaches the overlay and subscribes to backdrop clicks if backdrop exists */
    _attachOverlay() {
        if (!this._overlayRef) {
            this._createOverlay();
        }
        this._position.withDirection(this.dir);
        this._overlayRef.getState().direction = this.dir;
        this._initEscapeListener();
        if (!this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._templatePortal);
            this.attach.emit();
        }
        if (this.hasBackdrop) {
            this._backdropSubscription = this._overlayRef.backdropClick().subscribe(() => {
                this.backdropClick.emit();
            });
        }
    }
    /** Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists */
    _detachOverlay() {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this.detach.emit();
        }
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
            this._backdropSubscription = null;
        }
        if (this._escapeListener) {
            this._escapeListener();
        }
    }
    /** Destroys the overlay created by this directive. */
    _destroyOverlay() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
        if (this._positionSubscription) {
            this._positionSubscription.unsubscribe();
        }
        if (this._escapeListener) {
            this._escapeListener();
        }
    }
    /** Sets the event listener that closes the overlay when pressing Escape. */
    _initEscapeListener() {
        this._escapeListener = this._renderer.listen('document', 'keydown', (event) => {
            if (event.keyCode === ESCAPE) {
                this._detachOverlay();
            }
        });
    }
};
__decorate$20([
    Input(),
    __metadata$11("design:type", OverlayOrigin)
], ConnectedOverlayDirective.prototype, "origin", void 0);
__decorate$20([
    Input(),
    __metadata$11("design:type", Array)
], ConnectedOverlayDirective.prototype, "positions", void 0);
__decorate$20([
    Input(),
    __metadata$11("design:type", Number),
    __metadata$11("design:paramtypes", [Number])
], ConnectedOverlayDirective.prototype, "offsetX", null);
__decorate$20([
    Input(),
    __metadata$11("design:type", Object),
    __metadata$11("design:paramtypes", [Number])
], ConnectedOverlayDirective.prototype, "offsetY", null);
__decorate$20([
    Input(),
    __metadata$11("design:type", Object)
], ConnectedOverlayDirective.prototype, "width", void 0);
__decorate$20([
    Input(),
    __metadata$11("design:type", Object)
], ConnectedOverlayDirective.prototype, "height", void 0);
__decorate$20([
    Input(),
    __metadata$11("design:type", Object)
], ConnectedOverlayDirective.prototype, "minWidth", void 0);
__decorate$20([
    Input(),
    __metadata$11("design:type", Object)
], ConnectedOverlayDirective.prototype, "minHeight", void 0);
__decorate$20([
    Input(),
    __metadata$11("design:type", String)
], ConnectedOverlayDirective.prototype, "backdropClass", void 0);
__decorate$20([
    Input(),
    __metadata$11("design:type", Object)
], ConnectedOverlayDirective.prototype, "scrollStrategy", void 0);
__decorate$20([
    Input(),
    __metadata$11("design:type", Boolean)
], ConnectedOverlayDirective.prototype, "open", void 0);
__decorate$20([
    Input(),
    __metadata$11("design:type", Object),
    __metadata$11("design:paramtypes", [Object])
], ConnectedOverlayDirective.prototype, "hasBackdrop", null);
__decorate$20([
    Output(),
    __metadata$11("design:type", Object)
], ConnectedOverlayDirective.prototype, "backdropClick", void 0);
__decorate$20([
    Output(),
    __metadata$11("design:type", Object)
], ConnectedOverlayDirective.prototype, "positionChange", void 0);
__decorate$20([
    Output(),
    __metadata$11("design:type", Object)
], ConnectedOverlayDirective.prototype, "attach", void 0);
__decorate$20([
    Output(),
    __metadata$11("design:type", Object)
], ConnectedOverlayDirective.prototype, "detach", void 0);
ConnectedOverlayDirective = __decorate$20([
    Directive({
        selector: '[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]',
        exportAs: 'cdkConnectedOverlay'
    }),
    __param$3(5, Optional()),
    __metadata$11("design:paramtypes", [Overlay,
        Renderer2,
        ScrollDispatcher,
        TemplateRef,
        ViewContainerRef,
        Dir])
], ConnectedOverlayDirective);
let OverlayModule = class OverlayModule {
};
OverlayModule = __decorate$20([
    NgModule({
        imports: [PortalModule, ScrollDispatchModule],
        exports: [ConnectedOverlayDirective, OverlayOrigin, ScrollDispatchModule],
        declarations: [ConnectedOverlayDirective, OverlayOrigin],
        providers: [OVERLAY_PROVIDERS],
    })
], OverlayModule);

var __decorate$27 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$16 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * The InteractivityChecker leans heavily on the ally.js accessibility utilities.
 * Methods like `isTabbable` are only covering specific edge-cases for the browsers which are
 * supported.
 */
/**
 * Utility for checking the interactivity of an element, such as whether is is focusable or
 * tabbable.
 */
let InteractivityChecker = class InteractivityChecker {
    constructor(_platform) {
        this._platform = _platform;
    }
    /**
     * Gets whether an element is disabled.
     *
     * @param element Element to be checked.
     * @returns Whether the element is disabled.
     */
    isDisabled(element) {
        // This does not capture some cases, such as a non-form control with a disabled attribute or
        // a form control inside of a disabled form, but should capture the most common cases.
        return element.hasAttribute('disabled');
    }
    /**
     * Gets whether an element is visible for the purposes of interactivity.
     *
     * This will capture states like `display: none` and `visibility: hidden`, but not things like
     * being clipped by an `overflow: hidden` parent or being outside the viewport.
     *
     * @returns Whether the element is visible.
     */
    isVisible(element) {
        return hasGeometry(element) && getComputedStyle(element).visibility === 'visible';
    }
    /**
     * Gets whether an element can be reached via Tab key.
     * Assumes that the element has already been checked with isFocusable.
     *
     * @param element Element to be checked.
     * @returns Whether the element is tabbable.
     */
    isTabbable(element) {
        let frameElement = getWindow(element).frameElement;
        if (frameElement) {
            let frameType = frameElement && frameElement.nodeName.toLowerCase();
            // Frame elements inherit their tabindex onto all child elements.
            if (getTabIndexValue(frameElement) === -1) {
                return false;
            }
            // Webkit and Blink consider anything inside of an <object> element as non-tabbable.
            if ((this._platform.BLINK || this._platform.WEBKIT) && frameType === 'object') {
                return false;
            }
            // Webkit and Blink disable tabbing to an element inside of an invisible frame.
            if ((this._platform.BLINK || this._platform.WEBKIT) && !this.isVisible(frameElement)) {
                return false;
            }
        }
        let nodeName = element.nodeName.toLowerCase();
        let tabIndexValue = getTabIndexValue(element);
        if (element.hasAttribute('contenteditable')) {
            return tabIndexValue !== -1;
        }
        if (nodeName === 'iframe') {
            // The frames may be tabbable depending on content, but it's not possibly to reliably
            // investigate the content of the frames.
            return false;
        }
        if (nodeName === 'audio') {
            if (!element.hasAttribute('controls')) {
                // By default an <audio> element without the controls enabled is not tabbable.
                return false;
            }
            else if (this._platform.BLINK) {
                // In Blink <audio controls> elements are always tabbable.
                return true;
            }
        }
        if (nodeName === 'video') {
            if (!element.hasAttribute('controls') && this._platform.TRIDENT) {
                // In Trident a <video> element without the controls enabled is not tabbable.
                return false;
            }
            else if (this._platform.BLINK || this._platform.FIREFOX) {
                // In Chrome and Firefox <video controls> elements are always tabbable.
                return true;
            }
        }
        if (nodeName === 'object' && (this._platform.BLINK || this._platform.WEBKIT)) {
            // In all Blink and WebKit based browsers <object> elements are never tabbable.
            return false;
        }
        // In iOS the browser only considers some specific elements as tabbable.
        if (this._platform.WEBKIT && this._platform.IOS && !isPotentiallyTabbableIOS(element)) {
            return false;
        }
        return element.tabIndex >= 0;
    }
    /**
     * Gets whether an element can be focused by the user.
     *
     * @param element Element to be checked.
     * @returns Whether the element is focusable.
     */
    isFocusable(element) {
        // Perform checks in order of left to most expensive.
        // Again, naive approach that does not capture many edge cases and browser quirks.
        return isPotentiallyFocusable(element) && !this.isDisabled(element) && this.isVisible(element);
    }
};
InteractivityChecker = __decorate$27([
    Injectable(),
    __metadata$16("design:paramtypes", [Platform])
], InteractivityChecker);
/** Checks whether the specified element has any geometry / rectangles. */
function hasGeometry(element) {
    // Use logic from jQuery to check for an invisible element.
    // See https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js#L12
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}
/** Gets whether an element's  */
function isNativeFormElement(element) {
    let nodeName = element.nodeName.toLowerCase();
    return nodeName === 'input' ||
        nodeName === 'select' ||
        nodeName === 'button' ||
        nodeName === 'textarea';
}
/** Gets whether an element is an <input type="hidden">. */
function isHiddenInput(element) {
    return isInputElement(element) && element.type == 'hidden';
}
/** Gets whether an element is an anchor that has an href attribute. */
function isAnchorWithHref(element) {
    return isAnchorElement(element) && element.hasAttribute('href');
}
/** Gets whether an element is an input element. */
function isInputElement(element) {
    return element.nodeName.toLowerCase() == 'input';
}
/** Gets whether an element is an anchor element. */
function isAnchorElement(element) {
    return element.nodeName.toLowerCase() == 'a';
}
/** Gets whether an element has a valid tabindex. */
function hasValidTabIndex(element) {
    if (!element.hasAttribute('tabindex') || element.tabIndex === undefined) {
        return false;
    }
    let tabIndex = element.getAttribute('tabindex');
    // IE11 parses tabindex="" as the value "-32768"
    if (tabIndex == '-32768') {
        return false;
    }
    return !!(tabIndex && !isNaN(parseInt(tabIndex, 10)));
}
/**
 * Returns the parsed tabindex from the element attributes instead of returning the
 * evaluated tabindex from the browsers defaults.
 */
function getTabIndexValue(element) {
    if (!hasValidTabIndex(element)) {
        return null;
    }
    // See browser issue in Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1128054
    const tabIndex = parseInt(element.getAttribute('tabindex'), 10);
    return isNaN(tabIndex) ? -1 : tabIndex;
}
/** Checks whether the specified element is potentially tabbable on iOS */
function isPotentiallyTabbableIOS(element) {
    let nodeName = element.nodeName.toLowerCase();
    let inputType = nodeName === 'input' && element.type;
    return inputType === 'text'
        || inputType === 'password'
        || nodeName === 'select'
        || nodeName === 'textarea';
}
/**
 * Gets whether an element is potentially focusable without taking current visible/disabled state
 * into account.
 */
function isPotentiallyFocusable(element) {
    // Inputs are potentially focusable *unless* they're type="hidden".
    if (isHiddenInput(element)) {
        return false;
    }
    return isNativeFormElement(element) ||
        isAnchorWithHref(element) ||
        element.hasAttribute('contenteditable') ||
        hasValidTabIndex(element);
}
/** Gets the parent window of a DOM node with regards of being inside of an iframe. */
function getWindow(node) {
    return node.ownerDocument.defaultView || window;
}

var __decorate$26 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$15 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Class that allows for trapping focus within a DOM element.
 *
 * NOTE: This class currently uses a very simple (naive) approach to focus trapping.
 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
 * Things like tabIndex > 0, flex `order`, and shadow roots can cause to two to misalign.
 * This will be replaced with a more intelligent solution before the library is considered stable.
 */
class FocusTrap {
    constructor(_element, _checker, _ngZone, deferAnchors = false) {
        this._element = _element;
        this._checker = _checker;
        this._ngZone = _ngZone;
        this._enabled = true;
        if (!deferAnchors) {
            this.attachAnchors();
        }
    }
    /** Whether the focus trap is active. */
    get enabled() { return this._enabled; }
    set enabled(val) {
        this._enabled = val;
        if (this._startAnchor && this._endAnchor) {
            this._startAnchor.tabIndex = this._endAnchor.tabIndex = this._enabled ? 0 : -1;
        }
    }
    /** Destroys the focus trap by cleaning up the anchors. */
    destroy() {
        if (this._startAnchor && this._startAnchor.parentNode) {
            this._startAnchor.parentNode.removeChild(this._startAnchor);
        }
        if (this._endAnchor && this._endAnchor.parentNode) {
            this._endAnchor.parentNode.removeChild(this._endAnchor);
        }
        this._startAnchor = this._endAnchor = null;
    }
    /**
     * Inserts the anchors into the DOM. This is usually done automatically
     * in the constructor, but can be deferred for cases like directives with `*ngIf`.
     */
    attachAnchors() {
        if (!this._startAnchor) {
            this._startAnchor = this._createAnchor();
        }
        if (!this._endAnchor) {
            this._endAnchor = this._createAnchor();
        }
        this._ngZone.runOutsideAngular(() => {
            this._startAnchor.addEventListener('focus', () => this.focusLastTabbableElement());
            this._endAnchor.addEventListener('focus', () => this.focusFirstTabbableElement());
            this._element.parentNode.insertBefore(this._startAnchor, this._element);
            this._element.parentNode.insertBefore(this._endAnchor, this._element.nextSibling);
        });
    }
    focusInitialElementWhenReady() {
        this._ngZone.onMicrotaskEmpty.first().subscribe(() => this.focusInitialElement());
    }
    /**
     * Waits for microtask queue to empty, then focuses
     * the first tabbable element within the focus trap region.
     */
    focusFirstTabbableElementWhenReady() {
        this._ngZone.onMicrotaskEmpty.first().subscribe(() => this.focusFirstTabbableElement());
    }
    /**
     * Waits for microtask queue to empty, then focuses
     * the last tabbable element within the focus trap region.
     */
    focusLastTabbableElementWhenReady() {
        this._ngZone.onMicrotaskEmpty.first().subscribe(() => this.focusLastTabbableElement());
    }
    /**
     * Get the specified boundary element of the trapped region.
     * @param bound The boundary to get (start or end of trapped region).
     * @returns The boundary element.
     */
    _getRegionBoundary(bound) {
        let markers = [
            ...Array.prototype.slice.call(this._element.querySelectorAll(`[cdk-focus-region-${bound}]`)),
            // Deprecated version of selector, for temporary backwards comparability:
            ...Array.prototype.slice.call(this._element.querySelectorAll(`[cdk-focus-${bound}]`)),
        ];
        markers.forEach((el) => {
            if (el.hasAttribute(`cdk-focus-${bound}`)) {
                console.warn(`Found use of deprecated attribute 'cdk-focus-${bound}',` +
                    ` use 'cdk-focus-region-${bound}' instead.`, el);
            }
        });
        if (bound == 'start') {
            return markers.length ? markers[0] : this._getFirstTabbableElement(this._element);
        }
        return markers.length ?
            markers[markers.length - 1] : this._getLastTabbableElement(this._element);
    }
    /** Focuses the element that should be focused when the focus trap is initialized. */
    focusInitialElement() {
        let redirectToElement = this._element.querySelector('[cdk-focus-initial]');
        if (redirectToElement) {
            redirectToElement.focus();
        }
        else {
            this.focusFirstTabbableElement();
        }
    }
    /** Focuses the first tabbable element within the focus trap region. */
    focusFirstTabbableElement() {
        let redirectToElement = this._getRegionBoundary('start');
        if (redirectToElement) {
            redirectToElement.focus();
        }
    }
    /** Focuses the last tabbable element within the focus trap region. */
    focusLastTabbableElement() {
        let redirectToElement = this._getRegionBoundary('end');
        if (redirectToElement) {
            redirectToElement.focus();
        }
    }
    /** Get the first tabbable element from a DOM subtree (inclusive). */
    _getFirstTabbableElement(root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in DOM order. Note that IE doesn't have `children` for SVG so we fall
        // back to `childNodes` which includes text nodes, comments etc.
        let children = root.children || root.childNodes;
        for (let i = 0; i < children.length; i++) {
            let tabbableChild = children[i].nodeType === Node.ELEMENT_NODE ?
                this._getFirstTabbableElement(children[i]) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    }
    /** Get the last tabbable element from a DOM subtree (inclusive). */
    _getLastTabbableElement(root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in reverse DOM order.
        let children = root.children || root.childNodes;
        for (let i = children.length - 1; i >= 0; i--) {
            let tabbableChild = children[i].nodeType === Node.ELEMENT_NODE ?
                this._getLastTabbableElement(children[i]) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    }
    /** Creates an anchor element. */
    _createAnchor() {
        let anchor = document.createElement('div');
        anchor.tabIndex = this._enabled ? 0 : -1;
        anchor.classList.add('cdk-visually-hidden');
        anchor.classList.add('cdk-focus-trap-anchor');
        return anchor;
    }
}
/** Factory that allows easy instantiation of focus traps. */
let FocusTrapFactory = class FocusTrapFactory {
    constructor(_checker, _ngZone) {
        this._checker = _checker;
        this._ngZone = _ngZone;
    }
    create(element, deferAnchors = false) {
        return new FocusTrap(element, this._checker, this._ngZone, deferAnchors);
    }
};
FocusTrapFactory = __decorate$26([
    Injectable(),
    __metadata$15("design:paramtypes", [InteractivityChecker, NgZone])
], FocusTrapFactory);
/**
 * Directive for trapping focus within a region.
 * @deprecated
 */
let FocusTrapDeprecatedDirective = class FocusTrapDeprecatedDirective {
    constructor(_elementRef, _focusTrapFactory) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    /** Whether the focus trap is active. */
    get disabled() { return !this.focusTrap.enabled; }
    set disabled(val) {
        this.focusTrap.enabled = !coerceBooleanProperty(val);
    }
    ngOnDestroy() {
        this.focusTrap.destroy();
    }
    ngAfterContentInit() {
        this.focusTrap.attachAnchors();
    }
};
__decorate$26([
    Input(),
    __metadata$15("design:type", Boolean),
    __metadata$15("design:paramtypes", [Boolean])
], FocusTrapDeprecatedDirective.prototype, "disabled", null);
FocusTrapDeprecatedDirective = __decorate$26([
    Directive({
        selector: 'cdk-focus-trap',
    }),
    __metadata$15("design:paramtypes", [ElementRef, FocusTrapFactory])
], FocusTrapDeprecatedDirective);
/** Directive for trapping focus within a region. */
let FocusTrapDirective = class FocusTrapDirective {
    constructor(_elementRef, _focusTrapFactory) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    /** Whether the focus trap is active. */
    get enabled() { return this.focusTrap.enabled; }
    set enabled(value) { this.focusTrap.enabled = coerceBooleanProperty(value); }
    ngOnDestroy() {
        this.focusTrap.destroy();
    }
    ngAfterContentInit() {
        this.focusTrap.attachAnchors();
    }
};
__decorate$26([
    Input('cdkTrapFocus'),
    __metadata$15("design:type", Boolean),
    __metadata$15("design:paramtypes", [Boolean])
], FocusTrapDirective.prototype, "enabled", null);
FocusTrapDirective = __decorate$26([
    Directive({
        selector: '[cdkTrapFocus]',
        exportAs: 'cdkTrapFocus',
    }),
    __metadata$15("design:paramtypes", [ElementRef, FocusTrapFactory])
], FocusTrapDirective);

var __decorate$28 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$17 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$5 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const LIVE_ANNOUNCER_ELEMENT_TOKEN = new InjectionToken('liveAnnouncerElement');
let LiveAnnouncer = class LiveAnnouncer {
    constructor(elementToken, platform) {
        // Only do anything if we're on the browser platform.
        if (platform.isBrowser) {
            // We inject the live element as `any` because the constructor signature cannot reference
            // browser globals (HTMLElement) on non-browser environments, since having a class decorator
            // causes TypeScript to preserve the constructor signature types.
            this._liveElement = elementToken || this._createLiveElement();
        }
    }
    /**
     * Announces a message to screenreaders.
     * @param message Message to be announced to the screenreader
     * @param politeness The politeness of the announcer element
     */
    announce(message, politeness = 'polite') {
        this._liveElement.textContent = '';
        // TODO: ensure changing the politeness works on all environments we support.
        this._liveElement.setAttribute('aria-live', politeness);
        // This 100ms timeout is necessary for some browser + screen-reader combinations:
        // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
        // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
        //   second time without clearing and then using a non-zero delay.
        // (using JAWS 17 at time of this writing).
        setTimeout(() => this._liveElement.textContent = message, 100);
    }
    /** Removes the aria-live element from the DOM. */
    _removeLiveElement() {
        if (this._liveElement && this._liveElement.parentNode) {
            this._liveElement.parentNode.removeChild(this._liveElement);
        }
    }
    _createLiveElement() {
        let liveEl = document.createElement('div');
        liveEl.classList.add('cdk-visually-hidden');
        liveEl.setAttribute('aria-atomic', 'true');
        liveEl.setAttribute('aria-live', 'polite');
        document.body.appendChild(liveEl);
        return liveEl;
    }
};
LiveAnnouncer = __decorate$28([
    Injectable(),
    __param$5(0, Optional()), __param$5(0, Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN)),
    __metadata$17("design:paramtypes", [Object, Platform])
], LiveAnnouncer);
function LIVE_ANNOUNCER_PROVIDER_FACTORY(parentDispatcher, liveElement, platform) {
    return parentDispatcher || new LiveAnnouncer(liveElement, platform);
}
const LIVE_ANNOUNCER_PROVIDER = {
    // If there is already a LiveAnnouncer available, use that. Otherwise, provide a new one.
    provide: LiveAnnouncer,
    deps: [
        [new Optional(), new SkipSelf(), LiveAnnouncer],
        [new Optional(), new Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN)],
        Platform,
    ],
    useFactory: LIVE_ANNOUNCER_PROVIDER_FACTORY
};

var __decorate$25 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let A11yModule = class A11yModule {
};
A11yModule = __decorate$25([
    NgModule({
        imports: [CommonModule, PlatformModule],
        declarations: [FocusTrapDirective, FocusTrapDeprecatedDirective],
        exports: [FocusTrapDirective, FocusTrapDeprecatedDirective],
        providers: [InteractivityChecker, FocusTrapFactory, LIVE_ANNOUNCER_PROVIDER]
    })
], A11yModule);

var __decorate$29 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * The FullscreenOverlayContainer is the alternative to OverlayContainer
 * that supports correct displaying of overlay elements in Fullscreen mode
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
 * It should be provided in the root component that way:
 * providers: [
 *   {provide: OverlayContainer, useClass: FullscreenOverlayContainer}
 * ],
 */
let FullscreenOverlayContainer = class FullscreenOverlayContainer extends OverlayContainer {
    _createContainer() {
        super._createContainer();
        this._adjustParentForFullscreenChange();
        this._addFullscreenChangeListener(() => this._adjustParentForFullscreenChange());
    }
    _adjustParentForFullscreenChange() {
        if (!this._containerElement) {
            return;
        }
        let fullscreenElement = this.getFullscreenElement();
        let parent = fullscreenElement || document.body;
        parent.appendChild(this._containerElement);
    }
    _addFullscreenChangeListener(fn) {
        if (document.fullscreenEnabled) {
            document.addEventListener('fullscreenchange', fn);
        }
        else if (document.webkitFullscreenEnabled) {
            document.addEventListener('webkitfullscreenchange', fn);
        }
        else if (document.mozFullScreenEnabled) {
            document.addEventListener('mozfullscreenchange', fn);
        }
        else if (document.msFullscreenEnabled) {
            document.addEventListener('MSFullscreenChange', fn);
        }
    }
    /**
     * When the page is put into fullscreen mode, a specific element is specified.
     * Only that element and its children are visible when in fullscreen mode.
    */
    getFullscreenElement() {
        return document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement ||
            null;
    }
};
FullscreenOverlayContainer = __decorate$29([
    Injectable()
], FullscreenOverlayContainer);

//# sourceMappingURL=index.js.map

var __decorate$30 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$18 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* Adjusts configuration of our gesture library, Hammer. */
let GestureConfig = class GestureConfig extends HammerGestureConfig {
    constructor() {
        super();
        this._hammer = typeof window !== 'undefined' ? window.Hammer : null;
        /* List of new event names to add to the gesture support list */
        this.events = this._hammer ? [
            'longpress',
            'slide',
            'slidestart',
            'slideend',
            'slideright',
            'slideleft'
        ] : [];
        if (!this._hammer && isDevMode()) {
            console.warn('Could not find HammerJS. Certain Angular Material ' +
                'components may not work correctly.');
        }
    }
    /**
     * Builds Hammer instance manually to add custom recognizers that match the Material Design spec.
     *
     * Our gesture names come from the Material Design gestures spec:
     * https://www.google.com/design/spec/patterns/gestures.html#gestures-touch-mechanics
     *
     * More information on default recognizers can be found in Hammer docs:
     * http://hammerjs.github.io/recognizer-pan/
     * http://hammerjs.github.io/recognizer-press/
     *
     * @param element Element to which to assign the new HammerJS gestures.
     * @returns Newly-created HammerJS instance.
     */
    buildHammer(element) {
        const mc = new this._hammer(element);
        // Default Hammer Recognizers.
        let pan = new this._hammer.Pan();
        let swipe = new this._hammer.Swipe();
        let press = new this._hammer.Press();
        // Notice that a HammerJS recognizer can only depend on one other recognizer once.
        // Otherwise the previous `recognizeWith` will be dropped.
        // TODO: Confirm threshold numbers with Material Design UX Team
        let slide = this._createRecognizer(pan, { event: 'slide', threshold: 0 }, swipe);
        let longpress = this._createRecognizer(press, { event: 'longpress', time: 500 });
        // Overwrite the default `pan` event to use the swipe event.
        pan.recognizeWith(swipe);
        // Add customized gestures to Hammer manager
        mc.add([swipe, press, pan, slide, longpress]);
        return mc;
    }
    /** Creates a new recognizer, without affecting the default recognizers of HammerJS */
    _createRecognizer(base, options, ...inheritances) {
        let recognizer = new base.constructor(options);
        inheritances.push(base);
        inheritances.forEach(item => recognizer.recognizeWith(item));
        return recognizer;
    }
};
GestureConfig = __decorate$30([
    Injectable(),
    __metadata$18("design:paramtypes", [])
], GestureConfig);

/**
 * Class to be used to power selecting one or more options from a list.
 * @docs-private
 */
class SelectionModel {
    constructor(_isMulti = false, initiallySelectedValues, _emitChanges = true) {
        this._isMulti = _isMulti;
        this._emitChanges = _emitChanges;
        /** Currently-selected values. */
        this._selection = new Set();
        /** Keeps track of the deselected options that haven't been emitted by the change event. */
        this._deselectedToEmit = [];
        /** Keeps track of the selected option that haven't been emitted by the change event. */
        this._selectedToEmit = [];
        /** Event emitted when the value has changed. */
        this.onChange = this._emitChanges ? new Subject() : null;
        if (initiallySelectedValues) {
            if (_isMulti) {
                initiallySelectedValues.forEach(value => this._markSelected(value));
            }
            else {
                this._markSelected(initiallySelectedValues[0]);
            }
            // Clear the array in order to avoid firing the change event for preselected values.
            this._selectedToEmit.length = 0;
        }
    }
    /** Selected value(s). */
    get selected() {
        if (!this._selected) {
            this._selected = Array.from(this._selection.values());
        }
        return this._selected;
    }
    /**
     * Selects a value or an array of values.
     */
    select(value) {
        this._markSelected(value);
        this._emitChangeEvent();
    }
    /**
     * Deselects a value or an array of values.
     */
    deselect(value) {
        this._unmarkSelected(value);
        this._emitChangeEvent();
    }
    /**
     * Toggles a value between selected and deselected.
     */
    toggle(value) {
        this.isSelected(value) ? this.deselect(value) : this.select(value);
    }
    /**
     * Clears all of the selected values.
     */
    clear() {
        this._unmarkAll();
        this._emitChangeEvent();
    }
    /**
     * Determines whether a value is selected.
     */
    isSelected(value) {
        return this._selection.has(value);
    }
    /**
     * Determines whether the model does not have a value.
     */
    isEmpty() {
        return this._selection.size === 0;
    }
    /**
     * Determines whether the model has a value.
     */
    hasValue() {
        return !this.isEmpty();
    }
    /**
     * Sorts the selected values based on a predicate function.
     */
    sort(predicate) {
        if (this._isMulti && this.selected) {
            this._selected.sort(predicate);
        }
    }
    /** Emits a change event and clears the records of selected and deselected values. */
    _emitChangeEvent() {
        if (this._selectedToEmit.length || this._deselectedToEmit.length) {
            let eventData = new SelectionChange(this._selectedToEmit, this._deselectedToEmit);
            this.onChange.next(eventData);
            this._deselectedToEmit = [];
            this._selectedToEmit = [];
        }
        this._selected = null;
    }
    /** Selects a value. */
    _markSelected(value) {
        if (!this.isSelected(value)) {
            if (!this._isMulti) {
                this._unmarkAll();
            }
            this._selection.add(value);
            if (this._emitChanges) {
                this._selectedToEmit.push(value);
            }
        }
    }
    /** Deselects a value. */
    _unmarkSelected(value) {
        if (this.isSelected(value)) {
            this._selection.delete(value);
            if (this._emitChanges) {
                this._deselectedToEmit.push(value);
            }
        }
    }
    /** Clears out the selected values. */
    _unmarkAll() {
        if (!this.isEmpty()) {
            this._selection.forEach(value => this._unmarkSelected(value));
        }
    }
}
/**
 * Describes an event emitted when the value of a MdSelectionModel has changed.
 * @docs-private
 */
class SelectionChange {
    constructor(added, removed) {
        this.added = added;
        this.removed = removed;
    }
}

/**
 * Screenreaders will often fire fake mousedown events when a focusable element
 * is activated using the keyboard. We can typically distinguish between these faked
 * mousedown events and real mousedown events using the "buttons" property. While
 * real mousedowns will indicate the mouse button that was pressed (e.g. "1" for
 * the left mouse button), faked mousedowns will usually set the property value to 0.
 */
function isFakeMousedownFromScreenReader(event) {
    return event.buttons === 0;
}
//# sourceMappingURL=fake-mousedown.js.map

var __decorate$31 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Class to coordinate unique selection based on name.
 * Intended to be consumed as an Angular service.
 * This service is needed because native radio change events are only fired on the item currently
 * being selected, and we still need to uncheck the previous selection.
 *
 * This service does not *store* any IDs and names because they may change at any time, so it is
 * less error-prone if they are simply passed through when the events occur.
 */
let UniqueSelectionDispatcher = class UniqueSelectionDispatcher {
    /**
     * Class to coordinate unique selection based on name.
     * Intended to be consumed as an Angular service.
     * This service is needed because native radio change events are only fired on the item currently
     * being selected, and we still need to uncheck the previous selection.
     *
     * This service does not *store* any IDs and names because they may change at any time, so it is
     * less error-prone if they are simply passed through when the events occur.
     */
    constructor() {
        this._listeners = [];
    }
    /**
     * Notify other items that selection for the given name has been set.
     * @param id ID of the item.
     * @param name Name of the item.
     */
    notify(id, name) {
        for (let listener of this._listeners) {
            listener(id, name);
        }
    }
    /** Listen for future changes to item selection. */
    listen(listener) {
        this._listeners.push(listener);
    }
};
UniqueSelectionDispatcher = __decorate$31([
    Injectable()
], UniqueSelectionDispatcher);
function UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY(parentDispatcher) {
    return parentDispatcher || new UniqueSelectionDispatcher();
}
const UNIQUE_SELECTION_DISPATCHER_PROVIDER = {
    // If there is already a dispatcher available, use that. Otherwise, provide a new one.
    provide: UniqueSelectionDispatcher,
    deps: [[new Optional(), new SkipSelf(), UniqueSelectionDispatcher]],
    useFactory: UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY
};

var __decorate$33 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$19 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// This is the value used by AngularJS Material. Through trial and error (on iPhone 6S) they found
// that a value of around 650ms seems appropriate.
const TOUCH_BUFFER_MS = 650;
/** Monitors mouse and keyboard events to determine the cause of focus events. */
let FocusOriginMonitor = class FocusOriginMonitor {
    constructor(_ngZone, _platform) {
        this._ngZone = _ngZone;
        this._platform = _platform;
        /** The focus origin that the next focus event is a result of. */
        this._origin = null;
        /** Whether the window has just been focused. */
        this._windowFocused = false;
        /** Weak map of elements being monitored to their info. */
        this._elementInfo = new WeakMap();
        this._ngZone.runOutsideAngular(() => this._registerDocumentEvents());
    }
    /**
     * Monitors focus on an element and applies appropriate CSS classes.
     * @param element The element to monitor
     * @param renderer The renderer to use to apply CSS classes to the element.
     * @param checkChildren Whether to count the element as focused when its children are focused.
     * @returns An observable that emits when the focus state of the element changes.
     *     When the element is blurred, null will be emitted.
     */
    monitor(element, renderer, checkChildren) {
        // Do nothing if we're not on the browser platform.
        if (!this._platform.isBrowser) {
            return Observable.of();
        }
        // Check if we're already monitoring this element.
        if (this._elementInfo.has(element)) {
            let info = this._elementInfo.get(element);
            info.checkChildren = checkChildren;
            return info.subject.asObservable();
        }
        // Create monitored element info.
        let info = {
            unlisten: null,
            checkChildren: checkChildren,
            renderer: renderer,
            subject: new Subject()
        };
        this._elementInfo.set(element, info);
        // Start listening. We need to listen in capture phase since focus events don't bubble.
        let focusListener = (event) => this._onFocus(event, element);
        let blurListener = (event) => this._onBlur(event, element);
        this._ngZone.runOutsideAngular(() => {
            element.addEventListener('focus', focusListener, true);
            element.addEventListener('blur', blurListener, true);
        });
        // Create an unlisten function for later.
        info.unlisten = () => {
            element.removeEventListener('focus', focusListener, true);
            element.removeEventListener('blur', blurListener, true);
        };
        return info.subject.asObservable();
    }
    /**
     * Stops monitoring an element and removes all focus classes.
     * @param element The element to stop monitoring.
     */
    stopMonitoring(element) {
        let elementInfo = this._elementInfo.get(element);
        if (elementInfo) {
            elementInfo.unlisten();
            elementInfo.subject.complete();
            this._setClasses(element, null);
            this._elementInfo.delete(element);
        }
    }
    /**
     * Focuses the element via the specified focus origin.
     * @param element The element to focus.
     * @param renderer The renderer to use to invoke the focus method on the element.
     * @param origin The focus origin.
     */
    focusVia(element, renderer, origin) {
        this._setOriginForCurrentEventQueue(origin);
        element.focus();
    }
    /** Register necessary event listeners on the document and window. */
    _registerDocumentEvents() {
        // Do nothing if we're not on the browser platform.
        if (!this._platform.isBrowser) {
            return;
        }
        // Note: we listen to events in the capture phase so we can detect them even if the user stops
        // propagation.
        // On keydown record the origin and clear any touch event that may be in progress.
        document.addEventListener('keydown', () => {
            this._lastTouchTarget = null;
            this._setOriginForCurrentEventQueue('keyboard');
        }, true);
        // On mousedown record the origin only if there is not touch target, since a mousedown can
        // happen as a result of a touch event.
        document.addEventListener('mousedown', () => {
            if (!this._lastTouchTarget) {
                this._setOriginForCurrentEventQueue('mouse');
            }
        }, true);
        // When the touchstart event fires the focus event is not yet in the event queue. This means
        // we can't rely on the trick used above (setting timeout of 0ms). Instead we wait 650ms to
        // see if a focus happens.
        document.addEventListener('touchstart', (event) => {
            if (this._touchTimeout != null) {
                clearTimeout(this._touchTimeout);
            }
            this._lastTouchTarget = event.target;
            this._touchTimeout = setTimeout(() => this._lastTouchTarget = null, TOUCH_BUFFER_MS);
        }, true);
        // Make a note of when the window regains focus, so we can restore the origin info for the
        // focused element.
        window.addEventListener('focus', () => {
            this._windowFocused = true;
            setTimeout(() => this._windowFocused = false, 0);
        });
    }
    /**
     * Sets the focus classes on the element based on the given focus origin.
     * @param element The element to update the classes on.
     * @param origin The focus origin.
     */
    _setClasses(element, origin) {
        let renderer = this._elementInfo.get(element).renderer;
        let toggleClass = (className, shouldSet) => {
            shouldSet ? renderer.addClass(element, className) : renderer.removeClass(element, className);
        };
        toggleClass('cdk-focused', !!origin);
        toggleClass('cdk-touch-focused', origin === 'touch');
        toggleClass('cdk-keyboard-focused', origin === 'keyboard');
        toggleClass('cdk-mouse-focused', origin === 'mouse');
        toggleClass('cdk-program-focused', origin === 'program');
    }
    /**
     * Sets the origin and schedules an async function to clear it at the end of the event queue.
     * @param origin The origin to set.
     */
    _setOriginForCurrentEventQueue(origin) {
        this._origin = origin;
        setTimeout(() => this._origin = null, 0);
    }
    /**
     * Checks whether the given focus event was caused by a touchstart event.
     * @param event The focus event to check.
     * @returns Whether the event was caused by a touch.
     */
    _wasCausedByTouch(event) {
        // Note(mmalerba): This implementation is not quite perfect, there is a small edge case.
        // Consider the following dom structure:
        //
        // <div #parent tabindex="0" cdkFocusClasses>
        //   <div #child (click)="#parent.focus()"></div>
        // </div>
        //
        // If the user touches the #child element and the #parent is programmatically focused as a
        // result, this code will still consider it to have been caused by the touch event and will
        // apply the cdk-touch-focused class rather than the cdk-program-focused class. This is a
        // relatively small edge-case that can be worked around by using
        // focusVia(parentEl, renderer,  'program') to focus the parent element.
        //
        // If we decide that we absolutely must handle this case correctly, we can do so by listening
        // for the first focus event after the touchstart, and then the first blur event after that
        // focus event. When that blur event fires we know that whatever follows is not a result of the
        // touchstart.
        let focusTarget = event.target;
        return this._lastTouchTarget instanceof Node && focusTarget instanceof Node &&
            (focusTarget === this._lastTouchTarget || focusTarget.contains(this._lastTouchTarget));
    }
    /**
     * Handles focus events on a registered element.
     * @param event The focus event.
     * @param element The monitored element.
     */
    _onFocus(event, element) {
        // NOTE(mmalerba): We currently set the classes based on the focus origin of the most recent
        // focus event affecting the monitored element. If we want to use the origin of the first event
        // instead we should check for the cdk-focused class here and return if the element already has
        // it. (This only matters for elements that have includesChildren = true).
        // If we are not counting child-element-focus as focused, make sure that the event target is the
        // monitored element itself.
        if (!this._elementInfo.get(element).checkChildren && element !== event.target) {
            return;
        }
        // If we couldn't detect a cause for the focus event, it's due to one of three reasons:
        // 1) The window has just regained focus, in which case we want to restore the focused state of
        //    the element from before the window blurred.
        // 2) It was caused by a touch event, in which case we mark the origin as 'touch'.
        // 3) The element was programmatically focused, in which case we should mark the origin as
        //    'program'.
        if (!this._origin) {
            if (this._windowFocused && this._lastFocusOrigin) {
                this._origin = this._lastFocusOrigin;
            }
            else if (this._wasCausedByTouch(event)) {
                this._origin = 'touch';
            }
            else {
                this._origin = 'program';
            }
        }
        this._setClasses(element, this._origin);
        this._elementInfo.get(element).subject.next(this._origin);
        this._lastFocusOrigin = this._origin;
        this._origin = null;
    }
    /**
     * Handles blur events on a registered element.
     * @param event The blur event.
     * @param element The monitored element.
     */
    _onBlur(event, element) {
        // If we are counting child-element-focus as focused, make sure that we aren't just blurring in
        // order to focus another child of the monitored element.
        if (this._elementInfo.get(element).checkChildren && event.relatedTarget instanceof Node &&
            element.contains(event.relatedTarget)) {
            return;
        }
        this._setClasses(element, null);
        this._elementInfo.get(element).subject.next(null);
    }
};
FocusOriginMonitor = __decorate$33([
    Injectable(),
    __metadata$19("design:paramtypes", [NgZone, Platform])
], FocusOriginMonitor);
/**
 * Directive that determines how a particular element was focused (via keyboard, mouse, touch, or
 * programmatically) and adds corresponding classes to the element.
 *
 * There are two variants of this directive:
 * 1) cdkMonitorElementFocus: does not consider an element to be focused if one of its children is
 *    focused.
 * 2) cdkMonitorSubtreeFocus: considers an element focused if it or any of its children are focused.
 */
let CdkMonitorFocus = class CdkMonitorFocus {
    constructor(_elementRef, _focusOriginMonitor, renderer) {
        this._elementRef = _elementRef;
        this._focusOriginMonitor = _focusOriginMonitor;
        this.cdkFocusChange = new EventEmitter();
        this._focusOriginMonitor.monitor(this._elementRef.nativeElement, renderer, this._elementRef.nativeElement.hasAttribute('cdkMonitorSubtreeFocus'))
            .subscribe(origin => this.cdkFocusChange.emit(origin));
    }
    ngOnDestroy() {
        this._focusOriginMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
};
__decorate$33([
    Output(),
    __metadata$19("design:type", Object)
], CdkMonitorFocus.prototype, "cdkFocusChange", void 0);
CdkMonitorFocus = __decorate$33([
    Directive({
        selector: '[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]',
    }),
    __metadata$19("design:paramtypes", [ElementRef, FocusOriginMonitor,
        Renderer2])
], CdkMonitorFocus);
function FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY(parentDispatcher, ngZone, platform) {
    return parentDispatcher || new FocusOriginMonitor(ngZone, platform);
}
const FOCUS_ORIGIN_MONITOR_PROVIDER = {
    // If there is already a FocusOriginMonitor available, use that. Otherwise, provide a new one.
    provide: FocusOriginMonitor,
    deps: [[new Optional(), new SkipSelf(), FocusOriginMonitor], NgZone, Platform],
    useFactory: FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY
};

/**
 * Applies a CSS transform to an element, including browser-prefixed properties.
 * @param element
 * @param transformValue
 */
/**
 * Applies a CSS transform to an element, including browser-prefixed properties.
 * @param element
 * @param transformValue
 */ function applyCssTransform(element, transformValue) {
    // It's important to trim the result, because the browser will ignore the set operation
    // if the string contains only whitespace.
    let value = transformValue.trim();
    element.style.transform = value;
    element.style.webkitTransform = value;
}

var __decorate$32 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let StyleModule = class StyleModule {
};
StyleModule = __decorate$32([
    NgModule({
        imports: [PlatformModule],
        declarations: [CdkMonitorFocus],
        exports: [CdkMonitorFocus],
        providers: [FOCUS_ORIGIN_MONITOR_PROVIDER],
    })
], StyleModule);

/** @docs-private */
/** @docs-private */ class AnimationCurves {
}
AnimationCurves.STANDARD_CURVE = 'cubic-bezier(0.4,0.0,0.2,1)';
AnimationCurves.DECELERATION_CURVE = 'cubic-bezier(0.0,0.0,0.2,1)';
AnimationCurves.ACCELERATION_CURVE = 'cubic-bezier(0.4,0.0,1,1)';
AnimationCurves.SHARP_CURVE = 'cubic-bezier(0.4,0.0,0.6,1)';
/** @docs-private */
class AnimationDurations {
}
AnimationDurations.COMPLEX = '375ms';
AnimationDurations.ENTERING = '225ms';
AnimationDurations.EXITING = '195ms';

/** Coerces a data-bound value (typically a string) to a number. */
/** Coerces a data-bound value (typically a string) to a number. */ function coerceNumberProperty(value, fallbackValue = 0) {
    // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
    // and other non-number values as NaN, where Number just uses 0) but it considers the string
    // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
    return isNaN(parseFloat(value)) || isNaN(Number(value)) ? fallbackValue : Number(value);
}

/** Adapts type `D` to be usable as a date by cdk-based components that work with dates. */
/** Adapts type `D` to be usable as a date by cdk-based components that work with dates. */ class DateAdapter {
    /**
     * Sets the locale used for all dates.
     * @param locale The new locale.
     */
    setLocale(locale) {
        this.locale = locale;
    }
    /**
     * Compares two dates.
     * @param first The first date to compare.
     * @param second The second date to compare.
     * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    compareDate(first, second) {
        return this.getYear(first) - this.getYear(second) ||
            this.getMonth(first) - this.getMonth(second) ||
            this.getDate(first) - this.getDate(second);
    }
    /**
     * Checks if two dates are equal.
     * @param first The first date to check.
     * @param second The second date to check.
     * @returns {boolean} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    sameDate(first, second) {
        return first && second ? !this.compareDate(first, second) : first == second;
    }
    /**
     * Clamp the given date between min and max dates.
     * @param date The date to clamp.
     * @param min The minimum value to allow. If null or omitted no min is enforced.
     * @param max The maximum value to allow. If null or omitted no max is enforced.
     * @returns `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    clampDate(date, min, max) {
        if (min && this.compareDate(date, min) < 0) {
            return min;
        }
        if (max && this.compareDate(date, max) > 0) {
            return max;
        }
        return date;
    }
}

// TODO(mmalerba): Remove when we no longer support safari 9.
/** Whether the browser supports the Intl API. */
const SUPPORTS_INTL_API = typeof Intl != 'undefined';
/** The default month names to use if Intl API is not available. */
const DEFAULT_MONTH_NAMES = {
    'long': [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'
    ],
    'short': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    'narrow': ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
};
/** The default date names to use if Intl API is not available. */
const DEFAULT_DATE_NAMES = range(31, i => String(i + 1));
/** The default day of the week names to use if Intl API is not available. */
const DEFAULT_DAY_OF_WEEK_NAMES = {
    'long': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    'short': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'narrow': ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};
/** Creates an array and fills it with values. */
function range(length, valueFunction) {
    return Array.apply(null, Array(length)).map((v, i) => valueFunction(i));
}
/** Adapts the native JS Date for use with cdk-based components that work with dates. */
class NativeDateAdapter extends DateAdapter {
    getYear(date) {
        return date.getFullYear();
    }
    getMonth(date) {
        return date.getMonth();
    }
    getDate(date) {
        return date.getDate();
    }
    getDayOfWeek(date) {
        return date.getDay();
    }
    getMonthNames(style$$1) {
        if (SUPPORTS_INTL_API) {
            let dtf = new Intl.DateTimeFormat(this.locale, { month: style$$1 });
            return range(12, i => this._stripDirectionalityCharacters(dtf.format(new Date(2017, i, 1))));
        }
        return DEFAULT_MONTH_NAMES[style$$1];
    }
    getDateNames() {
        if (SUPPORTS_INTL_API) {
            let dtf = new Intl.DateTimeFormat(this.locale, { day: 'numeric' });
            return range(31, i => this._stripDirectionalityCharacters(dtf.format(new Date(2017, 0, i + 1))));
        }
        return DEFAULT_DATE_NAMES;
    }
    getDayOfWeekNames(style$$1) {
        if (SUPPORTS_INTL_API) {
            let dtf = new Intl.DateTimeFormat(this.locale, { weekday: style$$1 });
            return range(7, i => this._stripDirectionalityCharacters(dtf.format(new Date(2017, 0, i + 1))));
        }
        return DEFAULT_DAY_OF_WEEK_NAMES[style$$1];
    }
    getYearName(date) {
        if (SUPPORTS_INTL_API) {
            let dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric' });
            return this._stripDirectionalityCharacters(dtf.format(date));
        }
        return String(this.getYear(date));
    }
    getFirstDayOfWeek() {
        // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
        return 0;
    }
    getNumDaysInMonth(date) {
        return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
    }
    clone(date) {
        return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date));
    }
    createDate(year, month, date) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11 || date < 1) {
            return null;
        }
        let result = this._createDateWithOverflow(year, month, date);
        // Check that the date wasn't above the upper bound for the month, causing the month to
        // overflow.
        if (result.getMonth() != month) {
            return null;
        }
        return result;
    }
    today() {
        return new Date();
    }
    parse(value, parseFormat) {
        // We have no way using the native JS Date to set the parse format or locale, so we ignore these
        // parameters.
        let timestamp = typeof value == 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    }
    format(date, displayFormat) {
        if (SUPPORTS_INTL_API) {
            let dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
            return this._stripDirectionalityCharacters(dtf.format(date));
        }
        return this._stripDirectionalityCharacters(date.toDateString());
    }
    addCalendarYears(date, years) {
        return this.addCalendarMonths(date, years * 12);
    }
    addCalendarMonths(date, months) {
        let newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date));
        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
        // guarantee this.
        if (this.getMonth(newDate) != ((this.getMonth(date) + months) % 12 + 12) % 12) {
            newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0);
        }
        return newDate;
    }
    addCalendarDays(date, days) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days);
    }
    getISODateString(date) {
        return [
            date.getUTCFullYear(),
            this._2digit(date.getUTCMonth() + 1),
            this._2digit(date.getUTCDate())
        ].join('-');
    }
    /** Creates a date but allows the month and date to overflow. */
    _createDateWithOverflow(year, month, date) {
        let result = new Date(year, month, date);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    }
    /**
     * Pads a number to make it two digits.
     * @param n The number to pad.
     * @returns The padded number.
     */
    _2digit(n) {
        return ('00' + n).slice(-2);
    }
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param s The string to strip direction characters from.
     * @returns The stripped string.
     */
    _stripDirectionalityCharacters(s) {
        return s.replace(/[\u200e\u200f]/g, '');
    }
}

const MD_DATE_FORMATS = new InjectionToken('md-date-formats');

const MD_NATIVE_DATE_FORMATS = {
    parse: {
        dateInput: null,
    },
    display: {
        dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};

var __decorate$34 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let NativeDateModule = class NativeDateModule {
};
NativeDateModule = __decorate$34([
    NgModule({
        providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }],
    })
], NativeDateModule);
let MdNativeDateModule = class MdNativeDateModule {
};
MdNativeDateModule = __decorate$34([
    NgModule({
        imports: [NativeDateModule],
        providers: [{ provide: MD_DATE_FORMATS, useValue: MD_NATIVE_DATE_FORMATS }],
    })
], MdNativeDateModule);

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let MdCoreModule = class MdCoreModule {
};
MdCoreModule = __decorate([
    NgModule({
        imports: [
            MdLineModule,
            RtlModule,
            MdRippleModule,
            ObserveContentModule,
            PortalModule,
            OverlayModule,
            A11yModule,
            MdOptionModule,
            MdSelectionModule,
        ],
        exports: [
            MdLineModule,
            RtlModule,
            MdRippleModule,
            ObserveContentModule,
            PortalModule,
            OverlayModule,
            A11yModule,
            MdOptionModule,
            MdSelectionModule,
        ],
    })
], MdCoreModule);

//# sourceMappingURL=index.js.map

//# sourceMappingURL=core.js.map

var __decorate$37 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$20 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let Md2Accordion = class Md2Accordion {
    constructor() {
        this.close = new EventEmitter();
        this.open = new EventEmitter();
        this.tabs = [];
    }
    get multiple() { return this._multiple; }
    set multiple(value) { this._multiple = coerceBooleanProperty(value); }
    /**
     * Add or append tab in accordion
     * @param tab object of Md2AccordionTab
     */
    addTab(tab) {
        this.tabs.push(tab);
    }
};
__decorate$37([
    Input(),
    __metadata$20("design:type", Boolean),
    __metadata$20("design:paramtypes", [Object])
], Md2Accordion.prototype, "multiple", null);
__decorate$37([
    Output(),
    __metadata$20("design:type", EventEmitter)
], Md2Accordion.prototype, "close", void 0);
__decorate$37([
    Output(),
    __metadata$20("design:type", EventEmitter)
], Md2Accordion.prototype, "open", void 0);
Md2Accordion = __decorate$37([
    Component({selector: 'md2-accordion',
        template: `<ng-content></ng-content>`,
        styles: ["md2-accordion{display:block}md2-accordion-tab{position:relative;display:block;outline:0;box-sizing:border-box}md2-accordion-tab[hidden]{display:none}.md2-accordion-header{position:relative;display:block;padding-right:30px;font-weight:500;line-height:40px;text-align:left;color:rgba(0,0,0,.87);cursor:pointer;white-space:nowrap;border-bottom:1px solid rgba(0,0,0,.12);border-radius:0;box-sizing:border-box;user-select:none}md2-accordion-tab.md2-accordion-tab-active>.md2-accordion-header{border-color:#106cc8;box-shadow:0 1px 0 #106cc8}md2-accordion-tab.md2-accordion-tab-disabled>.md2-accordion-header{pointer-events:none;color:rgba(0,0,0,.26);background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;background-position:0 bottom;border-color:transparent;box-shadow:none;cursor:default}.md2-accordion-header-icon{position:absolute;top:12px;right:8px;width:8px;height:8px;overflow:hidden;display:inline-block;border-width:0 2px 2px 0;border-style:solid;border-color:currentColor;opacity:.64;transform:rotate(45deg);transition:.3s ease-in-out}md2-accordion-tab.md2-accordion-tab-active>.md2-accordion-header>.md2-accordion-header-icon{transform:rotate(225deg);top:16px}.md2-accordion-tab-body{position:relative;overflow:hidden}.md2-accordion-tab-content{position:relative;padding:20px 0;border-bottom:1px solid rgba(0,0,0,.12)} /*# sourceMappingURL=accordion.css.map */ "],
        encapsulation: ViewEncapsulation.None,
        exportAs: 'md2Accordion'
    })
], Md2Accordion);

var __decorate$38 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$21 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let Md2AccordionHeader = class Md2AccordionHeader {
};
Md2AccordionHeader = __decorate$38([
    Directive({ selector: 'md2-accordion-header' })
], Md2AccordionHeader);
let Md2AccordionTab = class Md2AccordionTab {
    constructor(_accordion) {
        this._accordion = _accordion;
        this._disabled = false;
        this._active = false;
        this._accordion.addTab(this);
    }
    get active() { return this._active; }
    set active(value) {
        this._active = coerceBooleanProperty(value);
        if (this._active && !this._accordion.multiple) {
            for (let i = 0; i < this._accordion.tabs.length; i++) {
                if (this._accordion.tabs[i] !== this) {
                    this._accordion.tabs[i].active = false;
                }
            }
        }
    }
    get slide() {
        return this.active ? 'down' : 'up';
    }
    get disabled() { return this._disabled; }
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * Toggle the accordion
     * @param event
     * @return if it is disabled
     */
    _handleClick(event) {
        if (this.disabled) {
            return;
        }
        let index = this.findTabIndex();
        if (this.active) {
            this.active = !this.active;
            this._accordion.close.emit({ originalEvent: event, index: index });
        }
        else if (!this._accordion.multiple) {
            for (let i = 0; i < this._accordion.tabs.length; i++) {
                this._accordion.tabs[i].active = false;
            }
            this._active = true;
            this._accordion.open.emit({ originalEvent: event, index: index });
        }
        else {
            this._active = true;
            this._accordion.open.emit({ originalEvent: event, index: index });
        }
        event.preventDefault();
    }
    /**
     * Find index of specific tab of accordion
     * @return index number of this tab
     */
    findTabIndex() {
        let index = -1;
        for (let i = 0; i < this._accordion.tabs.length; i++) {
            if (this._accordion.tabs[i] === this) {
                index = i;
                break;
            }
        }
        return index;
    }
};
__decorate$38([
    Input(),
    __metadata$21("design:type", String)
], Md2AccordionTab.prototype, "header", void 0);
__decorate$38([
    Input(),
    __metadata$21("design:type", Boolean),
    __metadata$21("design:paramtypes", [Object])
], Md2AccordionTab.prototype, "active", null);
__decorate$38([
    Input(),
    __metadata$21("design:type", Boolean),
    __metadata$21("design:paramtypes", [Object])
], Md2AccordionTab.prototype, "disabled", null);
Md2AccordionTab = __decorate$38([
    Component({selector: 'md2-accordion-tab',
        template: `
    <div class="md2-accordion-header" (click)="_handleClick($event)">
      <span>{{header}}</span>
      <ng-content select="md2-accordion-header"></ng-content>
      <span class="md2-accordion-header-icon"></span>
    </div>
    <div class="md2-accordion-tab-body" [@slide]="slide">
      <div class="md2-accordion-tab-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
        styles: ["md2-accordion{display:block}md2-accordion-tab{position:relative;display:block;outline:0;box-sizing:border-box}md2-accordion-tab[hidden]{display:none}.md2-accordion-header{position:relative;display:block;padding-right:30px;font-weight:500;line-height:40px;text-align:left;color:rgba(0,0,0,.87);cursor:pointer;white-space:nowrap;border-bottom:1px solid rgba(0,0,0,.12);border-radius:0;box-sizing:border-box;user-select:none}md2-accordion-tab.md2-accordion-tab-active>.md2-accordion-header{border-color:#106cc8;box-shadow:0 1px 0 #106cc8}md2-accordion-tab.md2-accordion-tab-disabled>.md2-accordion-header{pointer-events:none;color:rgba(0,0,0,.26);background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;background-position:0 bottom;border-color:transparent;box-shadow:none;cursor:default}.md2-accordion-header-icon{position:absolute;top:12px;right:8px;width:8px;height:8px;overflow:hidden;display:inline-block;border-width:0 2px 2px 0;border-style:solid;border-color:currentColor;opacity:.64;transform:rotate(45deg);transition:.3s ease-in-out}md2-accordion-tab.md2-accordion-tab-active>.md2-accordion-header>.md2-accordion-header-icon{transform:rotate(225deg);top:16px}.md2-accordion-tab-body{position:relative;overflow:hidden}.md2-accordion-tab-content{position:relative;padding:20px 0;border-bottom:1px solid rgba(0,0,0,.12)} /*# sourceMappingURL=accordion.css.map */ "],
        animations: [
            trigger('slide', [
                state('up', style({ height: 0 })),
                state('down', style({ height: '*' })),
                transition('down => up', [
                    style({ height: '*' }),
                    animate(300, style({
                        height: 0
                    }))
                ]),
                transition('up => down', [
                    style({ height: 0 }),
                    animate(300, style({
                        height: '*'
                    }))
                ])
            ])
        ],
        host: {
            'role': 'accordion-tab',
            '[class.md2-accordion-tab-active]': 'active',
            '[class.md2-accordion-tab-disabled]': 'disabled'
        },
        encapsulation: ViewEncapsulation.None,
        exportAs: 'md2AccordionTab'
    }),
    __metadata$21("design:paramtypes", [Md2Accordion])
], Md2AccordionTab);

var __decorate$36 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Md2AccordionModule = class Md2AccordionModule {
};
Md2AccordionModule = __decorate$36([
    NgModule({
        imports: [CommonModule],
        exports: [Md2Accordion, Md2AccordionTab, Md2AccordionHeader],
        declarations: [Md2Accordion, Md2AccordionTab, Md2AccordionHeader],
    })
], Md2AccordionModule);

var __decorate$40 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let HighlightPipe = class HighlightPipe {
    /**
     * Transform function
     * @param value string
     * @param query string filter value
     * @return filtered string with markup
     */
    transform(value, query) {
        if (query.length < 1) {
            return value;
        }
        return query ? value.replace(new RegExp(this._escapeRegexp(query), 'gi'), '<span class="highlight">$&</span>') : value;
    }
    /**
     * filter pipe
     * @param queryToEscape
     * @return queryToEscape with replace string
     */
    _escapeRegexp(queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }
};
HighlightPipe = __decorate$40([
    Pipe({ name: 'highlight' })
], HighlightPipe);

var __decorate$41 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$22 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class Item {
    constructor(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
}
let nextId$1 = 0;
const MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Md2Autocomplete),
    multi: true
};
/** Change event object emitted by Md2Autocomplete. */
class Md2AutocompleteChange {
}
let Md2Autocomplete = class Md2Autocomplete {
    constructor(_element) {
        this._element = _element;
        this.change = new EventEmitter();
        this.textChange = new EventEmitter();
        this._value = '';
        this._readonly = false;
        this._required = false;
        this._disabled = false;
        this._isInitialized = false;
        this._onChange = (value) => { };
        this._onTouched = () => { };
        this._items = [];
        this._list = [];
        this.selectedItem = null;
        this.noBlur = false;
        this._focusedOption = 0;
        this._inputValue = '';
        this._inputFocused = false;
        this.id = 'md2-autocomplete-' + (++nextId$1);
        this.tabindex = 0;
        this.placeholder = '';
        this.textKey = 'text';
        this.valueKey = null;
        this.minLength = 1;
    }
    ngAfterContentInit() { this._isInitialized = true; }
    get readonly() { return this._readonly; }
    set readonly(value) { this._readonly = coerceBooleanProperty(value); }
    get required() { return this._required; }
    set required(value) { this._required = coerceBooleanProperty(value); }
    get disabled() { return this._disabled; }
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    set items(value) { this._items = value; }
    get value() { return this._value; }
    set value(value) {
        if (value !== this._value) {
            this._value = value;
            this._inputValue = '';
            if (value) {
                let selItm = this._items.find((i) => this.equals(this.valueKey ?
                    i[this.valueKey] : i, value));
                this.selectedItem = new Item(selItm, this.textKey, this.valueKey);
                if (this.selectedItem) {
                    this._inputValue = this.selectedItem.text;
                }
            }
            if (!this._inputValue) {
                this._inputValue = '';
            }
            if (this._isInitialized) {
                this._emitChangeEvent();
            }
        }
    }
    /**
     * Compare two vars or objects
     * @param o1 compare first object
     * @param o2 compare second object
     * @return boolean comparation result
     */
    equals(o1, o2) {
        if (o1 === o2) {
            return true;
        }
        if (o1 === null || o2 === null) {
            return false;
        }
        if (o1 !== o1 && o2 !== o2) {
            return true;
        }
        let t1 = typeof o1, t2 = typeof o2, key, keySet;
        if (t1 === t2 && t1 === 'object') {
            keySet = Object.create(null);
            for (key in o1) {
                if (!this.equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && key.charAt(0) !== '$' && o2[key]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    get isMenuVisible() {
        return ((this._inputFocused || this.noBlur) && this._list && this._list.length &&
            !this.selectedItem) && !this.readonly ? true : false;
    }
    /**
     * update scroll of suggestion menu
     */
    updateScroll() {
        if (this._focusedOption < 0) {
            return;
        }
        let menuContainer = this._element.nativeElement.querySelector('.md2-autocomplete-menu');
        if (!menuContainer) {
            return;
        }
        let choices = menuContainer.querySelectorAll('.md2-option');
        if (choices.length < 1) {
            return;
        }
        let highlighted = choices[this._focusedOption];
        if (!highlighted) {
            return;
        }
        let top = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
        let height = menuContainer.offsetHeight;
        if (top > height) {
            menuContainer.scrollTop += top - height;
        }
        else if (top < highlighted.clientHeight) {
            menuContainer.scrollTop -= highlighted.clientHeight - top;
        }
    }
    /**
     * input event listner
     * @param event
     */
    _handleKeydown(event) {
        if (this.disabled) {
            return;
        }
        this.textChange.emit(this._inputValue);
        switch (event.keyCode) {
            case TAB:
                this._handleMouseLeave();
                break;
            case ESCAPE:
                event.stopPropagation();
                event.preventDefault();
                if (this._inputValue) {
                    this._onClear();
                }
                break;
            case ENTER:
                event.preventDefault();
                event.stopPropagation();
                if (this.isMenuVisible) {
                    this._selectOption(event, this._focusedOption);
                }
                break;
            case DOWN_ARROW:
                event.preventDefault();
                event.stopPropagation();
                if (this.isMenuVisible) {
                    this._focusedOption = (this._focusedOption === this._list.length - 1) ? 0 :
                        Math.min(this._focusedOption + 1, this._list.length - 1);
                    this.updateScroll();
                }
                break;
            case UP_ARROW:
                event.preventDefault();
                event.stopPropagation();
                if (this.isMenuVisible) {
                    this._focusedOption = (this._focusedOption === 0) ? this._list.length - 1 :
                        Math.max(0, this._focusedOption - 1);
                    this.updateScroll();
                }
                break;
            default:
                setTimeout(() => {
                    this.updateItems();
                }, 10);
        }
    }
    /**
     * select option
     * @param event
     * @param index of selected item
     */
    _selectOption(event, index) {
        event.preventDefault();
        event.stopPropagation();
        this.selectedItem = this._list[index];
        this._inputValue = this._list[index].text;
        this.updateValue();
        this._handleMouseLeave();
    }
    /**
     * clear selected suggestion
     */
    _onClear() {
        if (this.disabled) {
            return;
        }
        this._inputValue = '';
        this.selectedItem = null;
        this.updateItems();
        this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
        this.updateValue();
    }
    /**
     * update value
     */
    updateValue() {
        this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
        this._emitChangeEvent();
        this.onFocus();
    }
    /**
     * component focus listener
     */
    onFocus() {
        if (this.disabled) {
            return;
        }
        this._element.nativeElement.querySelector('input').focus();
    }
    /**
     * input focus listener
     */
    _handleFocus() {
        this._inputFocused = true;
        this.updateItems();
        this._focusedOption = 0;
    }
    /**
     * input blur listener
     */
    _handleBlur() {
        this._inputFocused = false;
        this._onTouched();
    }
    /**
     * suggestion menu mouse enter listener
     */
    _handleMouseEnter() { this.noBlur = true; }
    /**
     * suggestion menu mouse leave listener
     */
    _handleMouseLeave() { this.noBlur = false; }
    /**
     * Update suggestion to filter the query
     * @param query
     */
    updateItems() {
        if (this._inputValue.length < this.minLength) {
            this._list = [];
        }
        else {
            this._list = this._items.map((i) => new Item(i, this.textKey, this.valueKey)).filter(i => new RegExp(this._inputValue, 'ig').test(i.text));
            if (this._list.length && this._list[0].text !== this._inputValue) {
                this.selectedItem = null;
            }
        }
    }
    _emitChangeEvent() {
        let event = new Md2AutocompleteChange();
        event.source = this;
        event.value = this._value;
        this._onChange(event.value);
        this.change.emit(event);
    }
    writeValue(value) {
        if (value !== this._value) {
            this._value = value;
            this._inputValue = '';
            if (value) {
                let selItm = this._items.find((i) => this.equals(this.valueKey ?
                    i[this.valueKey] : i, value));
                this.selectedItem = new Item(selItm, this.textKey, this.valueKey);
                if (this.selectedItem) {
                    this._inputValue = this.selectedItem.text;
                }
            }
            if (!this._inputValue) {
                this._inputValue = '';
            }
        }
    }
    registerOnChange(fn) { this._onChange = fn; }
    registerOnTouched(fn) { this._onTouched = fn; }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
};
__decorate$41([
    Output(),
    __metadata$22("design:type", EventEmitter)
], Md2Autocomplete.prototype, "change", void 0);
__decorate$41([
    Output(),
    __metadata$22("design:type", Object)
], Md2Autocomplete.prototype, "textChange", void 0);
__decorate$41([
    Input(),
    __metadata$22("design:type", String)
], Md2Autocomplete.prototype, "id", void 0);
__decorate$41([
    Input(),
    __metadata$22("design:type", Number)
], Md2Autocomplete.prototype, "tabindex", void 0);
__decorate$41([
    Input(),
    __metadata$22("design:type", String)
], Md2Autocomplete.prototype, "placeholder", void 0);
__decorate$41([
    Input('item-text'),
    __metadata$22("design:type", String)
], Md2Autocomplete.prototype, "textKey", void 0);
__decorate$41([
    Input('item-value'),
    __metadata$22("design:type", String)
], Md2Autocomplete.prototype, "valueKey", void 0);
__decorate$41([
    Input('min-length'),
    __metadata$22("design:type", Number)
], Md2Autocomplete.prototype, "minLength", void 0);
__decorate$41([
    Input(),
    __metadata$22("design:type", Boolean),
    __metadata$22("design:paramtypes", [Object])
], Md2Autocomplete.prototype, "readonly", null);
__decorate$41([
    Input(),
    __metadata$22("design:type", Boolean),
    __metadata$22("design:paramtypes", [Object])
], Md2Autocomplete.prototype, "required", null);
__decorate$41([
    Input(),
    __metadata$22("design:type", Boolean),
    __metadata$22("design:paramtypes", [Object])
], Md2Autocomplete.prototype, "disabled", null);
__decorate$41([
    Input(),
    __metadata$22("design:type", Array),
    __metadata$22("design:paramtypes", [Array])
], Md2Autocomplete.prototype, "items", null);
__decorate$41([
    Input(),
    __metadata$22("design:type", Object),
    __metadata$22("design:paramtypes", [Object])
], Md2Autocomplete.prototype, "value", null);
Md2Autocomplete = __decorate$41([
    Component({selector: 'md2-autocomplete',
        template: "<div class=\"md2-autocomplete-trigger\" [class.is-focused]=\"_inputFocused || isMenuVisible\"><input [(ngModel)]=\"_inputValue\" type=\"text\" autocomplete=\"off\" [readonly]=\"readonly\" [tabindex]=\"disabled ? -1 : tabindex\" [disabled]=\"disabled\" class=\"md2-autocomplete-input\" (focus)=\"_handleFocus()\" (blur)=\"_handleBlur()\" (keydown)=\"_handleKeydown($event)\" (change)=\"$event.stopPropagation()\"> <span class=\"md2-autocomplete-placeholder\" [class.has-value]=\"_inputValue\">{{ placeholder }} </span><svg *ngIf=\"_inputValue && !required && !disabled\" (click)=\"_onClear()\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/></svg></div><ul *ngIf=\"isMenuVisible\" class=\"md2-autocomplete-menu\" (mouseenter)=\"_handleMouseEnter()\" (mouseleave)=\"_handleMouseLeave()\"><li class=\"md2-option\" *ngFor=\"let l of _list; let i = index;\" [class.focus]=\"_focusedOption === i\" (click)=\"_selectOption($event, i)\"><div class=\"md2-text\" [innerHtml]=\"l.text | highlight:_inputValue\"></div></li></ul>",
        styles: ["md2-autocomplete{position:relative;display:block;margin:18px 0;outline:0;user-select:none;backface-visibility:hidden}md2-autocomplete.md2-autocomplete-disabled{pointer-events:none;cursor:default}.md2-autocomplete-trigger{position:relative;display:block;width:100%;padding:2px 2px 1px;border-bottom:1px solid rgba(0,0,0,.12);box-sizing:border-box;min-width:64px;min-height:26px;cursor:pointer}.md2-autocomplete-trigger.is-focused{padding-bottom:0;border-bottom:2px solid #106cc8}md2-autocomplete.ng-invalid.ng-touched:not(.md2-autocomplete-disabled) .md2-autocomplete-trigger{color:#f44336;border-bottom-color:#f44336}md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-trigger{color:rgba(0,0,0,.38);border-color:transparent;background-image:linear-gradient(to right,rgba(0,0,0,.38) 0,rgba(0,0,0,.38) 33%,transparent 0);background-position:bottom -1px left 0;background-size:4px 1px;background-repeat:repeat-x;cursor:default}md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-trigger.is-focused{padding-bottom:1px;border-bottom:1px solid transparent}.md2-autocomplete-input{width:100%;height:26px;font-size:15px;outline:0;background:0 0;border:0;box-sizing:border-box}md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-input{color:rgba(0,0,0,.38)}.md2-autocomplete-placeholder{position:absolute;right:26px;bottom:100%;left:0;max-width:100%;padding-left:3px;padding-right:0;line-height:1.4;color:rgba(0,0,0,.38);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;pointer-events:none;z-index:1;transform:translate3d(0,26px,0) scale(1);transition:transform .4s cubic-bezier(.25,.8,.25,1);transform-origin:left top}[aria-required=true] .md2-autocomplete-placeholder::after{content:'*'}.md2-autocomplete-trigger.is-focused .md2-autocomplete-placeholder{color:#106cc8}.md2-autocomplete-trigger.is-focused .md2-autocomplete-placeholder,md2-autocomplete .md2-autocomplete-placeholder.has-value{transform:translate3d(0,6px,0) scale(.75)}.md2-autocomplete-trigger svg{position:absolute;right:0;top:0;display:block;height:100%;background:#fff;fill:currentColor;color:rgba(0,0,0,.54)}.md2-autocomplete-menu{position:absolute;left:0;top:100%;display:block;z-index:10;width:100%;margin:0;padding:8px 0;box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);max-height:256px;min-height:48px;overflow-y:auto;background:#fff}.md2-autocomplete-menu .md2-option{position:relative;display:block;color:#212121;cursor:pointer;width:auto;padding:0 16px;height:48px;line-height:48px;transition:background 150ms linear}.md2-autocomplete-menu .md2-option.focus,.md2-autocomplete-menu .md2-option:hover{background:#ededed}.md2-autocomplete-menu .md2-option .md2-text{width:auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:16px}.md2-autocomplete-menu .highlight{color:#737373} /*# sourceMappingURL=autocomplete.css.map */ "],
        providers: [MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
        host: {
            'role': 'autocomplete',
            '[id]': 'id',
            '[attr.aria-label]': 'placeholder',
            '[attr.aria-required]': 'required.toString()',
            '[attr.aria-disabled]': 'disabled.toString()',
            '[class.md2-autocomplete-disabled]': 'disabled',
        },
        encapsulation: ViewEncapsulation.None,
        exportAs: 'md2Autocomplete'
    }),
    __metadata$22("design:paramtypes", [ElementRef])
], Md2Autocomplete);

var __decorate$39 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Md2AutocompleteModule = class Md2AutocompleteModule {
};
Md2AutocompleteModule = __decorate$39([
    NgModule({
        imports: [CommonModule, FormsModule],
        exports: [Md2Autocomplete, HighlightPipe],
        declarations: [Md2Autocomplete, HighlightPipe],
    })
], Md2AutocompleteModule);

var __decorate$42 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$23 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class Chip {
    constructor(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
}
let nextId$2 = 0;
const MD2_CHIPS_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Md2Chips),
    multi: true
};
/** Change event object emitted by Md2Chips. */
class Md2ChipsChange {
}
let Md2Chips = class Md2Chips {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.tabindex = 0;
        this.addOnComma = true;
        this.addOnEnter = true;
        this.addOnPaste = true;
        this.addOnSpace = false;
        this.allowedPattern = /.+/;
        this.pasteSplitPattern = ',';
        this.placeholder = '';
        this.isAutoComplete = false;
        this.isRemovable = true;
        this.disabled = false;
        this.minChips = 0;
        this.maxChips = 10000;
        this.type = 'text';
        this.id = 'md2-chips-' + (++nextId$2);
        this.autocompleteItemText = 'text';
        this.autocompleteItemValue = 'value';
        this.textKey = 'text';
        this.valueKey = null;
        this.change = new EventEmitter();
        this._onChange = (value) => { };
        this._onTouched = () => { };
        this.chipItemList = [];
        this.inputValue = '';
        this.selectedChip = -1;
        this.inputFocused = false;
        this.autoCompleteFocued = false;
        this._value = '';
        this.isEmptyAutoComplete = true;
    }
    get element() {
        const elements = { root: this.elementRef.nativeElement, mainDiv: null, template: null };
        elements.mainDiv = elements.root.querySelector('.md2-chips-container');
        elements.template = elements.mainDiv.querySelector('.md2-template');
        return elements;
    }
    get value() { return this._value; }
    set value(value) { this.setValue(value); }
    /**
     * set value
     * @param value
     */
    set setValue(value) {
        if (value !== this._value) {
            this._value = value;
            this.chipItemList = [];
            if (value) {
                if (value && value.length && Array.isArray(value)) {
                    for (let i = 0; i < value.length; i++) {
                        this.chipItemList.push(new Chip(value[i], this.textKey, this.valueKey));
                    }
                }
            }
        }
        this._emitChangeEvent();
    }
    getFocusAutocomplete() {
        this._onTouched();
    }
    changeAutocomplete(value) {
        if (value) {
            this.addNewChip(value.value);
            this.item = null;
        }
    }
    ngAfterContentInit() {
        let elements = this.element;
        this.splitRegExp = new RegExp(this.pasteSplitPattern);
        if (elements.template) {
            this.templateHtmlString = elements.template.innerHTML;
        }
    }
    // check autocomplete input is empty or not
    valueupdate(evt) {
        this.isEmptyAutoComplete = evt ? false : true;
    }
    /**
     * input key listener
     * @param event
     */
    inputChanged(event) {
        let key = event.keyCode;
        switch (key) {
            // back space
            case BACKSPACE:
                this.backspaceEvent();
                break;
            // delete
            case DELETE:
                this.backspaceEvent();
                break;
            // left arrow
            case LEFT_ARROW:
                if (this.isAutoComplete && this.isEmptyAutoComplete) {
                    this.leftArrowKeyEvents();
                }
                else if (!this.isAutoComplete && !this.inputValue) {
                    this.leftArrowKeyEvents();
                }
                break;
            // right arrow
            case RIGHT_ARROW:
                if (this.isAutoComplete && this.isEmptyAutoComplete) {
                    this.rightArrowKeyEvents();
                }
                else if (!this.isAutoComplete && !this.inputValue) {
                    this.rightArrowKeyEvents();
                }
                break;
            // enter
            case ENTER:
                if (this.addOnEnter) {
                    this.addNewChip(this.inputValue);
                    event.preventDefault();
                }
                break;
            // comma
            case COMMA:
                if (this.addOnComma) {
                    this.addNewChip(this.inputValue);
                    event.preventDefault();
                }
                break;
            // space
            case SPACE:
                if (this.addOnSpace) {
                    this.addNewChip(this.inputValue);
                    event.preventDefault();
                }
                break;
            default:
                break;
        }
    }
    _handleFocus() {
        if (this.disabled) {
            return;
        }
        if (!this.isAutoComplete) {
            this.elementRef.nativeElement.querySelector('input.chip-input').focus();
        }
        else {
            this.autoCompleteFocued = true;
            this._onTouched();
        }
        this._resetSelected();
    }
    inputBlurred(event) {
        this.inputFocused = false;
        if (this.inputValue) {
            this.addNewChip(this.inputValue);
        }
        this._onTouched();
        this.addNewChip(this.inputValue);
    }
    inputFocus(event) {
        if (this.disabled) {
            return;
        }
        this.inputFocused = true;
    }
    inputPaste(event) {
        let clipboardData = event.clipboardData ||
            (event.originalEvent && event.originalEvent.clipboardData);
        let pastedString = clipboardData.getData('text/plain');
        let chips = this.addRegExpString(pastedString);
        let chipsToAdd = chips.filter((chip) => this._isValid(chip));
        this.addNewChip(chipsToAdd);
        setTimeout(() => this._resetInput());
    }
    leftArrowKeyEvents() {
        event.preventDefault();
        if (this.selectedChip) {
            if (this.selectedChip < 0) {
                this.selectedChip = this.chipItemList.length - 1;
            }
            else {
                this.selectedChip = this.selectedChip - 1;
            }
        }
    }
    rightArrowKeyEvents() {
        event.preventDefault();
        if (this.selectedChip != -1) {
            if (this.selectedChip >= this.chipItemList.length) {
                this.selectedChip = 0;
            }
            else {
                this.selectedChip = this.selectedChip + 1;
            }
        }
    }
    addRegExpString(chipInputString) {
        chipInputString = chipInputString.trim();
        let chips = chipInputString.split(this.splitRegExp);
        return chips.filter((chip) => !!chip);
    }
    _isValid(chipString) {
        let typeString = typeof chipString;
        if (typeString === 'string') {
            chipString = chipString.trim();
        }
        let isExist;
        isExist = this.chipItemList.filter((chip) => chip.text === chipString);
        if (this.chipItemList.indexOf(chipString) === -1 && (isExist.length ? false : true)) {
            return this.allowedPattern.test(chipString);
        }
    }
    /**
    * add new chip
    * @param chips
    */
    addNewChip(chips) {
        let validInput = this._isValid(chips);
        if (validInput) {
            if (this.maxChips && this.maxChips < this.chipItemList.length - 1) {
                return;
            }
            else {
                this.chipItemList.push(new Chip(chips, this.textKey, this.valueKey));
                this.item = null;
            }
        }
        this._resetSelected();
        this._resetInput();
        this.updateValue();
    }
    /**
   * remove selected chip
   * @param chipIndexToRemove index of selected chip
   */
    removeSelectedChip(chipIndexToRemove) {
        this.chipItemList.splice(chipIndexToRemove, 1);
        this._resetSelected();
        this.updateValue();
    }
    backspaceEvent() {
        if (!this.inputValue.length && this.chipItemList.length &&
            this.isRemovable && this.isEmptyAutoComplete) {
            if (this.selectedChip != -1) {
                this.removeSelectedChip(this.selectedChip);
                this.selectedChip = this.chipItemList.length - 1;
            }
            else {
                this.selectedChip = this.chipItemList.length - 1;
            }
        }
    }
    _resetSelected() {
        this.selectedChip = -1;
    }
    _resetInput() {
        if (this.isAutoComplete) {
            this.chipInputForm.controls['autocomplete'].setValue('');
        }
        else {
            this.chipInputForm.controls['chipInput'].setValue('');
        }
    }
    /**
     * update value
     */
    updateValue() {
        this._value = new Array();
        this._value = this.chipItemList.map((chip) => chip.value);
        this._emitChangeEvent();
    }
    /** Emits an event when the user selects a color. */
    _emitChangeEvent() {
        let event = new Md2ChipsChange();
        event.source = this;
        event.value = this._value;
        this._onChange(event.value);
        this.change.emit(event);
    }
    writeValue(value) {
        if (value !== this._value) {
            this._value = value;
            this.chipItemList = [];
            if (value) {
                if (value && value.length && Array.isArray(value)) {
                    for (let i = 0; i < value.length; i++) {
                        this.chipItemList.push(new Chip(value[i], this.textKey, this.valueKey));
                    }
                }
            }
        }
    }
    registerOnChange(fn) { this._onChange = fn; }
    registerOnTouched(fn) { this._onTouched = fn; }
};
__decorate$42([
    Input(),
    __metadata$23("design:type", Number)
], Md2Chips.prototype, "tabindex", void 0);
__decorate$42([
    Input(),
    __metadata$23("design:type", Boolean)
], Md2Chips.prototype, "addOnComma", void 0);
__decorate$42([
    Input(),
    __metadata$23("design:type", Boolean)
], Md2Chips.prototype, "addOnEnter", void 0);
__decorate$42([
    Input(),
    __metadata$23("design:type", Boolean)
], Md2Chips.prototype, "addOnPaste", void 0);
__decorate$42([
    Input(),
    __metadata$23("design:type", Boolean)
], Md2Chips.prototype, "addOnSpace", void 0);
__decorate$42([
    Input(),
    __metadata$23("design:type", RegExp)
], Md2Chips.prototype, "allowedPattern", void 0);
__decorate$42([
    Input(),
    __metadata$23("design:type", Array)
], Md2Chips.prototype, "ngModel", void 0);
__decorate$42([
    Input(),
    __metadata$23("design:type", String)
], Md2Chips.prototype, "pasteSplitPattern", void 0);
__decorate$42([
    Input(),
    __metadata$23("design:type", String)
], Md2Chips.prototype, "placeholder", void 0);
__decorate$42([
    Input(),
    __metadata$23("design:type", Array)
], Md2Chips.prototype, "autocompleteDataList", void 0);
__decorate$42([
    Input(),
    __metadata$23("design:type", Boolean)
], Md2Chips.prototype, "isAutoComplete", void 0);
__decorate$42([
    Input(),
    __metadata$23("design:type", Boolean)
], Md2Chips.prototype, "isRemovable", void 0);
__decorate$42([
    Input(),
    __metadata$23("design:type", Boolean)
], Md2Chips.prototype, "disabled", void 0);
__decorate$42([
    Input(),
    __metadata$23("design:type", Number)
], Md2Chips.prototype, "minChips", void 0);
__decorate$42([
    Input(),
    __metadata$23("design:type", Number)
], Md2Chips.prototype, "maxChips", void 0);
__decorate$42([
    Input(),
    __metadata$23("design:type", String)
], Md2Chips.prototype, "type", void 0);
__decorate$42([
    Input(),
    __metadata$23("design:type", String)
], Md2Chips.prototype, "id", void 0);
__decorate$42([
    Input('autocomplete-item-text'),
    __metadata$23("design:type", String)
], Md2Chips.prototype, "autocompleteItemText", void 0);
__decorate$42([
    Input('autocomplete-item-value'),
    __metadata$23("design:type", String)
], Md2Chips.prototype, "autocompleteItemValue", void 0);
__decorate$42([
    Input('item-text'),
    __metadata$23("design:type", String)
], Md2Chips.prototype, "textKey", void 0);
__decorate$42([
    Input('item-value'),
    __metadata$23("design:type", String)
], Md2Chips.prototype, "valueKey", void 0);
__decorate$42([
    Output(),
    __metadata$23("design:type", EventEmitter)
], Md2Chips.prototype, "change", void 0);
__decorate$42([
    ViewChild('chipInputForm'),
    __metadata$23("design:type", NgForm)
], Md2Chips.prototype, "chipInputForm", void 0);
__decorate$42([
    Input(),
    __metadata$23("design:type", Object),
    __metadata$23("design:paramtypes", [Object])
], Md2Chips.prototype, "value", null);
__decorate$42([
    HostListener('focus'),
    __metadata$23("design:type", Function),
    __metadata$23("design:paramtypes", []),
    __metadata$23("design:returntype", void 0)
], Md2Chips.prototype, "_handleFocus", null);
Md2Chips = __decorate$42([
    Component({
        selector: 'md2-chips',
        template: "<div class=\"md2-chips-container\" [class.md2-chip-disabled]=\"disabled\" [class.md2-chip-remove]=\"!isRemovable\"><span *ngFor=\"let chip of chipItemList; let i = index\" class=\"md2-chip\" [class.active]=\"selectedChip === i\"><span>{{chip.text}}</span> <span [innerHTML]=\"templateHtmlString\"></span> <svg (click)=\"removeSelectedChip(i)\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" *ngIf=\"isRemovable\"><path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/></svg></span><ng-content select=\".md2-template\"></ng-content><form #chipInputForm=\"ngForm\" class=\"chip-input-form\"><input *ngIf=\"!isAutoComplete\" class=\"chip-input\" [disabled]=\"disabled\" [type]=\"type\" [(ngModel)]=\"inputValue\" name=\"chipInput\" [placeholder]=\"placeholder\" (paste)=\"inputPaste($event)\" (keydown)=\"inputChanged($event)\" (blur)=\"inputBlurred($event)\" (focus)=\"inputFocus()\"><div *ngIf=\"isAutoComplete\"><md2-autocomplete [items]=\"autocompleteDataList\" [item-text]=\"autocompleteItemText\" [(ngModel)]=\"item\" name=\"autocomplete\" [disabled]=\"disabled\" (textChange)=\"valueupdate($event)\" (change)=\"changeAutocomplete($event)\" [placeholder]=\"placeholder\" (keydown)=\"inputChanged($event)\" (click)=\"getFocusAutocomplete()\"></md2-autocomplete></div></form></div><div class=\"chip-error\" *ngIf=\"this.chipItemList.length<this.minChips\">Minimum {{minChips}} chip required.</div><div class=\"chip-error\" *ngIf=\"this.chipItemList.length>=this.maxChips\">You are able to add Maximum {{maxChips}} chip.</div>",
        styles: [".template-content{display:inline}md2-chips{outline:0}md2-chips .md2-chips-container{display:block;box-shadow:0 1px #ccc;padding:5px 0;margin-bottom:10px;min-height:50px;box-sizing:border-box;clear:both}md2-chips .md2-chips-container::after{clear:both;content:'';display:table}md2-chips.chip-input-focus .md2-chips-container{box-shadow:0 2px #0d8bff}md2-chips .md2-chip-disabled{cursor:default}md2-chips md2-autocomplete{margin:0}md2-chips .md2-autocomplete-wrap{border-bottom:0!important}.md2-chip-remove .md2-chip{padding:0 12px}.md2-chip{font-size:14px;position:relative;cursor:default;border-radius:16px;display:block;height:32px;line-height:32px;margin:8px 8px 0 0;padding:0 28px 0 12px;float:left;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;max-width:100%;background:#e0e0e0;color:#424242;white-space:nowrap;overflow:hidden;-ms-text-overflow:ellipsis;-o-text-overflow:ellipsis;text-overflow:ellipsis}.md2-chip.active{color:#fff;background:#0d8bff}.md2-chip.active svg{color:rgba(255,255,255,.87)}.md2-chip svg{position:absolute;top:4px;right:4px;cursor:pointer;display:inline-block;overflow:hidden;fill:currentColor;color:rgba(0,0,0,.54)}.md2-template{display:none}.chip-input-disabled{pointer-events:none;cursor:default}.chip-input-form{display:inline-block;height:32px;margin:8px 8px 0 0}.chip-remove{cursor:pointer;display:inline-block;padding:0 3px;color:#616161;font-size:30px;vertical-align:top;line-height:21px;font-family:serif}.chip-input{display:inline-block;width:auto;border:0;outline:0;height:32px;line-height:32px;font-size:16px;background:0 0}.chip-error{font-size:13px;color:#fd0f0f}.md2-chips-container .chip-input-form .md2-autocomplete-wrap{border-bottom:0}.md2-chips-container .md2-autocomplete-wrap.is-focused .md2-autocomplete-placeholder{display:none}.md2-chips-container .md2-autocomplete-wrap .md2-autocomplete-placeholder.has-value{display:none}.md2-chips-container .md2-autocomplete-wrap svg{display:none}.md2-chips-container .md2-autocomplete-wrap .md2-autocomplete-input{height:32px;font-size:16px} /*# sourceMappingURL=chips.css.map */ "],
        providers: [MD2_CHIPS_CONTROL_VALUE_ACCESSOR],
        host: {
            'role': 'chips',
            '[id]': 'id',
            '[tabindex]': 'disabled ? -1 : tabindex',
            '[class.chip-input-focus]': 'inputFocused || selectedChip >= 0',
        },
        encapsulation: ViewEncapsulation.None
    }),
    __metadata$23("design:paramtypes", [ElementRef])
], Md2Chips);
const MD2_CHIPS_DIRECTIVES = [Md2Chips];
let Md2ChipsModule = class Md2ChipsModule {
};
Md2ChipsModule = __decorate$42([
    NgModule({
        imports: [CommonModule, FormsModule, Md2AutocompleteModule],
        declarations: MD2_CHIPS_DIRECTIVES,
        exports: MD2_CHIPS_DIRECTIVES
    })
], Md2ChipsModule);

//# sourceMappingURL=index.js.map

var __decorate$44 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$24 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let Md2Collapse = class Md2Collapse {
    constructor() {
        this._collapse = true;
        this._collapsing = false;
        this.collapsed = new EventEmitter();
        this.expanded = new EventEmitter();
    }
    get collapse() { return this._collapse; }
    set collapse(value) {
        this._collapse = value;
        this.toggle();
    }
    /**
     * toggle collapse
     */
    toggle() {
        if (this._collapse) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    /**
    * show collapse
    */
    show() {
        this._collapsing = true;
        this._collapse = true;
        setTimeout(() => {
            this._collapsing = false;
        }, 4);
        this.expanded.emit();
    }
    /**
     * hide collapse
     */
    hide() {
        this._collapsing = true;
        this._collapse = false;
        setTimeout(() => {
            this._collapsing = false;
        }, 4);
        this.collapsed.emit();
    }
};
__decorate$44([
    Output(),
    __metadata$24("design:type", EventEmitter)
], Md2Collapse.prototype, "collapsed", void 0);
__decorate$44([
    Output(),
    __metadata$24("design:type", EventEmitter)
], Md2Collapse.prototype, "expanded", void 0);
__decorate$44([
    Input(),
    __metadata$24("design:type", Boolean),
    __metadata$24("design:paramtypes", [Boolean])
], Md2Collapse.prototype, "collapse", null);
Md2Collapse = __decorate$44([
    Directive({
        selector: '[collapse]',
        host: {
            'role': 'collapse',
            '[class.in]': '_collapse',
            '[class.collapse]': 'true',
            '[class.collapsing]': '_collapsing',
            '[attr.aria-expanded]': '_collapse',
            '[attr.aria-hidden]': '!_collapse'
        },
        exportAs: 'md2Collapse'
    })
], Md2Collapse);

var __decorate$43 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Md2CollapseModule = class Md2CollapseModule {
};
Md2CollapseModule = __decorate$43([
    NgModule({
        imports: [CommonModule],
        exports: [Md2Collapse],
        declarations: [Md2Collapse],
    })
], Md2CollapseModule);

var __decorate$46 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const COLOR_RGB = /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/;
const COLOR_HSL = /(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/;
let ColorUtil = class ColorUtil {
    /**
  * hsla to hsva
  * @param hsla
  */
    hsla2hsva(hsla) {
        let h = Math.min(hsla.h, 1), s = Math.min(hsla.s, 1), l = Math.min(hsla.l, 1);
        let a = Math.min(hsla.a, 1);
        if (l === 0) {
            return { h: h, s: 0, v: 0, a: a };
        }
        else {
            let v = l + s * (1 - Math.abs(2 * l - 1)) / 2;
            return { h: h, s: 2 * (v - l) / v, v: v, a: a };
        }
    }
    /**
    * hsva to hsla
    * @param hsva
    */
    hsva2hsla(hsva) {
        let h = hsva.h, s = hsva.s, v = hsva.v, a = hsva.a;
        if (v === 0) {
            return new Hsla(h, 0, 0, a);
        }
        else if (s === 0 && v === 1) {
            return new Hsla(h, 1, 1, a);
        }
        else {
            let l = v * (2 - s) / 2;
            return new Hsla(h, v * s / (1 - Math.abs(2 * l - 1)), l, a);
        }
    }
    /**
     * rgba to hsva
     * @param rgba
     */
    rgbaToHsva(rgba) {
        let r = Math.min(rgba.r, 1), g = Math.min(rgba.g, 1), b = Math.min(rgba.b, 1);
        let a = Math.min(rgba.a, 1);
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, v = max;
        let d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max === min) {
            h = 0;
        }
        else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return new Hsva(h, s, v, a);
    }
    /**
     * hsva to rgba
     * @param hsva
     */
    hsvaToRgba(hsva) {
        let h = hsva.h, s = hsva.s, v = hsva.v, a = hsva.a;
        let r, g, b;
        let i = Math.floor(h * 6);
        let f = h * 6 - i;
        let p = v * (1 - s);
        let q = v * (1 - f * s);
        let t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
        }
        return new Rgba(r, g, b, a);
    }
    /**
     * string to hsva
     * @param colorString
     */
    stringToHsva(colorString) {
        let stringParsers = [
            {
                re: COLOR_RGB,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[2]) / 255, parseInt(execResult[3]) / 255, parseInt(execResult[4]) / 255, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            },
            {
                re: COLOR_HSL,
                parse: function (execResult) {
                    return new Hsla(parseInt(execResult[2]) / 360, parseInt(execResult[3]) / 100, parseInt(execResult[4]) / 100, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            },
            {
                re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[1], 16) / 255, parseInt(execResult[2], 16) / 255, parseInt(execResult[3], 16) / 255, 1);
                }
            },
            {
                re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[1] + execResult[1], 16) / 255, parseInt(execResult[2] + execResult[2], 16) / 255, parseInt(execResult[3] + execResult[3], 16) / 255, 1);
                }
            }
        ];
        colorString = colorString.toLowerCase();
        let hsva = null;
        for (let key in stringParsers) {
            if (stringParsers.hasOwnProperty(key)) {
                let parser = stringParsers[key];
                let match = parser.re.exec(colorString);
                let color = match && parser.parse(match);
                if (color) {
                    if (color instanceof Rgba) {
                        hsva = this.rgbaToHsva(color);
                    }
                    else if (color instanceof Hsla) {
                        hsva = this.hsla2hsva(color);
                    }
                    return hsva;
                }
            }
        }
        return hsva;
    }
    /**
     * output formate of color
     * @param hsva
     * @param outputFormat
     */
    outputFormat(hsva, outputFormat) {
        if (hsva.a < 1) {
            switch (outputFormat) {
                case 'hsl':
                    let hsla = this.hsva2hsla(hsva);
                    let hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                    return 'hsla(' + hslaText.h + ',' + hslaText.s + '%,' +
                        hslaText.l + '%,' + hslaText.a + ')';
                default:
                    let rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
                    return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b +
                        ',' + Math.round(rgba.a * 100) / 100 + ')';
            }
        }
        else {
            switch (outputFormat) {
                case 'hsl':
                    let hsla = this.hsva2hsla(hsva);
                    let hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                    return 'hsl(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%)';
                case 'rgb':
                    let rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
                    return 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
                default:
                    return this.hexText(this.denormalizeRGBA(this.hsvaToRgba(hsva)));
            }
        }
    }
    hexText(rgba) {
        let mainText = ((1 << 24) | (rgba.r << 16) | (rgba.g << 8) | rgba.b).toString(16);
        let hexText = '#' + mainText.substr(1);
        return hexText.toLowerCase();
    }
    denormalizeRGBA(rgba) {
        return new Rgba(Math.round(rgba.r * 255), Math.round(rgba.g * 255), Math.round(rgba.b * 255), rgba.a);
    }
};
ColorUtil = __decorate$46([
    Injectable()
], ColorUtil);

var __decorate$45 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$25 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$6 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
let nextId$3 = 0;
let TextDirective = class TextDirective {
    constructor() {
        this.newValue = new EventEmitter();
    }
    changeInput(event) {
        event.stopPropagation();
        event.preventDefault();
        let value = event.target.value;
        if (this.rg === undefined) {
            this.newValue.emit(value);
        }
        else {
            let numeric = parseFloat(value);
            if (!isNaN(numeric) && numeric >= 0 && numeric <= this.rg) {
                this.newValue.emit({ v: numeric, rg: this.rg });
            }
        }
    }
};
__decorate$45([
    Output('newValue'),
    __metadata$25("design:type", Object)
], TextDirective.prototype, "newValue", void 0);
__decorate$45([
    Input('text'),
    __metadata$25("design:type", Object)
], TextDirective.prototype, "text", void 0);
__decorate$45([
    Input('rg'),
    __metadata$25("design:type", Number)
], TextDirective.prototype, "rg", void 0);
TextDirective = __decorate$45([
    Directive({
        selector: '[text]',
        host: {
            '(input)': 'changeInput($event)'
        }
    })
], TextDirective);
let ColorpickerSliderDirective = class ColorpickerSliderDirective {
    constructor(_element) {
        this._element = _element;
        this.change = new EventEmitter();
        this.listenerMove = (event) => { this.move(event); };
        this.listenerStop = () => { this.stop(); };
    }
    /**
     * set cursor position
     * @param event
     */
    setCursor(event) {
        let height = this._getNativeElement().offsetHeight;
        let width = this._getNativeElement().offsetWidth;
        let x = Math.max(0, Math.min(this.getX(event), width));
        let y = Math.max(0, Math.min(this.getY(event), height));
        if (this.pointX !== undefined && this.pointY !== undefined) {
            this.change.emit({
                s: x / width, v: (1 - y / height),
                pointX: this.pointX, pointY: this.pointY
            });
        }
        else if (this.pointX === undefined && this.pointY !== undefined) {
            this.change.emit({ v: y / height, rg: this.pointY });
        }
        else {
            this.change.emit({ v: x / width, rg: this.pointX });
        }
    }
    /**
     * input event listner
     * @param event
     */
    move(event) {
        event.preventDefault();
        this.setCursor(event);
    }
    /**
     * input event listner
     * @param event
     */
    start(event) {
        this.setCursor(event);
        document.addEventListener('mousemove', this.listenerMove);
        document.addEventListener('touchmove', this.listenerMove);
        document.addEventListener('mouseup', this.listenerStop);
        document.addEventListener('touchend', this.listenerStop);
    }
    /**
     * stop mouse event
     */
    stop() {
        document.removeEventListener('mousemove', this.listenerMove);
        document.removeEventListener('touchmove', this.listenerMove);
        document.removeEventListener('mouseup', this.listenerStop);
        document.removeEventListener('touchend', this.listenerStop);
    }
    /**
     * get x
     * @param event
     */
    getX(event) {
        let boundingClientRect = this._getNativeElement().getBoundingClientRect();
        return (event.pageX !== undefined ? event.pageX : event.touches[0].pageX) -
            boundingClientRect.left - window.pageXOffset;
    }
    /**
     * get y
     * @param event
     */
    getY(event) {
        let boundingClientRect = this._getNativeElement().getBoundingClientRect();
        return (event.pageY !== undefined ? event.pageY : event.touches[0].pageY) -
            boundingClientRect.top - window.pageYOffset;
    }
    _getNativeElement() {
        return this._element.nativeElement;
    }
};
__decorate$45([
    Input('colorpicker-slider'),
    __metadata$25("design:type", String)
], ColorpickerSliderDirective.prototype, "slider", void 0);
__decorate$45([
    Input('point-x'),
    __metadata$25("design:type", Number)
], ColorpickerSliderDirective.prototype, "pointX", void 0);
__decorate$45([
    Input('point-y'),
    __metadata$25("design:type", Number)
], ColorpickerSliderDirective.prototype, "pointY", void 0);
__decorate$45([
    Output('change'),
    __metadata$25("design:type", Object)
], ColorpickerSliderDirective.prototype, "change", void 0);
ColorpickerSliderDirective = __decorate$45([
    Directive({
        selector: '[colorpicker-slider]',
        host: {
            '(mousedown)': 'start($event)',
            '(touchstart)': 'start($event)'
        }
    }),
    __metadata$25("design:paramtypes", [ElementRef])
], ColorpickerSliderDirective);
/**
 * Change event object emitted by Md2Colorpicker.
 */
class Md2ColorChange {
    constructor(source, color) {
        this.source = source;
        this.color = color;
    }
}
let Md2Colorpicker = class Md2Colorpicker {
    constructor(_element, _overlay, _viewContainerRef, _renderer, _scrollDispatcher, _util, _control) {
        this._element = _element;
        this._overlay = _overlay;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._scrollDispatcher = _scrollDispatcher;
        this._util = _util;
        this._control = _control;
        this._innerValue = '';
        this.backColor = true;
        this._defalutColor = '#000000';
        /** Whether or not the overlay panel is open. */
        this._panelOpen = false;
        this._color = null;
        /** Whether filling out the select is required in the form.  */
        this._required = false;
        /** Whether the select is disabled.  */
        this._disabled = false;
        this.isInputFocus = false;
        this._container = 'inline';
        this.isInputValidColor = false;
        this._onChange = (value) => { };
        this._onTouched = () => { };
        this.cFormat = 'hex';
        this.colorpickerChange = new EventEmitter();
        /** Event emitted when the selected date has been changed by the user. */
        this.change = new EventEmitter();
        this.tabindex = 0;
        this.id = 'md2-colorpicker-' + (++nextId$3);
        /** Event emitted when the select has been opened. */
        this.onOpen = new EventEmitter();
        /** Event emitted when the select has been closed. */
        this.onClose = new EventEmitter();
        this._created = false;
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }
    get color() { return this._color; }
    set color(value) { this._color = value; }
    /** Placeholder to be shown if no value has been selected. */
    get placeholder() { return this._placeholder; }
    set placeholder(value) { this._placeholder = value; }
    get required() { return this._required; }
    set required(value) { this._required = coerceBooleanProperty(value); }
    /** Whether the component is disabled. */
    get disabled() { return this._disabled; }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get value() {
        return this._innerValue;
    }
    /**
    * set accessor including call the onchange callback
    */
    set value(v) {
        if (v !== this._innerValue) {
            if (v) {
                this.hsva = this._util.stringToHsva(v);
            }
            this._innerValue = v;
        }
    }
    get container() { return this._container; }
    set container(value) {
        if (this._container !== value) {
            this._container = value || 'inline';
            this.destroyPanel();
        }
    }
    get setGradient() {
        return {
            'background-image': 'linear-gradient(to right, transparent, transparent),' +
                'linear-gradient(to left, ' + this.hexText + ', rgba(255, 255, 255, 0))'
        };
    }
    ngOnDestroy() { this.destroyPanel(); }
    /** Whether or not the overlay panel is open. */
    get panelOpen() {
        return this._panelOpen;
    }
    /** Toggles the overlay panel open or closed. */
    toggle() {
        this.panelOpen ? this.close() : this.open();
    }
    /** Opens the overlay panel. */
    open() {
        let hsva = this._util.stringToHsva(this.color + '');
        this.isInputFocus = true;
        if (hsva) {
            this.hsva = hsva;
        }
        else {
            this.hsva = this._util.stringToHsva(this._defalutColor);
        }
        this.sliderDim = new SliderDimension(245, 250, 130, 245);
        this.slider = new SliderPosition(0, 0, 0, 0);
        if (this.cFormat === 'rgb') {
            this.format = 1;
        }
        else if (this.cFormat === 'hsl') {
            this.format = 2;
        }
        else {
            this.format = 0;
        }
        this.update();
        if (this.disabled) {
            return;
        }
        if (!this._isColorpickerVisible) {
            this._initialColor = this.color;
            this.update();
            this._isColorpickerVisible = true;
        }
        else {
            this._isColorpickerVisible = false;
        }
        this._createOverlay();
        if (!this._portal) {
            this._portal = new TemplatePortal(this._templatePortal, this._viewContainerRef);
        }
        this._overlayRef.attach(this._portal);
        this._subscribeToBackdrop();
        this._panelOpen = true;
        this.onOpen.emit();
    }
    /** Closes the overlay panel and focuses the host element. */
    close() {
        this._panelOpen = false;
        this.isInputFocus = false;
        if (this._overlayRef) {
            this._overlayRef.detach();
            this._backdropSubscription.unsubscribe();
        }
        this._isColorpickerVisible = false;
        if (this._innerValue) {
            this.setColorFromString(this._innerValue);
        }
    }
    /** Removes the panel from the DOM. */
    destroyPanel() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._cleanUpSubscriptions();
        }
    }
    _handleKeydown(event) {
        if (this.disabled) {
            return;
        }
    }
    _onFocus() {
    }
    _onBlur() {
        if (!this.panelOpen) {
            this._onTouched();
        }
    }
    /**
      * input event listner
      * @param event
      */
    changeInput(event) {
        let value = event.target.value;
        this.colorpickerChange.emit(value);
    }
    /**
    * set saturation,lightness,hue,alpha,RGB value
    * @param val
    * @param rg
    */
    setSaturation(val) {
        let hsla = this._util.hsva2hsla(this.hsva);
        hsla.s = val.v / val.rg;
        this.hsva = this._util.hsla2hsva(hsla);
        this.update();
    }
    setLightness(val) {
        let hsla = this._util.hsva2hsla(this.hsva);
        hsla.l = val.v / val.rg;
        this.hsva = this._util.hsla2hsva(hsla);
        this.update();
    }
    setHue(val) {
        this.hsva.h = val.v / val.rg;
        this.update();
    }
    setAlpha(val) {
        this.hsva.a = val.v / val.rg;
        this.update();
    }
    setR(val) {
        let rgba = this._util.hsvaToRgba(this.hsva);
        rgba.r = val.v / val.rg;
        this.hsva = this._util.rgbaToHsva(rgba);
        this.update();
    }
    setG(val) {
        let rgba = this._util.hsvaToRgba(this.hsva);
        rgba.g = val.v / val.rg;
        this.hsva = this._util.rgbaToHsva(rgba);
        this.update();
    }
    setB(val) {
        let rgba = this._util.hsvaToRgba(this.hsva);
        rgba.b = val.v / val.rg;
        this.hsva = this._util.rgbaToHsva(rgba);
        this.update();
    }
    setSaturationAndBrightness(val) {
        this.hsva.s = val.s / val.pointX;
        this.hsva.v = val.v / val.pointY;
        this.update();
    }
    clickOk() {
        this._isColorpickerVisible = false;
        this.isInputValidColor = false;
        this.color = this._innerValue;
        if (this._innerValue != this._initialColor) {
            this._emitChangeEvent();
        }
        this.close();
    }
    /**
    * deselect recent color and close popup
    */
    cancelColor() {
        this._innerValue = this._initialColor;
        this.close();
    }
    isValidColor(str) {
        return str.match(/^#[a-f0-9]{6}$/i) !== null;
    }
    /**
       * set color
       * @param value
       */
    setColorFromString(value) {
        if (!this.isValidColor(value)) {
            value = '#000000';
            this.backColor = false;
        }
        let hsva = this._util.stringToHsva(value);
        if (hsva !== null) {
            this.hsva = hsva;
        }
        this.update();
    }
    formatPolicy(value) {
        this.format = value;
        if (this.format === 0 && this.hsva.a < 1) {
            this.format++;
        }
        return this.format;
    }
    /**
     * update color
     */
    update() {
        let hsla = this._util.hsva2hsla(this.hsva);
        let rgba = this._util.denormalizeRGBA(this._util.hsvaToRgba(this.hsva));
        let hueRgba = this._util.denormalizeRGBA(this._util.hsvaToRgba(new Hsva(this.hsva.h, 1, 1, 1)));
        this.alphaColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
        this._hueSliderColor = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';
        this.hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
        this.rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
        if (this.backColor) {
            this.hexText = this._util.hexText(rgba);
        }
        this.backColor = true;
        let colorCode = Math.round((this.rgbaText.r * 299 + this.rgbaText.g * 587 +
            this.rgbaText.b * 114) / 1000);
        if (colorCode >= 128 || this.hsva.a < 0.35) {
            this.fontColor = 'black';
            this._isDark = true;
        }
        else {
            this.fontColor = 'white';
            this._isDark = false;
        }
        if (this.format === 0 && this.hsva.a < 1) {
            this.format++;
        }
        this.outputColor = this._util.outputFormat(this.hsva, this.cFormat);
        this.slider = new SliderPosition((this.hsva.h) * this.sliderDim.h, this.hsva.s * this.sliderDim.s - 7, (1 - this.hsva.v) * this.sliderDim.v - 7, this.hsva.a * this.sliderDim.a);
        this._innerValue = this.outputColor;
    }
    clearColor(event) {
        event.stopPropagation();
        this.color = '';
        this._emitChangeEvent();
    }
    isDescendant(parent, child) {
        let node = child.parentNode;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }
    checkInputVal(event) {
        this.hsva = this._util.stringToHsva(this.color + '');
        this.isInputFocus = false;
        if (this.hsva) {
            if (this._innerValue !== this.color) {
                this._emitChangeEvent();
            }
            this.isInputValidColor = false;
        }
        else {
            this.isInputValidColor = true;
        }
        this._onTouched();
    }
    /** Emits an event when the user selects a color. */
    _emitChangeEvent() {
        this._onChange(this.color);
        this.change.emit(new Md2ColorChange(this, this.color));
        this._innerValue = this.color;
    }
    writeValue(value) {
        this._innerValue = value;
        this.color = value;
    }
    registerOnChange(fn) { this._onChange = fn; }
    registerOnTouched(fn) { this._onTouched = fn; }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    _subscribeToBackdrop() {
        this._backdropSubscription = this._overlayRef.backdropClick().subscribe(() => {
            this._innerValue = this._initialColor;
            this.close();
        });
    }
    /**
     *  This method creates the overlay from the provided panel's template and saves its
     *  OverlayRef so that it can be attached to the DOM when open is called.
     */
    _createOverlay() {
        if (!this._overlayRef) {
            let config = new OverlayState();
            if (this.container === 'inline') {
                config.positionStrategy = this._createPickerPositionStrategy();
                config.hasBackdrop = true;
                config.backdropClass = 'cdk-overlay-transparent-backdrop';
                config.scrollStrategy = new RepositionScrollStrategy(this._scrollDispatcher);
            }
            else {
                config.positionStrategy = this._overlay.position()
                    .global()
                    .centerHorizontally()
                    .centerVertically();
                config.hasBackdrop = true;
            }
            this._overlayRef = this._overlay.create(config);
        }
    }
    /** Create the popup PositionStrategy. */
    _createPickerPositionStrategy() {
        return this._overlay.position()
            .connectedTo(this._element, { originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' })
            .withFallbackPosition({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'top' })
            .withFallbackPosition({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'bottom' })
            .withFallbackPosition({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'bottom' });
    }
    _cleanUpSubscriptions() {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
        if (this._positionSubscription) {
            this._positionSubscription.unsubscribe();
        }
    }
};
__decorate$45([
    Input(),
    __metadata$25("design:type", Object),
    __metadata$25("design:paramtypes", [String])
], Md2Colorpicker.prototype, "color", null);
__decorate$45([
    Input(),
    __metadata$25("design:type", Object),
    __metadata$25("design:paramtypes", [String])
], Md2Colorpicker.prototype, "placeholder", null);
__decorate$45([
    Input(),
    __metadata$25("design:type", Boolean),
    __metadata$25("design:paramtypes", [Object])
], Md2Colorpicker.prototype, "required", null);
__decorate$45([
    Input(),
    __metadata$25("design:type", Object),
    __metadata$25("design:paramtypes", [Object])
], Md2Colorpicker.prototype, "disabled", null);
__decorate$45([
    Input('format'),
    __metadata$25("design:type", String)
], Md2Colorpicker.prototype, "cFormat", void 0);
__decorate$45([
    Output('colorpickerChange'),
    __metadata$25("design:type", Object)
], Md2Colorpicker.prototype, "colorpickerChange", void 0);
__decorate$45([
    Output(),
    __metadata$25("design:type", EventEmitter)
], Md2Colorpicker.prototype, "change", void 0);
__decorate$45([
    Input(),
    __metadata$25("design:type", Number)
], Md2Colorpicker.prototype, "tabindex", void 0);
__decorate$45([
    Input(),
    __metadata$25("design:type", String)
], Md2Colorpicker.prototype, "id", void 0);
__decorate$45([
    Input(),
    __metadata$25("design:type", Object),
    __metadata$25("design:paramtypes", [String])
], Md2Colorpicker.prototype, "container", null);
__decorate$45([
    Output(),
    __metadata$25("design:type", EventEmitter)
], Md2Colorpicker.prototype, "onOpen", void 0);
__decorate$45([
    Output(),
    __metadata$25("design:type", EventEmitter)
], Md2Colorpicker.prototype, "onClose", void 0);
__decorate$45([
    ViewChild('portal'),
    __metadata$25("design:type", TemplateRef)
], Md2Colorpicker.prototype, "_templatePortal", void 0);
Md2Colorpicker = __decorate$45([
    Component({selector: 'md2-colorpicker',
        template: "<div class=\"md2-colorpicker-trigger\"><div class=\"color-picker-selector\" [class.color-error]=\"isInputValidColor && required\"><div class=\"md2-colorpicker-preview\" (click)=\"toggle()\"><div class=\"color-fill\" [style.background-color]=\"color\"></div></div><div class=\"md2-colorpicker-input\" [class.input-focused]=\"isInputFocus\"><span class=\"md2-colorpicker-placeholder\" [class.has-value]=\"color\">{{ placeholder }}</span> <input class=\"md2-colorpicker-value\" autocomplete=\"off\" value=\"color\" [tabindex]=\"tabindex\" [disabled]=\"disabled\" [(ngModel)]=\"color\" (focus)=\"isInputFocus=true\" (blur)=\"checkInputVal($event)\"> <span *ngIf=\"color && !required && !disabled\" class=\"color-clear\" (click)=\"clearColor($event)\"><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\"><path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/></svg></span></div></div></div><ng-template #portal><div class=\"md2-colorpicker-panel\" tabindex=\"0\" [attr.container]=\"container\"><div class=\"md2-colorpicker-content\"><div class=\"md2-colorpicker-wrapper\"><div class=\"md2-color-picker\"><div class=\"selected-color\"><div class=\"selected-color-bg\" [style.background]=\"outputColor\"><div class=\"color-input\"><div [hidden]=\"format!=2\" class=\"hsla-text\"><input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"360\" [rg]=\"360\" (newValue)=\"setHue($event)\" [value]=\"hslaText.h\"> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"100\" [rg]=\"100\" (newValue)=\"setSaturation($event)\" [value]=\"hslaText.s\"> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"100\" [rg]=\"100\" (newValue)=\"setLightness($event)\" [value]=\"hslaText.l\"> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]+([\.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\" [rg]=\"1\" (newValue)=\"setAlpha($event)\" [value]=\"hslaText.a\"></div><div [hidden]=\"format!=1\" class=\"rgba-text\"><input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setR($event)\" [value]=\"rgbaText.r\"> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setG($event)\" [value]=\"rgbaText.g\"> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setB($event)\" [value]=\"rgbaText.b\"> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]+([\.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\" [rg]=\"1\" (newValue)=\"setAlpha($event)\" [value]=\"rgbaText.a\"></div><div [hidden]=\"format!=0\" class=\"hex-text\"><input [text] (newValue)=\"setColorFromString($event)\" [style.color]=\"fontColor\" [value]=\"hexText\"></div></div><div class=\"color-bar\" [class.dark]=\"_isDark\"><div [style.color]=\"fontColor\" class=\"clearfix\"><div class=\"type-policy\" [class.active]=\"format==0\" (click)=\"formatPolicy(0)\">HEX</div><div class=\"type-policy\" [class.active]=\"format==1\" (click)=\"formatPolicy(1)\">RGBA</div><div class=\"type-policy\" [class.active]=\"format==2\" (click)=\"formatPolicy(2)\">HSLA</div></div></div></div></div><div class=\"input-color-content\"><div [colorpicker-slider] [style.background-color]=\"_hueSliderColor\" [point-x]=\"1\" [point-y]=\"1\" (change)=\"setSaturationAndBrightness($event)\" class=\"saturation-lightness\"><div [style.left.px]=\"slider.s\" [style.top.px]=\"slider.v\" class=\"cursor\"></div></div><div [colorpicker-slider] [point-x]=\"1\" (change)=\"setHue($event)\" class=\"hue\"><div [style.left.px]=\"slider.h\" class=\"color-picker-marker\"></div></div><div [colorpicker-slider] [point-x]=\"1\" (change)=\"setAlpha($event)\" class=\"alpha\"><div class=\"alpha-main\" [ngStyle]=\"setGradient\"><div [style.left.px]=\"slider.a\" class=\"color-picker-marker\"></div></div></div></div><div class=\"md2-color-picker-actions\"><div class=\"md2-button\" (click)=\"cancelColor()\">Cancel</div><div class=\"md2-button\" (click)=\"clickOk()\">Ok</div></div></div></div></div></div></ng-template>",
        styles: [".md2-colorpicker-wrapper{border-radius:3px;background-color:#fff;z-index:10;box-shadow:0 2px 6px rgba(0,0,0,.4);overflow:hidden}.md2-colorpicker-panel{outline:0;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.md2-colorpicker-panel[container=dialog]{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.md2-colorpicker-disabled{pointer-events:none;cursor:default}.md2-colorpicker-disabled .color-picker-selector .md2-colorpicker-value{color:rgba(0,0,0,.38);border-color:transparent;background-image:linear-gradient(to right,rgba(0,0,0,.38) 0,rgba(0,0,0,.38) 33%,transparent 0);background-position:bottom -1px left 0;background-size:4px 1px;background-repeat:repeat-x}.md2-colorpicker-input{color:rgba(0,0,0,.38);border-bottom:1px solid rgba(0,0,0,.12);display:flex;justify-content:space-between;align-items:center;height:30px;min-width:180px;line-height:22px;position:relative;box-sizing:border-box}[aria-disabled=true] .md2-colorpicker-input{background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;border-color:transparent;background-position:0 bottom;cursor:default}md2-colorpicker:focus:not(.md2-colorpicker-disabled) .md2-colorpicker-input{color:#106cc8;border-color:#106cc8}md2-colorpicker.ng-invalid.ng-touched:not(.md2-colorpicker-disabled) .md2-colorpicker-input{color:#f44336;border-color:#f44336}.input-focused{color:#106cc8;border-color:#106cc8}.inline-control{width:150px;margin-right:16px;padding:16px 0}.md2-colorpicker-placeholder{position:absolute;right:18px;bottom:100%;left:0;padding:0 2px;transform:translate3d(0,26px,0) scale(1);transform-origin:left top;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;transition:all 150ms cubic-bezier(.25,.8,.25,1)}[aria-required=true] .md2-colorpicker-placeholder::after{content:'*'}.md2-colorpicker-input.input-focused .md2-colorpicker-placeholder{color:#106cc8}.md2-colorpicker-input.input-focused .md2-colorpicker-placeholder,md2-colorpicker .md2-colorpicker-placeholder.has-value{transform:translate3d(0,6px,0) scale(.75)}.color-error .md2-colorpicker-input,.color-error .md2-colorpicker-placeholder{color:#f44336!important;border-color:#f44336}.color-error .color-fill{background-color:transparent!important}.color-picker-selector{display:block;padding:18px 0 4px 46px;white-space:nowrap}.color-picker-selector .md2-colorpicker-preview{position:absolute;top:19px;left:6px;content:'';width:24px;height:24px;overflow:hidden;background-color:#fff;background:linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd),linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd);background-size:8px 8px;background-position:0 0,4px 4px;border:2px solid #fafafa;display:block;fill:#5a5a5a;cursor:pointer;border-radius:50%;vertical-align:middle;box-shadow:0 1px 1px 0 rgba(0,0,0,.2),0 1px 1px 1px rgba(0,0,0,.14),0 1px 1px 1px rgba(0,0,0,.12)}.color-picker-selector .md2-colorpicker-preview .color-fill{width:100%;height:100%}.color-picker-selector .md2-colorpicker-value{font-size:15px;background:0 0;border:0;outline:0;position:relative;display:block;min-width:160px;height:30px;padding:2px 2px 1px;margin:0;line-height:26px;color:rgba(0,0,0,.87);vertical-align:middle;box-sizing:border-box}md2-colorpicker{position:relative;display:block;outline:0}.md2-color-picker{position:relative;display:block;width:266px;outline:0}.md2-color-picker *{box-sizing:border-box}.md2-color-picker .input-color-content{position:relative;padding:8px}.md2-color-picker i{cursor:default;position:relative}.md2-color-picker input{font-size:16px;height:50px;outline:0}.md2-color-picker div.cursor-sv{cursor:default;position:relative;border-radius:50%;width:15px;height:15px;border:#ddd solid 1px}.md2-color-picker div.cursor{cursor:crosshair;position:relative;border-radius:50%;width:13px;height:13px;box-shadow:0 0 2px 0 rgba(0,0,0,.5),inset 0 0 2px 0 rgba(0,0,0,.5);border:2px solid #fff}.md2-color-picker div.color-picker-marker{cursor:crosshair;position:relative;border:2px solid #fff;box-shadow:0 0 2px 0 rgba(0,0,0,.5);height:100%;width:5px;border-bottom:0;border-top:0}.md2-color-picker .saturation-lightness{width:100%;height:130px;border-radius:2px;overflow:hidden;background-image:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0))}.md2-color-picker .saturation-lightness:hover{cursor:crosshair}.md2-color-picker .hue{position:relative;width:100%;height:30px;margin:8px 0;border-radius:2px;background:linear-gradient(to right,red,#ff0,#0f0,#0ff,#00f,#f0f,red)}.md2-color-picker .alpha{position:relative;width:100%;height:30px;border-radius:2px;background:linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd),linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd);background-size:8px 8px;background-position:0 0,4px 4px}.md2-color-picker .alpha .alpha-main{position:absolute;height:100%;opacity:1;background-image:linear-gradient(to left,transparent,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));width:100%}.md2-color-picker .selected-color{position:relative;width:100%;height:75px;background-color:#fff;background:linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd),linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd);background-size:8px 8px;background-position:0 0,4px 4px}.md2-color-picker .selected-color .selected-color-bg{position:absolute;height:100%;opacity:1;width:100%}.md2-color-picker .selected-color .color-bar{position:absolute;width:100%;bottom:0}.md2-color-picker .selected-color .color-input{position:relative}.color-clear{color:rgba(0,0,0,.4);cursor:pointer}.color-clear svg{vertical-align:bottom;fill:#686868}.clearfix::after,.clearfix::before{content:' ';display:table}.clearfix::after{clear:both}.hex-text{width:100%}.hex-text input{width:100%;border:0;padding:4px;text-align:center;background:0 0}.hex-text div{text-align:center;float:left;clear:left;width:160px;margin-top:4px}.hsla-text,.rgba-text{text-align:center}.hsla-text input,.rgba-text input{width:50px;border:0;padding:4px 0;background:0 0;text-align:center}.hsla-text div,.rgba-text div{text-align:center;display:block}.hsla-text label,.rgba-text label{text-align:center;display:inline-block;font-size:15px}.md2-color-picker-actions{text-align:right}.md2-color-picker-actions .md2-button{display:inline-block;min-width:64px;margin:4px 8px 8px 0;padding:0 12px;font-size:14px;color:#106cc8;line-height:36px;text-align:center;text-transform:uppercase;border-radius:2px;cursor:pointer;box-sizing:border-box;transition:all 450ms cubic-bezier(.23,1,.32,1)}.md2-color-picker-actions .md2-button:hover{background:#ebebeb}.hsla-text div:nth-child(5),.rgba-text div:nth-child(5){clear:left}.type-policy{width:33.333333%;text-align:center;font-size:14px;display:inline-block;float:left;padding:4px 8px 3px;border-bottom:2px solid transparent;cursor:pointer;background:rgba(255,255,255,.25)}.dark .type-policy{background:rgba(0,0,0,.25)}.type-policy.active{border-color:rgba(255,255,255,.5);background:0 0}.dark .type-policy.active{border-color:rgba(0,0,0,.5)}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.6)} /*# sourceMappingURL=colorpicker.css.map */ "],
        host: {
            'role': 'colorpicker',
            '[id]': 'id',
            '[class.md2-colorpicker-disabled]': 'disabled',
            '[attr.aria-label]': 'placeholder',
            '[attr.aria-required]': 'required.toString()',
        },
        encapsulation: ViewEncapsulation.None
    }),
    __param$6(6, Self()), __param$6(6, Optional()),
    __metadata$25("design:paramtypes", [ElementRef, Overlay,
        ViewContainerRef, Renderer,
        ScrollDispatcher,
        ColorUtil, NgControl])
], Md2Colorpicker);
class Hsva {
    constructor(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
}
class Hsla {
    constructor(h, s, l, a) {
        this.h = h;
        this.s = s;
        this.l = l;
        this.a = a;
    }
}
class Rgba {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}
class SliderPosition {
    constructor(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
}
class SliderDimension {
    constructor(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
}
const MD2_COLORPICKER_DIRECTIVES = [
    Md2Colorpicker, ColorpickerSliderDirective, TextDirective
];
let Md2ColorpickerModule = class Md2ColorpickerModule {
};
Md2ColorpickerModule = __decorate$45([
    NgModule({
        declarations: MD2_COLORPICKER_DIRECTIVES,
        imports: [CommonModule, FormsModule, OverlayModule, PortalModule],
        exports: MD2_COLORPICKER_DIRECTIVES,
        providers: [ColorUtil]
    })
], Md2ColorpickerModule);

//# sourceMappingURL=index.js.map

var __decorate$51 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$29 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Boilerplate for applying mixins to Md2Optgroup.
class Md2OptgroupBase {
}
const _Md2OptgroupMixinBase = mixinDisabled(Md2OptgroupBase);
// Counter for unique group ids.
let nextId$4 = 0;
/**
 * Component that is used to group instances of `md2-option`.
 */
let Md2Optgroup = class Md2Optgroup extends _Md2OptgroupMixinBase {
    /**
     * Component that is used to group instances of `md2-option`.
     */
    constructor() {
        super(...arguments);
        /** Unique id for the underlying label. */
        this._labelId = `md2-optgroup-label-${nextId$4++}`;
    }
};
__decorate$51([
    Input(),
    __metadata$29("design:type", String)
], Md2Optgroup.prototype, "label", void 0);
Md2Optgroup = __decorate$51([
    Component({selector: 'md2-optgroup',
        template: "<label class=\"md2-optgroup-label\" [id]=\"_labelId\">{{ label }}</label><ng-content select=\"md2-option\"></ng-content>",
        styles: [".md2-optgroup-label{color:rgba(0,0,0,.54);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;user-select:none;cursor:default;font-weight:700;font-size:14px}.md2-optgroup-disabled .md2-optgroup-label{color:rgba(0,0,0,.38)} /*# sourceMappingURL=optgroup.css.map */ "],
        encapsulation: ViewEncapsulation.None,
        inputs: ['disabled'],
        host: {
            'class': 'md2-optgroup',
            'role': 'group',
            '[class.md2-optgroup-disabled]': 'disabled',
            '[attr.aria-disabled]': 'disabled.toString()',
            '[attr.aria-labelledby]': '_labelId',
        }
    })
], Md2Optgroup);

var __decorate$50 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$28 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$9 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueIdCounter$1 = 0;
/** Event object emitted by MdOption when selected or deselected. */
class Md2OptionSelectionChange {
    constructor(source, isUserInput = false) {
        this.source = source;
        this.isUserInput = isUserInput;
    }
}
/**
 * Single option inside of a `<md2-select>` element.
 */
let Md2Option = class Md2Option {
    constructor(group, _element) {
        this.group = group;
        this._element = _element;
        this._selected = false;
        this._active = false;
        /** Whether the option is disabled.  */
        this._disabled = false;
        this._id = `md2-option-${_uniqueIdCounter$1++}`;
        /** Whether the wrapping component is in multiple selection mode. */
        this.multiple = false;
        /** Event emitted when the option is selected or deselected. */
        this.onSelectionChange = new EventEmitter();
    }
    /** The unique ID of the option. */
    get id() { return this._id; }
    /** Whether or not the option is currently selected. */
    get selected() { return this._selected; }
    /** Whether the option is disabled. */
    get disabled() { return (this.group && this.group.disabled) || this._disabled; }
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     */
    get active() {
        return this._active;
    }
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     */
    get viewValue() {
        return this._getHostElement().textContent.trim();
    }
    /** Selects the option. */
    select() {
        this._selected = true;
        this._emitSelectionChangeEvent();
    }
    /** Deselects the option. */
    deselect() {
        this._selected = false;
        this._emitSelectionChangeEvent();
    }
    /** Sets focus onto this option. */
    focus() {
        this._getHostElement().focus();
    }
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setActiveStyles() {
        this._active = true;
    }
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setInactiveStyles() {
        this._active = false;
    }
    /** Ensures the option is selected when activated from the keyboard. */
    _handleKeydown(event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this._selectViaInteraction();
        }
    }
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     */
    _selectViaInteraction() {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this._emitSelectionChangeEvent(true);
        }
    }
    /** Returns the correct tabindex for the option depending on disabled state. */
    _getTabIndex() {
        return this.disabled ? '-1' : '0';
    }
    /** Fetches the host DOM element. */
    _getHostElement() {
        return this._element.nativeElement;
    }
    /** Emits the selection change event. */
    _emitSelectionChangeEvent(isUserInput = false) {
        this.onSelectionChange.emit(new Md2OptionSelectionChange(this, isUserInput));
    }
};
__decorate$50([
    Input(),
    __metadata$28("design:type", Object)
], Md2Option.prototype, "value", void 0);
__decorate$50([
    Input(),
    __metadata$28("design:type", Object),
    __metadata$28("design:paramtypes", [Object])
], Md2Option.prototype, "disabled", null);
__decorate$50([
    Output(),
    __metadata$28("design:type", Object)
], Md2Option.prototype, "onSelectionChange", void 0);
Md2Option = __decorate$50([
    Component({selector: 'md2-option',
        host: {
            'role': 'option',
            '[attr.tabindex]': '_getTabIndex()',
            '[class.md2-selected]': 'selected',
            '[class.md2-option-multiple]': 'multiple',
            '[class.md2-active]': 'active',
            '[id]': 'id',
            '[attr.aria-selected]': 'selected.toString()',
            '[attr.aria-disabled]': 'disabled.toString()',
            '[class.md2-option-disabled]': 'disabled',
            '(click)': '_selectViaInteraction()',
            '(keydown)': '_handleKeydown($event)',
            '[class.md2-option]': 'true',
        },
        template: '<ng-content></ng-content>',
        styles: [".md2-option{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;font-size:16px;font-family:Roboto,\"Helvetica Neue\",sans-serif;text-align:left;text-decoration:none;position:relative;font-family:inherit;cursor:pointer;outline:0}.md2-option[disabled]{cursor:default}[dir=rtl] .md2-option{text-align:right}.md2-option .mat-icon{margin-right:16px}[dir=rtl] .md2-option .mat-icon{margin-left:16px;margin-right:0}.md2-option[aria-disabled=true]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.md2-option:focus:not(.md2-option-disabled),.md2-option:hover:not(.md2-option-disabled){background:rgba(0,0,0,.04)}.md2-option.md2-selected{color:#106cc8}.md2-option.md2-selected:not(.md2-option-multiple){background:rgba(0,0,0,.04)}.md2-option.md2-active{background:rgba(0,0,0,.04);color:#106cc8}.md2-option.md2-option-disabled{color:rgba(0,0,0,.38)}.md2-option.md2-option-multiple{padding-left:40px}.md2-option.md2-option-multiple::after{content:'';position:absolute;top:50%;left:12px;display:block;width:16px;height:16px;margin-top:-8px;border:2px solid;border-radius:2px;box-sizing:border-box;transition:240ms}.md2-option.md2-option-multiple.md2-selected::after{transform:rotate(-45deg);height:8px;border-width:0 0 2px 2px}.md2-optgroup .md2-option:not(.md2-option-multiple){padding-left:32px} /*# sourceMappingURL=option.css.map */ "],
        encapsulation: ViewEncapsulation.None
    }),
    __param$9(0, Optional()),
    __metadata$28("design:paramtypes", [Md2Optgroup,
        ElementRef])
], Md2Option);
let Md2OptionModule = class Md2OptionModule {
};
Md2OptionModule = __decorate$50([
    NgModule({
        imports: [CommonModule, MdSelectionModule],
        exports: [Md2Option, Md2Optgroup],
        declarations: [Md2Option, Md2Optgroup]
    })
], Md2OptionModule);

/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 */
class ListKeyManager {
    constructor(_items) {
        this._items = _items;
        this._activeItemIndex = null;
        this._tabOut = new Subject();
        this._wrap = false;
    }
    /**
     * Turns on wrapping mode, which ensures that the active item will wrap to
     * the other end of list when there are no more items in the given direction.
     *
     * @returns The ListKeyManager that the method was called on.
     */
    withWrap() {
        this._wrap = true;
        return this;
    }
    /**
     * Sets the active item to the item at the index specified.
     *
     * @param index The index of the item to be set as active.
     */
    setActiveItem(index) {
        this._activeItemIndex = index;
        this._activeItem = this._items.toArray()[index];
    }
    /**
     * Sets the active item depending on the key event passed in.
     * @param event Keyboard event to be used for determining which element should be active.
     */
    onKeydown(event) {
        switch (event.keyCode) {
            case DOWN_ARROW:
                this.setNextItemActive();
                break;
            case UP_ARROW:
                this.setPreviousItemActive();
                break;
            case TAB:
                // Note that we shouldn't prevent the default action on tab.
                this._tabOut.next(null);
                return;
            default:
                return;
        }
        event.preventDefault();
    }
    /** Returns the index of the currently active item. */
    get activeItemIndex() {
        return this._activeItemIndex;
    }
    /** Returns the currently active item. */
    get activeItem() {
        return this._activeItem;
    }
    /** Sets the active item to the first enabled item in the list. */
    setFirstItemActive() {
        this._setActiveItemByIndex(0, 1);
    }
    /** Sets the active item to the last enabled item in the list. */
    setLastItemActive() {
        this._setActiveItemByIndex(this._items.length - 1, -1);
    }
    /** Sets the active item to the next enabled item in the list. */
    setNextItemActive() {
        this._activeItemIndex === null ? this.setFirstItemActive() : this._setActiveItemByDelta(1);
    }
    /** Sets the active item to a previous enabled item in the list. */
    setPreviousItemActive() {
        this._activeItemIndex === null && this._wrap ? this.setLastItemActive()
            : this._setActiveItemByDelta(-1);
    }
    /**
     * Allows setting of the activeItemIndex without any other effects.
     * @param index The new activeItemIndex.
     */
    updateActiveItemIndex(index) {
        this._activeItemIndex = index;
    }
    /**
     * Observable that emits any time the TAB key is pressed, so components can react
     * when focus is shifted off of the list.
     */
    get tabOut() {
        return this._tabOut.asObservable();
    }
    /**
     * This method sets the active item, given a list of items and the delta between the
     * currently active item and the new active item. It will calculate differently
     * depending on whether wrap mode is turned on.
     */
    _setActiveItemByDelta(delta, items = this._items.toArray()) {
        this._wrap ? this._setActiveInWrapMode(delta, items)
            : this._setActiveInDefaultMode(delta, items);
    }
    /**
     * Sets the active item properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     */
    _setActiveInWrapMode(delta, items) {
        // when active item would leave menu, wrap to beginning or end
        this._activeItemIndex =
            (this._activeItemIndex + delta + items.length) % items.length;
        // skip all disabled menu items recursively until an enabled one is reached
        if (items[this._activeItemIndex].disabled) {
            this._setActiveInWrapMode(delta, items);
        }
        else {
            this.setActiveItem(this._activeItemIndex);
        }
    }
    /**
     * Sets the active item properly given the default mode. In other words, it will
     * continue to move down the list until it finds an item that is not disabled. If
     * it encounters either end of the list, it will stop and not wrap.
     */
    _setActiveInDefaultMode(delta, items) {
        this._setActiveItemByIndex(this._activeItemIndex + delta, delta, items);
    }
    /**
     * Sets the active item to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     */
    _setActiveItemByIndex(index, fallbackDelta, items = this._items.toArray()) {
        if (!items[index]) {
            return;
        }
        while (items[index].disabled) {
            index += fallbackDelta;
            if (!items[index]) {
                return;
            }
        }
        this.setActiveItem(index);
    }
}

class FocusKeyManager extends ListKeyManager {
    constructor(items) {
        super(items);
    }
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds focuses the newly active item.
     */
    setActiveItem(index) {
        super.setActiveItem(index);
        if (this.activeItem) {
            this.activeItem.focus();
        }
    }
}

/**
 * The following are all the animations for the md2-select component, with each
 * const containing the metadata for one animation.
 *
 * The values below match the implementation of the AngularJS Material md2-select animation.
 */
/**
 * This animation shrinks the placeholder text to 75% of its normal size and translates
 * it to either the top left corner (ltr) or top right corner (rtl) of the trigger,
 * depending on the text direction of the application.
 */
const transformPlaceholder = trigger('transformPlaceholder', [
    state('floating-ltr', style({
        top: '-22px',
        left: '-2px',
        transform: `scale(0.75)`
    })),
    state('floating-rtl', style({
        top: '-22px',
        left: '2px',
        transform: `scale(0.75)`
    })),
    transition('* => *', animate(`400ms cubic-bezier(0.25, 0.8, 0.25, 1)`))
]);
/**
 * This animation transforms the select's overlay panel on and off the page.
 *
 * When the panel is attached to the DOM, it expands its width 32px, scales it up to
 * 100% on the Y axis, fades in its border, and translates slightly up and to the
 * side to ensure the option text correctly overlaps the trigger text.
 *
 * When the panel is removed from the DOM, it simply fades out linearly.
 */
const transformPanel = trigger('transformPanel', [
    state('showing', style({
        opacity: 1,
        minWidth: 'calc(100% + 32px)',
        transform: `scaleY(1)`
    })),
    transition('void => *', [
        style({
            opacity: 0,
            minWidth: '100%',
            transform: `scaleY(0)`
        }),
        animate(`150ms cubic-bezier(0.25, 0.8, 0.25, 1)`)
    ]),
    transition('* => void', [
        animate('250ms 100ms linear', style({ opacity: 0 }))
    ])
]);
/**
 * This animation fades in the background color and text content of the
 * select's options. It is time delayed to occur 100ms after the overlay
 * panel has transformed in.
 */
const fadeInContent = trigger('fadeInContent', [
    state('showing', style({ opacity: 1 })),
    transition('void => showing', [
        style({ opacity: 0 }),
        animate(`150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)`)
    ])
]);

/**
 * Returns an exception to be thrown when attempting to change a s
 * elect's `multiple` option after initialization.
 * @docs-private
 */
/**
 * Returns an exception to be thrown when attempting to change a s
 * elect's `multiple` option after initialization.
 * @docs-private
 */ function getMdSelectDynamicMultipleError() {
    return new Error('Cannot change `multiple` mode of select after initialization.');
}
/**
 * Returns an exception to be thrown when attempting to assign a non-array value to a select
 * in `multiple` mode. Note that `undefined` and `null` are still valid values to allow for
 * resetting the value.
 * @docs-private
 */
function getMdSelectNonArrayValueError() {
    return new Error('Cannot assign truthy non-array value to select in `multiple` mode.');
}
//# sourceMappingURL=select-errors.js.map

var __decorate$49 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$27 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$8 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * The following style constants are necessary to save here in order
 * to properly calculate the alignment of the selected option over
 * the trigger element.
 */
/** The fixed height of every option element (option, group header etc.). */
const SELECT_ITEM_HEIGHT = 48;
/** The max height of the select's overlay panel */
const SELECT_PANEL_MAX_HEIGHT = 256;
/** The max number of options visible at once in the select panel. */
const SELECT_MAX_OPTIONS_DISPLAYED = Math.floor(SELECT_PANEL_MAX_HEIGHT / SELECT_ITEM_HEIGHT);
/** The fixed height of the select's trigger element. */
const SELECT_TRIGGER_HEIGHT = 30;
/**
 * Must adjust for the difference in height between the option and the trigger,
 * so the text will align on the y axis.
 */
const SELECT_ITEM_HEIGHT_ADJUSTMENT = (SELECT_ITEM_HEIGHT - SELECT_TRIGGER_HEIGHT) / 2;
/** The panel's padding on the x-axis */
const SELECT_PANEL_PADDING_X = 16;
/** The panel's x axis padding if it is indented (e.g. there is an option group). */
const SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_PADDING_X * 2;
/**
 * Distance between the panel edge and the option text in
 * multi-selection mode.
 *
 * (SELECT_PADDING * 1.75) + 20 = 48
 * The padding is multiplied by 1.75 because the checkbox's margin is half the padding, and
 * the browser adds ~4px, because we're using inline elements.
 * The checkbox width is 20px.
 */
const SELECT_MULTIPLE_PANEL_PADDING_X = SELECT_PANEL_PADDING_X * 1.25 + 20;
/**
 * The panel's padding on the y-axis. This padding indicates there are more
 * options available if you scroll.
 */
const SELECT_PANEL_PADDING_Y = 16;
/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
const SELECT_PANEL_VIEWPORT_PADDING = 8;
/** Change event object that is emitted when the select value has changed. */
class Md2SelectChange {
    constructor(source, value) {
        this.source = source;
        this.value = value;
    }
}
let Md2Select = class Md2Select {
    constructor(_element, _renderer, _viewportRuler, _changeDetectorRef, _dir, _control, tabIndex) {
        this._element = _element;
        this._renderer = _renderer;
        this._viewportRuler = _viewportRuler;
        this._changeDetectorRef = _changeDetectorRef;
        this._dir = _dir;
        this._control = _control;
        /** Whether or not the overlay panel is open. */
        this._panelOpen = false;
        /** Whether filling out the select is required in the form.  */
        this._required = false;
        /** Whether the select is disabled.  */
        this._disabled = false;
        /** The scroll position of the overlay panel, calculated to center the selected option. */
        this._scrollTop = 0;
        /** Whether the component is in multiple selection mode. */
        this._multiple = false;
        /** The animation state of the placeholder. */
        this._placeholderState = '';
        /** View -> model callback called when value changes */
        this._onChange = (value) => { };
        /** View -> model callback called when select has been touched */
        this._onTouched = () => { };
        /** The IDs of child options to be passed to the aria-owns attribute. */
        this._optionIds = '';
        /** The value of the select panel's transform-origin property. */
        this._transformOrigin = 'top';
        /** Whether the panel's animation is done. */
        this._panelDoneAnimating = false;
        /**
         * The y-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text.
         * when the panel opens. Will change based on the y-position of the selected option.
         */
        this._offsetY = 0;
        /**
         * This position config ensures that the top "start" corner of the overlay
         * is aligned with with the top "start" of the origin by default (overlapping
         * the trigger completely). If the panel cannot fit below the trigger, it
         * will fall back to a position above the trigger.
         */
        this._positions = [
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
            },
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'bottom',
            },
        ];
        this._floatPlaceholder = 'auto';
        /** Aria label of the select. If not specified, the placeholder will be used as label. */
        this.ariaLabel = '';
        /** Input that can be used to specify the `aria-labelledby` attribute. */
        this.ariaLabelledby = '';
        /** Event emitted when the select has been opened. */
        this.onOpen = new EventEmitter();
        /** Event emitted when the select has been closed. */
        this.onClose = new EventEmitter();
        /** Event emitted when the selected value has been changed by the user. */
        this.change = new EventEmitter();
        if (this._control) {
            this._control.valueAccessor = this;
        }
        this._tabIndex = parseInt(tabIndex) || 0;
    }
    /** Placeholder to be shown if no value has been selected. */
    get placeholder() { return this._placeholder; }
    set placeholder(value) {
        this._placeholder = value;
        // Must wait to record the trigger width to ensure placeholder width is included.
        Promise.resolve(null).then(() => this._setTriggerWidth());
    }
    /** Whether the component is disabled. */
    get disabled() { return this._disabled; }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /** Whether the component is required. */
    get required() { return this._required; }
    set required(value) { this._required = coerceBooleanProperty(value); }
    /** Whether the user should be allowed to select multiple options. */
    get multiple() { return this._multiple; }
    set multiple(value) {
        if (this._selectionModel) {
            throw getMdSelectDynamicMultipleError();
        }
        this._multiple = coerceBooleanProperty(value);
    }
    /** Whether to float the placeholder text. */
    get floatPlaceholder() { return this._floatPlaceholder; }
    set floatPlaceholder(value) {
        this._floatPlaceholder = value || 'auto';
    }
    /** Tab index for the select element. */
    get tabIndex() { return this._disabled ? -1 : this._tabIndex; }
    set tabIndex(value) {
        if (typeof value !== 'undefined') {
            this._tabIndex = value;
        }
    }
    /** Combined stream of all of the child options' change events. */
    get optionSelectionChanges() {
        return Observable.merge(...this.options.map(option => option.onSelectionChange));
    }
    ngOnInit() {
        this._selectionModel = new SelectionModel(this.multiple, null, false);
    }
    ngAfterContentInit() {
        this._initKeyManager();
        this._changeSubscription = this.options.changes.startWith(null).subscribe(() => {
            this._resetOptions();
            if (this._control) {
                // Defer setting the value in order to avoid the "Expression
                // has changed after it was checked" errors from Angular.
                Promise.resolve(null).then(() => this._setSelectionByValue(this._control.value));
            }
        });
    }
    ngOnDestroy() {
        this._dropSubscriptions();
        if (this._changeSubscription) {
            this._changeSubscription.unsubscribe();
        }
        if (this._tabSubscription) {
            this._tabSubscription.unsubscribe();
        }
    }
    /** Toggles the overlay panel open or closed. */
    toggle() {
        this.panelOpen ? this.close() : this.open();
    }
    /** Opens the overlay panel. */
    open() {
        if (this.disabled || !this.options.length) {
            return;
        }
        if (!this._triggerWidth) {
            this._setTriggerWidth();
        }
        this._calculateOverlayPosition();
        this._placeholderState = this._floatPlaceholderState();
        this._panelOpen = true;
    }
    /** Closes the overlay panel and focuses the host element. */
    close() {
        if (this._panelOpen) {
            this._panelOpen = false;
            if (this._selectionModel.isEmpty()) {
                this._placeholderState = '';
            }
            this._focusHost();
        }
    }
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param value New value to be written to the model.
     */
    writeValue(value) {
        if (this.options) {
            this._setSelectionByValue(value);
        }
    }
    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the value changes.
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the component has been touched.
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param isDisabled Sets whether the component is disabled.
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /** Whether or not the overlay panel is open. */
    get panelOpen() {
        return this._panelOpen;
    }
    /** The currently selected option. */
    get selected() {
        return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
    }
    /** The value displayed in the trigger. */
    get triggerValue() {
        if (this._multiple) {
            let selectedOptions = this._selectionModel.selected.map(option => option.viewValue);
            if (this._isRtl()) {
                selectedOptions.reverse();
            }
            // TODO(crisbeto): delimiter should be configurable for proper localization.
            return selectedOptions.join(', ');
        }
        return this._selectionModel.selected[0].viewValue;
    }
    /** Whether the element is in RTL mode. */
    _isRtl() {
        return this._dir ? this._dir.value === 'rtl' : false;
    }
    /**
     * Sets the width of the trigger element. This is necessary to match
     * the overlay width to the trigger width.
     */
    _setTriggerWidth() {
        this._triggerWidth = this._getTriggerRect().width;
    }
    /** Handles the keyboard interactions of a closed select. */
    _handleClosedKeydown(event) {
        if (!this.disabled) {
            if (event.keyCode === ENTER || event.keyCode === SPACE) {
                event.preventDefault(); // prevents the page from scrolling down when pressing space
                this.open();
            }
            else if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
                this._handleArrowKey(event);
            }
        }
    }
    /** Handles keypresses inside the panel. */
    _handlePanelKeydown(event) {
        if (event.keyCode === HOME || event.keyCode === END) {
            event.preventDefault();
            event.keyCode === HOME ? this._keyManager.setFirstItemActive() :
                this._keyManager.setLastItemActive();
        }
        else {
            this._keyManager.onKeydown(event);
        }
    }
    /**
     * When the panel element is finished transforming in (though not fading in), it
     * emits an event and focuses an option if the panel is open.
     */
    _onPanelDone() {
        if (this.panelOpen) {
            this._focusCorrectOption();
            this.onOpen.emit();
        }
        else {
            this.onClose.emit();
            this._panelDoneAnimating = false;
            this.overlayDir.offsetX = 0;
        }
    }
    /**
     * When the panel content is done fading in, the _panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     */
    _onFadeInDone() {
        this._panelDoneAnimating = this.panelOpen;
    }
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     */
    _onBlur() {
        if (!this.panelOpen) {
            this._onTouched();
        }
    }
    /**
     * Callback that is invoked when the overlay panel has been attached.
     */
    _onAttached() {
        this._calculateOverlayOffsetX();
        this._setScrollTop();
    }
    /**
     * Sets the scroll position of the scroll container. This must be called after
     * the overlay pane is attached or the scroll container element will not yet be
     * present in the DOM.
     */
    _setScrollTop() {
        const scrollContainer = this.overlayDir.overlayRef.overlayElement.querySelector('.md2-select-panel');
        scrollContainer.scrollTop = this._scrollTop;
    }
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    _setSelectionByValue(value) {
        const isArray = Array.isArray(value);
        if (this.multiple && value && !isArray) {
            throw getMdSelectNonArrayValueError();
        }
        this._clearSelection();
        if (isArray) {
            value.forEach((currentValue) => this._selectValue(currentValue));
            this._sortValues();
        }
        else {
            this._selectValue(value);
        }
        this._setValueWidth();
        if (this._selectionModel.isEmpty()) {
            this._placeholderState = '';
        }
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Finds and selects and option based on its value.
     * @returns Option that has the corresponding value.
     */
    _selectValue(value) {
        let optionsArray = this.options.toArray();
        let correspondingOption = optionsArray.find(option => option.value && this.equals(option.value, value));
        if (correspondingOption) {
            correspondingOption.select();
            this._selectionModel.select(correspondingOption);
            this._keyManager.setActiveItem(optionsArray.indexOf(correspondingOption));
        }
        return correspondingOption;
    }
    /**
     * Compare two vars or objects
     * @param o1 compare first object
     * @param o2 compare second object
     * @return boolean comparation result
     */
    equals(o1, o2) {
        if (o1 === o2) {
            return true;
        }
        if (o1 === null || o2 === null) {
            return false;
        }
        if (o1 !== o1 && o2 !== o2) {
            return true;
        }
        let t1 = typeof o1, t2 = typeof o2, key, keySet;
        if (t1 === t2 && t1 === 'object') {
            keySet = Object.create(null);
            for (key in o1) {
                if (!this.equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && key.charAt(0) !== '$' && o2[key]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    /**
     * Clears the select trigger and deselects every option in the list.
     * @param skip Option that should not be deselected.
     */
    _clearSelection(skip) {
        this._selectionModel.clear();
        this.options.forEach(option => {
            if (option !== skip) {
                option.deselect();
            }
        });
    }
    _getTriggerRect() {
        return this.trigger.nativeElement.getBoundingClientRect();
    }
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    _initKeyManager() {
        this._keyManager = new FocusKeyManager(this.options);
        this._tabSubscription = this._keyManager.tabOut.subscribe(() => this.close());
    }
    /** Drops current option subscriptions and IDs and resets from scratch. */
    _resetOptions() {
        this._dropSubscriptions();
        this._listenToOptions();
        this._setOptionIds();
        this._setOptionMultiple();
    }
    /** Listens to user-generated selection events on each option. */
    _listenToOptions() {
        this._optionSubscription = this.optionSelectionChanges
            .filter(event => event.isUserInput)
            .subscribe(event => {
            this._onSelect(event.source);
            this._setValueWidth();
            if (!this.multiple) {
                this.close();
            }
        });
    }
    /** Invoked when an option is clicked. */
    _onSelect(option) {
        const wasSelected = this._selectionModel.isSelected(option);
        if (this.multiple) {
            this._selectionModel.toggle(option);
            wasSelected ? option.deselect() : option.select();
            this._sortValues();
        }
        else {
            this._clearSelection(option.value == null ? null : option);
            if (option.value == null) {
                this._propagateChanges(option.value);
            }
            else {
                this._selectionModel.select(option);
            }
        }
        if (wasSelected !== this._selectionModel.isSelected(option)) {
            this._propagateChanges();
        }
    }
    /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     */
    _sortValues() {
        if (this._multiple) {
            this._selectionModel.clear();
            this.options.forEach(option => {
                if (option.selected) {
                    this._selectionModel.select(option);
                }
            });
        }
    }
    /** Unsubscribes from all option subscriptions. */
    _dropSubscriptions() {
        if (this._optionSubscription) {
            this._optionSubscription.unsubscribe();
            this._optionSubscription = null;
        }
    }
    /** Emits change event to set the model value. */
    _propagateChanges(fallbackValue) {
        let valueToEmit = null;
        if (Array.isArray(this.selected)) {
            valueToEmit = this.selected.map(option => option.value);
        }
        else {
            valueToEmit = this.selected ? this.selected.value : fallbackValue;
        }
        this._onChange(valueToEmit);
        this.change.emit(new Md2SelectChange(this, valueToEmit));
    }
    /** Records option IDs to pass to the aria-owns property. */
    _setOptionIds() {
        this._optionIds = this.options.map(option => option.id).join(' ');
    }
    /**
     * Sets the `multiple` property on each option. The promise is necessary
     * in order to avoid Angular errors when modifying the property after init.
     */
    _setOptionMultiple() {
        if (this.multiple) {
            Promise.resolve(null).then(() => {
                this.options.forEach(option => option.multiple = this.multiple);
            });
        }
    }
    /**
     * Must set the width of the selected option's value programmatically
     * because it is absolutely positioned and otherwise will not clip
     * overflow. The selection arrow is 9px wide, add 4px of padding = 13
     */
    _setValueWidth() {
        this._selectedValueWidth = this._triggerWidth - 13;
    }
    /**
     * Focuses the selected item. If no option is selected, it will focus
     * the first item instead.
     */
    _focusCorrectOption() {
        if (this._selectionModel.isEmpty()) {
            this._keyManager.setFirstItemActive();
        }
        else {
            this._keyManager.setActiveItem(this._getOptionIndex(this._selectionModel.selected[0]));
        }
    }
    /** Focuses the host element when the panel closes. */
    _focusHost() {
        this._element.nativeElement.focus();
    }
    /** Gets the index of the provided option in the option list. */
    _getOptionIndex(option) {
        return this.options.reduce((result, current, index) => {
            return result === undefined ? (option === current ? index : undefined) : result;
        }, undefined);
    }
    /** Calculates the scroll position and x- and y-offsets of the overlay panel. */
    _calculateOverlayPosition() {
        const items = this._getItemCount();
        const panelHeight = Math.min(items * SELECT_ITEM_HEIGHT, SELECT_PANEL_MAX_HEIGHT);
        const scrollContainerHeight = items * SELECT_ITEM_HEIGHT;
        // The farthest the panel can be scrolled before it hits the bottom
        const maxScroll = scrollContainerHeight - panelHeight;
        if (this._selectionModel.hasValue()) {
            let selectedIndex = this._getOptionIndex(this._selectionModel.selected[0]);
            selectedIndex += this._getLabelCountBeforeOption(selectedIndex);
            // We must maintain a scroll buffer so the selected option will be scrolled to the
            // center of the overlay panel rather than the top.
            const scrollBuffer = panelHeight / 2;
            this._scrollTop = this._calculateOverlayScroll(selectedIndex, scrollBuffer, maxScroll);
            this._offsetY = this._calculateOverlayOffsetY(selectedIndex, scrollBuffer, maxScroll);
        }
        else {
            // If no option is selected, the panel centers on the first option. In this case,
            // we must only adjust for the height difference between the option element
            // and the trigger element, then multiply it by -1 to ensure the panel moves
            // in the correct direction up the page.
            this._offsetY = (SELECT_ITEM_HEIGHT - SELECT_TRIGGER_HEIGHT) / 2 * -1;
        }
        this._checkOverlayWithinViewport(maxScroll);
    }
    /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     */
    _calculateOverlayScroll(selectedIndex, scrollBuffer, maxScroll) {
        const optionOffsetFromScrollTop = SELECT_ITEM_HEIGHT * selectedIndex;
        const halfOptionHeight = SELECT_ITEM_HEIGHT / 2;
        // Starts at the optionOffsetFromScrollTop, which scrolls the option to the top of the
        // scroll container, then subtracts the scroll buffer to scroll the option down to
        // the center of the overlay panel. Half the option height must be re-added to the
        // scrollTop so the option is centered based on its middle, not its top edge.
        const optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
        return clampValue(0, optimalScrollPosition, maxScroll);
    }
    /**
     * Figures out the appropriate animation state for the placeholder.
     */
    _getPlaceholderAnimationState() {
        if (this.floatPlaceholder === 'never') {
            return '';
        }
        if (this.floatPlaceholder === 'always') {
            return this._floatPlaceholderState();
        }
        return this._placeholderState;
    }
    /**
     * Determines the CSS `opacity` of the placeholder element.
     */
    _getPlaceholderOpacity() {
        return (this.floatPlaceholder !== 'never' || this._selectionModel.isEmpty()) ?
            '1' : '0';
    }
    /** Returns the aria-label of the select component. */
    get _ariaLabel() {
        // If an ariaLabelledby value has been set, the select should not overwrite the
        // `aria-labelledby` value by setting the ariaLabel to the placeholder.
        return this.ariaLabelledby ? null : this.ariaLabel || this.placeholder;
    }
    /**
     * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text when
     * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
     * can't be calculated until the panel has been attached, because we need to know the
     * content width in order to constrain the panel within the viewport.
     */
    _calculateOverlayOffsetX() {
        const overlayRect = this.overlayDir.overlayRef.overlayElement.getBoundingClientRect();
        const viewportRect = this._viewportRuler.getViewportRect();
        const isRtl = this._isRtl();
        let offsetX;
        // Adjust the offset, depending on the option padding.
        if (this.multiple) {
            offsetX = SELECT_MULTIPLE_PANEL_PADDING_X;
        }
        else {
            let selected = this._selectionModel.selected[0];
            offsetX = selected && selected.group ? SELECT_PANEL_INDENT_PADDING_X : SELECT_PANEL_PADDING_X;
        }
        // Invert the offset in LTR.
        if (!isRtl) {
            offsetX *= -1;
        }
        // Determine how much the select overflows on each side.
        const leftOverflow = 0 - (overlayRect.left + offsetX
            - (isRtl ? SELECT_PANEL_PADDING_X * 2 : 0));
        const rightOverflow = overlayRect.right + offsetX - viewportRect.width
            + (isRtl ? 0 : SELECT_PANEL_PADDING_X * 2);
        // If the element overflows on either side, reduce the offset to allow it to fit.
        if (leftOverflow > 0) {
            offsetX += leftOverflow + SELECT_PANEL_VIEWPORT_PADDING;
        }
        else if (rightOverflow > 0) {
            offsetX -= rightOverflow + SELECT_PANEL_VIEWPORT_PADDING;
        }
        // Set the offset directly in order to avoid having to go through change detection and
        // potentially triggering "changed after it was checked" errors.
        this.overlayDir.offsetX = offsetX;
        this.overlayDir.overlayRef.updatePosition();
    }
    /**
     * Calculates the y-offset of the select's overlay panel in relation to the
     * top start corner of the trigger. It has to be adjusted in order for the
     * selected option to be aligned over the trigger when the panel opens.
     */
    _calculateOverlayOffsetY(selectedIndex, scrollBuffer, maxScroll) {
        let optionOffsetFromPanelTop;
        if (this._scrollTop === 0) {
            optionOffsetFromPanelTop = selectedIndex * SELECT_ITEM_HEIGHT;
        }
        else if (this._scrollTop === maxScroll) {
            const firstDisplayedIndex = this._getItemCount() - SELECT_MAX_OPTIONS_DISPLAYED;
            const selectedDisplayIndex = selectedIndex - firstDisplayedIndex;
            // Because the panel height is longer than the height of the options alone,
            // there is always extra padding at the top or bottom of the panel. When
            // scrolled to the very bottom, this padding is at the top of the panel and
            // must be added to the offset.
            optionOffsetFromPanelTop =
                selectedDisplayIndex * SELECT_ITEM_HEIGHT + SELECT_PANEL_PADDING_Y;
        }
        else {
            // If the option was scrolled to the middle of the panel using a scroll buffer,
            // its offset will be the scroll buffer minus the half height that was added to
            // center it.
            optionOffsetFromPanelTop = scrollBuffer - SELECT_ITEM_HEIGHT / 2;
        }
        // The final offset is the option's offset from the top, adjusted for the height
        // difference, multiplied by -1 to ensure that the overlay moves in the correct
        // direction up the page.
        return optionOffsetFromPanelTop * -1 - SELECT_ITEM_HEIGHT_ADJUSTMENT;
    }
    /**
     * Checks that the attempted overlay position will fit within the viewport.
     * If it will not fit, tries to adjust the scroll position and the associated
     * y-offset so the panel can open fully on-screen. If it still won't fit,
     * sets the offset back to 0 to allow the fallback position to take over.
     */
    _checkOverlayWithinViewport(maxScroll) {
        const viewportRect = this._viewportRuler.getViewportRect();
        const triggerRect = this._getTriggerRect();
        const topSpaceAvailable = triggerRect.top - SELECT_PANEL_VIEWPORT_PADDING;
        const bottomSpaceAvailable = viewportRect.height - triggerRect.bottom - SELECT_PANEL_VIEWPORT_PADDING;
        const panelHeightTop = Math.abs(this._offsetY);
        const totalPanelHeight = Math.min(this._getItemCount() * SELECT_ITEM_HEIGHT, SELECT_PANEL_MAX_HEIGHT);
        const panelHeightBottom = totalPanelHeight - panelHeightTop - triggerRect.height;
        if (panelHeightBottom > bottomSpaceAvailable) {
            this._adjustPanelUp(panelHeightBottom, bottomSpaceAvailable);
        }
        else if (panelHeightTop > topSpaceAvailable) {
            this._adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll);
        }
        else {
            this._transformOrigin = this._getOriginBasedOnOption();
        }
    }
    /** Adjusts the overlay panel up to fit in the viewport. */
    _adjustPanelUp(panelHeightBottom, bottomSpaceAvailable) {
        const distanceBelowViewport = panelHeightBottom - bottomSpaceAvailable;
        // Scrolls the panel up by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel up into the viewport.
        this._scrollTop -= distanceBelowViewport;
        this._offsetY -= distanceBelowViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very top, it won't be able to fit the panel
        // by scrolling, so set the offset to 0 to allow the fallback position to take
        // effect.
        if (this._scrollTop <= 0) {
            this._scrollTop = 0;
            this._offsetY = 0;
            this._transformOrigin = `50% bottom 0px`;
        }
    }
    /** Adjusts the overlay panel down to fit in the viewport. */
    _adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll) {
        const distanceAboveViewport = panelHeightTop - topSpaceAvailable;
        // Scrolls the panel down by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel down into the viewport.
        this._scrollTop += distanceAboveViewport;
        this._offsetY += distanceAboveViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very bottom, it won't be able to fit the
        // panel by scrolling, so set the offset to 0 to allow the fallback position
        // to take effect.
        if (this._scrollTop >= maxScroll) {
            this._scrollTop = maxScroll;
            this._offsetY = 0;
            this._transformOrigin = `50% top 0px`;
            return;
        }
    }
    /** Sets the transform origin point based on the selected option. */
    _getOriginBasedOnOption() {
        const originY = Math.abs(this._offsetY) - SELECT_ITEM_HEIGHT_ADJUSTMENT + SELECT_ITEM_HEIGHT / 2;
        return `50% ${originY}px 0px`;
    }
    /** Figures out the floating placeholder state value. */
    _floatPlaceholderState() {
        return this._isRtl() ? 'floating-rtl' : 'floating-ltr';
    }
    /** Handles the user pressing the arrow keys on a closed select.  */
    _handleArrowKey(event) {
        if (this._multiple) {
            event.preventDefault();
            this.open();
        }
        else {
            const prevActiveItem = this._keyManager.activeItem;
            // Cycle though the select options even when the select is closed,
            // matching the behavior of the native select element.
            // TODO(crisbeto): native selects also cycle through the options with left/right arrows,
            // however the key manager only supports up/down at the moment.
            this._keyManager.onKeydown(event);
            const currentActiveItem = this._keyManager.activeItem;
            if (currentActiveItem !== prevActiveItem) {
                this._clearSelection();
                this._setSelectionByValue(currentActiveItem.value);
                this._propagateChanges();
            }
        }
    }
    /** Calculates the amount of items in the select. This includes options and group labels. */
    _getItemCount() {
        return this.options.length + this.optionGroups.length;
    }
    /**
     * Calculates the amount of option group labels that precede the specified option.
     * Useful when positioning the panel, because the labels will offset the index of the
     * currently-selected option.
     */
    _getLabelCountBeforeOption(optionIndex) {
        if (this.optionGroups.length) {
            let options = this.options.toArray();
            let groups = this.optionGroups.toArray();
            let groupCounter = 0;
            for (let i = 0; i < optionIndex + 1; i++) {
                if (options[i].group && options[i].group === groups[groupCounter]) {
                    groupCounter++;
                }
            }
            return groupCounter;
        }
        return 0;
    }
};
__decorate$49([
    ViewChild('trigger'),
    __metadata$27("design:type", ElementRef)
], Md2Select.prototype, "trigger", void 0);
__decorate$49([
    ViewChild(ConnectedOverlayDirective),
    __metadata$27("design:type", ConnectedOverlayDirective)
], Md2Select.prototype, "overlayDir", void 0);
__decorate$49([
    ContentChildren(Md2Option, { descendants: true }),
    __metadata$27("design:type", QueryList)
], Md2Select.prototype, "options", void 0);
__decorate$49([
    ContentChildren(Md2Optgroup),
    __metadata$27("design:type", QueryList)
], Md2Select.prototype, "optionGroups", void 0);
__decorate$49([
    Input(),
    __metadata$27("design:type", Object),
    __metadata$27("design:paramtypes", [String])
], Md2Select.prototype, "placeholder", null);
__decorate$49([
    Input(),
    __metadata$27("design:type", Object),
    __metadata$27("design:paramtypes", [Object])
], Md2Select.prototype, "disabled", null);
__decorate$49([
    Input(),
    __metadata$27("design:type", Object),
    __metadata$27("design:paramtypes", [Object])
], Md2Select.prototype, "required", null);
__decorate$49([
    Input(),
    __metadata$27("design:type", Boolean),
    __metadata$27("design:paramtypes", [Boolean])
], Md2Select.prototype, "multiple", null);
__decorate$49([
    Input(),
    __metadata$27("design:type", String),
    __metadata$27("design:paramtypes", [String])
], Md2Select.prototype, "floatPlaceholder", null);
__decorate$49([
    Input(),
    __metadata$27("design:type", Number),
    __metadata$27("design:paramtypes", [Number])
], Md2Select.prototype, "tabIndex", null);
__decorate$49([
    Input('aria-label'),
    __metadata$27("design:type", String)
], Md2Select.prototype, "ariaLabel", void 0);
__decorate$49([
    Input('aria-labelledby'),
    __metadata$27("design:type", String)
], Md2Select.prototype, "ariaLabelledby", void 0);
__decorate$49([
    Output(),
    __metadata$27("design:type", EventEmitter)
], Md2Select.prototype, "onOpen", void 0);
__decorate$49([
    Output(),
    __metadata$27("design:type", EventEmitter)
], Md2Select.prototype, "onClose", void 0);
__decorate$49([
    Output(),
    __metadata$27("design:type", EventEmitter)
], Md2Select.prototype, "change", void 0);
Md2Select = __decorate$49([
    Component({selector: 'md2-select',
        template: "<div class=\"md2-select-trigger\" cdk-overlay-origin (click)=\"toggle()\" #origin=\"cdkOverlayOrigin\" #trigger><span class=\"md2-select-placeholder\" [class.md2-floating-placeholder]=\"_selectionModel.hasValue()\" [@transformPlaceholder]=\"_getPlaceholderAnimationState()\" [style.opacity]=\"_getPlaceholderOpacity()\" [style.width.px]=\"_selectedValueWidth\">{{ placeholder }}</span> <span class=\"md2-select-value\" *ngIf=\"_selectionModel.hasValue()\"><span class=\"md2-select-value-text\">{{ triggerValue }}</span> </span><span class=\"md2-select-arrow\"></span> <span class=\"md2-select-underline\"></span></div><ng-template cdk-connected-overlay [origin]=\"origin\" [open]=\"panelOpen\" hasBackdrop (backdropClick)=\"close()\" backdropClass=\"cdk-overlay-transparent-backdrop\" [positions]=\"_positions\" [minWidth]=\"_triggerWidth\" [offsetY]=\"_offsetY\" (attach)=\"_onAttached()\" (detach)=\"close()\"><div class=\"md2-select-panel\" [@transformPanel]=\"'showing'\" (@transformPanel.done)=\"_onPanelDone()\" (keydown)=\"_keyManager.onKeydown($event)\" [style.transformOrigin]=\"_transformOrigin\" [class.md2-select-panel-done-animating]=\"_panelDoneAnimating\"><div class=\"md2-select-content\" [@fadeInContent]=\"'showing'\" (@fadeInContent.done)=\"_onFadeInDone()\"><ng-content select=\"md2-select-header\"></ng-content><ng-content></ng-content></div></div></ng-template>",
        styles: [".md2-select{display:inline-block;outline:0}.md2-select-trigger{color:rgba(0,0,0,.38);display:flex;align-items:center;height:30px;min-width:112px;cursor:pointer;position:relative;box-sizing:border-box;font-size:16px}[aria-disabled=true] .md2-select-trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.md2-select:focus:not(.md2-select-disabled) .md2-select-trigger{color:#106cc8}.md2-select.ng-invalid.ng-touched:not(.md2-select-disabled) .md2-select-trigger{color:#f44336}.md2-select-underline{position:absolute;bottom:0;left:0;right:0;height:1px;background-color:rgba(0,0,0,.12)}[aria-disabled=true] .md2-select-underline{background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;background-color:transparent;background-position:0 bottom}.md2-select:focus:not(.md2-select-disabled) .md2-select-underline{background-color:#106cc8}.md2-select.ng-invalid.ng-touched:not(.md2-select-disabled) .md2-select-underline{background-color:#f44336}.md2-select-placeholder{position:relative;padding:0 2px;transform-origin:left top;flex-grow:1}.md2-select-placeholder.md2-floating-placeholder{top:-22px;left:-2px;text-align:left;transform:scale(.75)}[dir=rtl] .md2-select-placeholder{transform-origin:right top}[dir=rtl] .md2-select-placeholder.md2-floating-placeholder{left:2px;text-align:right}[aria-required=true] .md2-select-placeholder::after{content:'*'}.md2-select-value{position:absolute;max-width:calc(100% - 18px);flex-grow:1;top:0;left:0;bottom:0;display:flex;align-items:center;color:rgba(0,0,0,.87)}[dir=rtl] .md2-select-value{left:auto;right:0}.md2-select-disabled .md2-select-value{color:rgba(0,0,0,.38)}.md2-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:30px}.md2-select-arrow{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;margin:0 4px}.md2-select-panel{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;padding-top:0;padding-bottom:0;max-height:256px;min-width:100%}@media screen and (-ms-high-contrast:active){.md2-select-panel{outline:solid 1px}}.md2-select-content,.md2-select-panel-done-animating{background:#fff}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-transparent-backdrop{background:0 0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48} /*# sourceMappingURL=select.css.map */ "],
        encapsulation: ViewEncapsulation.None,
        host: {
            'role': 'listbox',
            '[attr.tabindex]': 'tabIndex',
            '[attr.aria-label]': '_ariaLabel',
            '[attr.aria-labelledby]': 'ariaLabelledby',
            '[attr.aria-required]': 'required.toString()',
            '[attr.aria-disabled]': 'disabled.toString()',
            '[attr.aria-invalid]': '_control?.invalid || "false"',
            '[attr.aria-owns]': '_optionIds',
            '[class.md2-select-disabled]': 'disabled',
            '[class.md2-select]': 'true',
            '(keydown)': '_handleClosedKeydown($event)',
            '(blur)': '_onBlur()',
        },
        animations: [
            transformPlaceholder,
            transformPanel,
            fadeInContent
        ],
        exportAs: 'md2Select',
    }),
    __param$8(4, Optional()), __param$8(5, Self()), __param$8(5, Optional()),
    __param$8(6, Attribute('tabindex')),
    __metadata$27("design:paramtypes", [ElementRef, Renderer2,
        ViewportRuler, ChangeDetectorRef,
        Dir, NgControl, String])
], Md2Select);
/** Clamps a value n between min and max values. */
function clampValue(min, n, max) {
    return Math.min(Math.max(min, n), max);
}

var __decorate$52 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Fixed header that will be rendered above a select's options.
 */
let Md2SelectHeader = class Md2SelectHeader {
};
Md2SelectHeader = __decorate$52([
    Directive({
        selector: 'md2-select-header',
        host: {
            'class': 'md2-select-header',
        }
    })
], Md2SelectHeader);

var __decorate$48 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Md2SelectModule = class Md2SelectModule {
};
Md2SelectModule = __decorate$48([
    NgModule({
        imports: [
            CommonModule,
            OverlayModule,
            Md2OptionModule,
            MdCommonModule,
        ],
        exports: [Md2Select, Md2SelectHeader, Md2OptionModule, MdCommonModule],
        declarations: [Md2Select, Md2SelectHeader],
    })
], Md2SelectModule);

var __decorate$47 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$26 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$7 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
class Md2PaginationChange {
}
let Md2DataTable = class Md2DataTable {
    constructor(differs) {
        this.differs = differs;
        this.isDataChanged = false;
        this._data = [];
        this._activePage = 1;
        this._rowsPerPage = 1000;
        this._sortBy = '';
        this._sortOrder = 'asc';
        this.activePageChange = new EventEmitter();
        this.rowsPerPageChange = new EventEmitter();
        this.sortByChange = new EventEmitter();
        this.sortOrderChange = new EventEmitter();
        this.onSortChange = new EventEmitter();
        this.onPageChange = new EventEmitter();
        this.diff = differs.find([]).create(null);
    }
    get md2Data() { return this._data; }
    set md2Data(value) {
        if (this._data !== value) {
            this._data = value || [];
            this.recalculatePage();
            this.isDataChanged = true;
        }
    }
    get activePage() { return this._activePage; }
    set activePage(value) {
        if (this._activePage !== value) {
            this._activePage = value;
        }
    }
    get rowsPerPage() { return this._rowsPerPage; }
    set rowsPerPage(value) {
        if (this._rowsPerPage !== value) {
            this._rowsPerPage = value;
            this.setPage(this.activePage, value);
            this.isDataChanged = true;
        }
    }
    get sortBy() { return this._sortBy; }
    set sortBy(value) {
        if (this._sortBy !== value) {
            this._sortBy = value;
            if (value) {
                this.onSortChange.next({ sortBy: this.sortBy, sortOrder: this.sortOrder });
            }
            this.isDataChanged = true;
        }
    }
    get sortOrder() { return this._sortOrder; }
    set sortOrder(value) {
        if (!(value === 'asc' || value === 'desc')) {
            console.warn('sortOrder value must be one of ["asc", "desc"], but is:', value);
            value = 'asc';
        }
        if (this._sortOrder !== value) {
            this._sortOrder = value;
            this.isDataChanged = true;
        }
    }
    ngDoCheck() {
        let changes = this.diff.diff(this.md2Data);
        if (changes) {
            this.recalculatePage();
            this.isDataChanged = true;
        }
        if (this.isDataChanged) {
            this.fillData();
            this.diff.diff(this.md2Data);
            this.isDataChanged = false;
        }
    }
    getSort() {
        return { sortBy: this.sortBy, sortOrder: this.sortOrder };
    }
    setSort(sortBy, sortOrder) {
        if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
            this.sortBy = sortBy;
            this.sortOrder = sortOrder;
            this.isDataChanged = true;
            this.onSortChange.next({ sortBy: sortBy, sortOrder: sortOrder });
            this.sortByChange.emit(this.sortBy);
            this.sortOrderChange.emit(this.sortOrder);
        }
    }
    getPage() {
        return {
            activePage: this.activePage,
            rowsPerPage: this.rowsPerPage,
            dataLength: this.md2Data.length
        };
    }
    setPage(activePage, rowsPerPage) {
        if (this.rowsPerPage !== rowsPerPage || this.activePage !== activePage) {
            this.activePage = this.activePage !== activePage ?
                activePage : this.calculateNewActivePage(this.rowsPerPage, rowsPerPage);
            if (this.rowsPerPage !== rowsPerPage) {
                this._rowsPerPage = rowsPerPage;
                this.rowsPerPageChange.emit(this.rowsPerPage);
            }
            this.isDataChanged = true;
            this.onPageChange.emit({
                activePage: this.activePage,
                rowsPerPage: this.rowsPerPage,
                dataLength: this.md2Data ? this.md2Data.length : 0
            });
            this.activePageChange.emit(this.activePage);
        }
    }
    calculateNewActivePage(previousRowsPerPage, currentRowsPerPage) {
        let firstRowOnPage = (this.activePage - 1) * previousRowsPerPage + 1;
        let newActivePage = Math.ceil(firstRowOnPage / currentRowsPerPage);
        return newActivePage;
    }
    recalculatePage() {
        let lastPage = Math.ceil(this.md2Data.length / this.rowsPerPage);
        if (lastPage < this.activePage) {
            this._activePage = lastPage || 1;
            setTimeout(() => {
                this.activePageChange.emit(this.activePage);
            }, 10);
        }
        else { }
        this.onPageChange.emit({
            activePage: this.activePage,
            rowsPerPage: this.rowsPerPage,
            dataLength: this.md2Data.length
        });
    }
    fillData() {
        let offset = (this.activePage - 1) * this.rowsPerPage;
        let data = this.md2Data;
        let sortInt = this.sortOrder === 'desc' ? -1 : 1;
        if (this.sortBy) {
            data = data.sort((a, b) => {
                let x = this.caseInsensitiveIteratee(a);
                let y = this.caseInsensitiveIteratee(b);
                return ((x > y) ? 1 : (y > x) ? -1 : 0) * sortInt;
            });
        }
        this.data = data.slice(offset, offset + this.rowsPerPage);
    }
    caseInsensitiveIteratee(value) {
        if (typeof this.sortBy === 'string' || this.sortBy instanceof String) {
            for (let sortByProperty of this.sortBy.split('.')) {
                value = value[sortByProperty];
            }
        }
        else {
            value = value[this.sortBy + ''];
        }
        if (value && typeof value === 'string' || value instanceof String) {
            return value.toLowerCase();
        }
        return value;
    }
};
__decorate$47([
    Input(),
    __metadata$26("design:type", Object),
    __metadata$26("design:paramtypes", [Array])
], Md2DataTable.prototype, "md2Data", null);
__decorate$47([
    Input(),
    __metadata$26("design:type", Object),
    __metadata$26("design:paramtypes", [Number])
], Md2DataTable.prototype, "activePage", null);
__decorate$47([
    Input(),
    __metadata$26("design:type", Object),
    __metadata$26("design:paramtypes", [Number])
], Md2DataTable.prototype, "rowsPerPage", null);
__decorate$47([
    Input(),
    __metadata$26("design:type", Object),
    __metadata$26("design:paramtypes", [Object])
], Md2DataTable.prototype, "sortBy", null);
__decorate$47([
    Input(),
    __metadata$26("design:type", Object),
    __metadata$26("design:paramtypes", [String])
], Md2DataTable.prototype, "sortOrder", null);
__decorate$47([
    Output(),
    __metadata$26("design:type", Object)
], Md2DataTable.prototype, "activePageChange", void 0);
__decorate$47([
    Output(),
    __metadata$26("design:type", Object)
], Md2DataTable.prototype, "rowsPerPageChange", void 0);
__decorate$47([
    Output(),
    __metadata$26("design:type", Object)
], Md2DataTable.prototype, "sortByChange", void 0);
__decorate$47([
    Output(),
    __metadata$26("design:type", Object)
], Md2DataTable.prototype, "sortOrderChange", void 0);
Md2DataTable = __decorate$47([
    Directive({
        selector: 'table[md2Data]',
        exportAs: 'md2DataTable'
    }),
    __metadata$26("design:paramtypes", [IterableDiffers])
], Md2DataTable);
let Md2DataTableSortBy = class Md2DataTableSortBy {
    constructor(_md2Table) {
        this._md2Table = _md2Table;
        this._isAsc = false;
        this._isDesc = false;
    }
    ngOnInit() {
        this._md2Table.onSortChange.subscribe((event) => {
            this._isAsc = (event.sortBy === this.md2SortBy && event.sortOrder === 'asc');
            this._isDesc = (event.sortBy === this.md2SortBy && event.sortOrder === 'desc');
        });
    }
    _sort() {
        if (this._isAsc) {
            this._md2Table.setSort(this.md2SortBy, 'desc');
        }
        else {
            this._md2Table.setSort(this.md2SortBy, 'asc');
        }
    }
};
__decorate$47([
    Input(),
    __metadata$26("design:type", String)
], Md2DataTableSortBy.prototype, "md2SortBy", void 0);
Md2DataTableSortBy = __decorate$47([
    Component({
        selector: '[md2SortBy]',
        template: "<ng-content></ng-content>&nbsp; <svg *ngIf=\"!_isDesc\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\"><path d=\"M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z\"/></svg> <svg *ngIf=\"_isDesc\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\"><path d=\"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z\"/></svg>",
        styles: ["$primary: #106cc8 !default; /* * Data Table */ /* * Sort */ [md2SortBy] { line-height: 24px; color: rgba(black, 0.54); white-space: nowrap; cursor: pointer; user-select: none; svg { display: inline-block; vertical-align: middle; fill: currentColor; opacity: 0; } &:hover:not(.md2-sort-active) { svg { color: rgba(black, 0.26); opacity: 1; } } &.md2-sort-active { color: rgba(black, 0.87); svg { opacity: 1; } } } /* * Pagination */ md2-pagination { display: block; color: rgba(black, 0.54); user-select: none; &::before, &::after { display: table; content: ''; } &::after { clear: both; } .md2-pagination { display: inline-block; margin: 8px 0; padding: 0; li { position: relative; display: inline-block; width: 36px; vertical-align: top; text-align: center; line-height: 36px; border-radius: 100px; cursor: pointer; box-sizing: border-box; &:hover:not(.disabled):not(.active) { background: rgba(black, 0.12); } &.disabled { pointer-events: none; background: transparent; cursor: default; opacity: 0.48; } &.active { background: $primary; color: white; cursor: default; } svg { fill: currentColor; margin-bottom: -7px; } } } .md2-rows-select { display: inline-block; margin: 8px 0; padding: 0; float: right; color: rgba(black, 0.54); line-height: 36px; md2-select { display: inline-block; border: 0; outline: 0; } .md2-select-trigger { border-width: 0; min-width: 40px; } } } "],
        host: {
            '[class.md2-sort-active]': '_isAsc || _isDesc',
            '(click)': '_sort()'
        },
        encapsulation: ViewEncapsulation.None
    }),
    __metadata$26("design:paramtypes", [Md2DataTable])
], Md2DataTableSortBy);
let Md2Pagination = class Md2Pagination {
    constructor(_dataTable) {
        this._dataTable = _dataTable;
        this._activePage = 1;
        this.rowsPerPageSet = [];
        this._dataLength = 0;
        this.onPageChangeSubscriber = (event) => {
            this._activePage = event.activePage;
            this._rowsPerPage = event.rowsPerPage;
            this._dataLength = event.dataLength;
            this._lastPage = Math.ceil(this._dataLength / this._rowsPerPage);
        };
    }
    ngDoCheck() {
        this.md2Table = this.md2Table || this._dataTable;
        this.onPageChangeSubscriber(this.md2Table.getPage());
        this.md2Table.onPageChange.subscribe(this.onPageChangeSubscriber);
    }
    _setPage(pageNumber) {
        this.md2Table.setPage(pageNumber, this._rowsPerPage);
    }
    _setRows(event) {
        this.md2Table.setPage(this._activePage, parseInt(event.value));
    }
};
__decorate$47([
    Input(),
    __metadata$26("design:type", Object)
], Md2Pagination.prototype, "rowsPerPageSet", void 0);
__decorate$47([
    Input(),
    __metadata$26("design:type", Md2DataTable)
], Md2Pagination.prototype, "md2Table", void 0);
Md2Pagination = __decorate$47([
    Component({
        selector: 'md2-pagination',
        template: "<ul class=\"md2-pagination\" *ngIf=\"_dataLength > _rowsPerPage\"><li [class.disabled]=\"_activePage <= 1\" (click)=\"_setPage(_activePage - 1)\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/></svg></li><li *ngIf=\"_activePage > 4 && _activePage + 1 > _lastPage\" (click)=\"_setPage(_activePage - 4)\">{{_activePage-4}}</li><li *ngIf=\"_activePage > 3 && _activePage + 2 > _lastPage\" (click)=\"_setPage(_activePage - 3)\">{{_activePage-3}}</li><li *ngIf=\"_activePage > 2\" (click)=\"_setPage(_activePage - 2)\">{{_activePage-2}}</li><li *ngIf=\"_activePage > 1\" (click)=\"_setPage(_activePage - 1)\">{{_activePage-1}}</li><li class=\"active\">{{_activePage}}</li><li *ngIf=\"_activePage + 1 <= _lastPage\" (click)=\"_setPage(_activePage + 1)\">{{_activePage+1}}</li><li *ngIf=\"_activePage + 2 <= _lastPage\" (click)=\"_setPage(_activePage + 2)\">{{_activePage+2}}</li><li *ngIf=\"_activePage + 3 <= _lastPage && _activePage < 3\" (click)=\"_setPage(_activePage + 3)\">{{_activePage+3}}</li><li *ngIf=\"_activePage + 4 <= _lastPage && _activePage < 2\" (click)=\"_setPage(_activePage + 4)\">{{_activePage+4}}</li><li [class.disabled]=\"_activePage >= _lastPage\" (click)=\"_setPage(_activePage + 1)\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/></svg></li></ul><div class=\"md2-rows-select\" *ngIf=\"rowsPerPageSet.length && _dataLength > 0\">Rows per page:<md2-select [(ngModel)]=\"_rowsPerPage\" (change)=\"_setRows($event)\"><md2-option *ngFor=\"let row of rowsPerPageSet\" [value]=\"row\">{{row}}</md2-option></md2-select></div>",
        styles: ["[md2SortBy]{line-height:24px;color:rgba(0,0,0,.54);white-space:nowrap;cursor:pointer;user-select:none}[md2SortBy] svg{display:inline-block;vertical-align:middle;fill:currentColor;opacity:0}[md2SortBy]:hover:not(.md2-sort-active) svg{color:rgba(0,0,0,.26);opacity:1}[md2SortBy].md2-sort-active{color:rgba(0,0,0,.87)}[md2SortBy].md2-sort-active svg{opacity:1}md2-pagination{display:block;color:rgba(0,0,0,.54);user-select:none}md2-pagination::after,md2-pagination::before{display:table;content:''}md2-pagination::after{clear:both}md2-pagination .md2-pagination{display:inline-block;margin:8px 0;padding:0}md2-pagination .md2-pagination li{position:relative;display:inline-block;width:36px;vertical-align:top;text-align:center;line-height:36px;border-radius:100px;cursor:pointer;box-sizing:border-box}md2-pagination .md2-pagination li:hover:not(.disabled):not(.active){background:rgba(0,0,0,.12)}md2-pagination .md2-pagination li.disabled{pointer-events:none;background:0 0;cursor:default;opacity:.48}md2-pagination .md2-pagination li.active{background:#106cc8;color:#fff;cursor:default}md2-pagination .md2-pagination li svg{fill:currentColor;margin-bottom:-7px}md2-pagination .md2-rows-select{display:inline-block;margin:8px 0;padding:0;float:right;color:rgba(0,0,0,.54);line-height:36px}md2-pagination .md2-rows-select md2-select{display:inline-block;border:0;outline:0}md2-pagination .md2-rows-select .md2-select-trigger{border-width:0;min-width:40px} /*# sourceMappingURL=data-table.css.map */ "],
        exportAs: 'md2Pagination',
        encapsulation: ViewEncapsulation.None
    }),
    __param$7(0, Optional()),
    __metadata$26("design:paramtypes", [Md2DataTable])
], Md2Pagination);
const MD2_DATA_TABLE_DIRECTIVES = [
    Md2DataTable,
    Md2DataTableSortBy,
    Md2Pagination
];
let Md2DataTableModule = class Md2DataTableModule {
};
Md2DataTableModule = __decorate$47([
    NgModule({
        imports: [CommonModule, FormsModule, Md2SelectModule],
        exports: MD2_DATA_TABLE_DIRECTIVES,
        declarations: MD2_DATA_TABLE_DIRECTIVES,
    })
], Md2DataTableModule);

//# sourceMappingURL=index.js.map

var __decorate$55 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/** Whether the browser supports the Intl API. */
const SUPPORTS_INTL_API$1 = !!Intl;
/** Creates an array and fills it with values. */
function range$1(length, valueFunction) {
    return Array.apply(null, Array(length)).map((v, i) => valueFunction(i));
}
/** Date locale info. TODO(mmalerba): Integrate with i18n solution once we know what we're doing. */
let DateLocale = class DateLocale {
    /** Date locale info. TODO(mmalerba): Integrate with i18n solution once we know what we're doing. */
    constructor() {
        this.dates = [null].concat(SUPPORTS_INTL_API$1 ? this._createDatesArray('numeric') : range$1(31, i => String(i + 1)));
        this.getCalendarMonthHeaderLabel = this._createFormatFunction({ month: 'long', year: 'numeric' }) ||
            ((date) => this.shortMonths[date.getMonth()] + ' ' + date.getFullYear());
        this.getCalendarYearHeaderLabel = this._createFormatFunction({ year: 'numeric' }) ||
            ((date) => String(date.getFullYear()));
        this.firstDayOfWeek = 0;
        this.fullMonths = SUPPORTS_INTL_API$1 ? this._createMonthsArray('long') :
            [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];
        this.shortMonths = SUPPORTS_INTL_API$1 ? this._createMonthsArray('short') :
            ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.narrowMonths = SUPPORTS_INTL_API$1 ? this._createMonthsArray('narrow') :
            ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
        this.months = this.fullMonths.map((val, index) => {
            return { full: val, short: this.shortMonths[index], xshort: this.narrowMonths[index] };
        });
        this.fullDays = SUPPORTS_INTL_API$1 ? this._createDaysArray('long') :
            ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.shortDays = SUPPORTS_INTL_API$1 ? this._createDaysArray('short') :
            ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.narrowDays = SUPPORTS_INTL_API$1 ? this._createDaysArray('narrow') :
            ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        this.days = this.fullDays.map((val, index) => {
            return { full: val, short: this.shortDays[index], xshort: this.narrowDays[index] };
        });
    }
    parseDate(value) {
        if (value instanceof Date) {
            return value;
        }
        let timestamp = typeof value == 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    }
    _createDatesArray(format) {
        let dtf = new Intl.DateTimeFormat(undefined, { day: format });
        return range$1(31, i => dtf.format(new Date(2017, 0, i + 1)));
    }
    _createFormatFunction(options) {
        if (SUPPORTS_INTL_API$1) {
            let dtf = new Intl.DateTimeFormat(undefined, options);
            return (date) => dtf.format(date);
        }
        return null;
    }
    getDays() {
        return this.days.slice(this.firstDayOfWeek, this.days.length)
            .concat(this.days.slice(0, this.firstDayOfWeek));
    }
    getDayLabel(d) { return `${d}`; }
    getDateLabel(d) {
        return `${this.days[d.getDay()].short}, ${this.months[d.getMonth()].short} ${d.getDate()}`;
    }
    getMonthLabel(m, y) { return `${this.months[m].full} ${y}`; }
    getYearLabel(y) { return `${y}`; }
    _createMonthsArray(format) {
        let dtf = new Intl.DateTimeFormat(undefined, { month: format });
        return range$1(12, i => dtf.format(new Date(2017, i, 1)));
    }
    _createDaysArray(format) {
        let dtf = new Intl.DateTimeFormat(undefined, { weekday: format });
        return range$1(7, i => dtf.format(new Date(2017, 0, i + 1)));
    }
};
DateLocale = __decorate$55([
    Injectable()
], DateLocale);

class DateUtil {
    constructor() {
        this._locale = new DateLocale();
        this.parseDateMap = {
            'y': 0,
            'Y': [0, -2000],
            'M': [1, 1],
            'n': [1, this._locale.shortMonths],
            'N': [1, this._locale.fullMonths],
            'd': 2,
            'm': 4,
            'H': 3,
            'h': 3,
            'K': [3, 1],
            'k': [3, 1],
            's': 5,
            'S': 6,
            'a': [3, ['am', 'pm']],
            'A': [3, ['AM', 'PM']]
        };
    }
    today() {
        return new Date();
    }
    replace(s, regexp, sub) {
        return (s != null ? '' + s : '').replace(regexp, sub != null ? sub : '');
    }
    startsWith(base, start) {
        return start != null && base.substr(0, start.length) == start;
    }
    isType(s, o) {
        return typeof s == o;
    }
    isFunction(f) {
        return this.isType(f, 'function');
    }
    isList(v) {
        return !!v && v.length != null && !this.isString(v) && !this.isNode(v) && !this.isFunction(v);
    }
    isString(s) {
        return this.isType(s, 'string');
    }
    isObject(f) {
        return !!f && this.isType(f, 'object');
    }
    isNode(n) {
        return n && n['nodeType'];
    }
    isNumber(n) {
        return this.isType(n, 'number');
    }
    getFindFunc(findFunc) {
        return this.isFunction(findFunc) ? findFunc : (obj, index) => {
            if (findFunc === obj) {
                return index;
            }
        };
    }
    getFindIndex(list, index, defaultIndex) {
        return index == null ? defaultIndex :
            index < 0 ? Math.max(list.length + index, 0) : Math.min(list.length, index);
    }
    find(list, findFunc, startIndex, endIndex) {
        let f = this.getFindFunc(findFunc);
        let e = this.getFindIndex(list, endIndex, list.length);
        let r;
        for (let i = this.getFindIndex(list, startIndex, 0); i < e; i++) {
            if ((r = f.call(list, list[i], i)) != null) {
                return r;
            }
        }
    }
    parseDate(date, fmt) {
        let indexMap = {}; // contains reGroupPosition -> typeLetter or [typeLetter, value array]
        let reIndex = 1;
        let timezoneOffsetMatch;
        let timezoneIndex;
        let match;
        let format = this.replace(fmt, /^\?/);
        if (format != fmt && !this.replace(date, /^\s+|\s+$/g)) {
            return null;
        }
        if (match = /^\[([+-])(\d\d)(\d\d)\]\s*(.*)/.exec(format)) {
            timezoneOffsetMatch = match;
            format = match[4];
        }
        let parser = new RegExp(format.replace(/(.)(\1*)(?:\[([^\]]*)\])?/g, (wholeMatch, placeholderChar, placeholderDigits, param) => {
            if (/[dmhkyhs]/i.test(placeholderChar)) {
                indexMap[reIndex++] = placeholderChar;
                let plen = placeholderDigits.length + 1;
                return '(\\d' + (plen < 2 ? '+' : ('{1,' + plen + '}')) + ')';
            }
            else if (placeholderChar == 'z') {
                timezoneIndex = reIndex;
                reIndex += 3;
                return '([+-])(\\d\\d)(\\d\\d)';
            }
            else if (/[NnaA]/.test(placeholderChar)) {
                indexMap[reIndex++] = [placeholderChar, param && param.split(',')];
                return '([a-zA-Z\\u0080-\\u1fff]+)';
            }
            else if (/w/i.test(placeholderChar)) {
                return '[a-zA-Z\\u0080-\\u1fff]+';
            }
            else if (/\s/.test(placeholderChar)) {
                return '\\s+';
            }
            else {
                return this.replace(wholeMatch, /[\\\[\]\/{}()*+?.$|^-]/g, '\\$&');
            }
        }));
        if (!(match = parser.exec(date))) {
            return undefined;
        }
        let ctorArgs = [0, 0, 0, 0, 0, 0, 0];
        for (let i = 1; i < reIndex; i++) {
            let matchVal = match[i];
            let indexEntry = indexMap[i];
            if (this.isList(indexEntry)) {
                let placeholderChar = indexEntry[0];
                let mapEntry = this.parseDateMap[placeholderChar];
                let ctorIndex = mapEntry[0];
                let valList = indexEntry[1] || mapEntry[1];
                let listValue = this.find(valList, (v, index) => {
                    if (this.startsWith(matchVal.toLowerCase(), v.toLowerCase())) {
                        return index;
                    }
                });
                if (listValue == null) {
                    return undefined;
                }
                if (placeholderChar == 'a' || placeholderChar == 'A') {
                    ctorArgs[ctorIndex] += listValue * 12;
                }
                else {
                    ctorArgs[ctorIndex] = listValue;
                }
            }
            else if (indexEntry) {
                let value = parseFloat(matchVal);
                let mapEntry = this.parseDateMap[indexEntry];
                if (this.isList(mapEntry)) {
                    ctorArgs[mapEntry[0]] += value - mapEntry[1];
                }
                else {
                    ctorArgs[mapEntry] += value;
                }
            }
        }
        let d = new Date(ctorArgs[0], ctorArgs[1], ctorArgs[2], ctorArgs[3], ctorArgs[4], ctorArgs[5], ctorArgs[6]);
        return d;
    }
    parse(value, format) {
        let timestamp = typeof value == 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    }
    compareDate(first, second) {
        return this.getYear(first) - this.getYear(second) ||
            this.getMonth(first) - this.getMonth(second) ||
            this.getDate(first) - this.getDate(second);
    }
    getYear(date) {
        return date.getFullYear();
    }
    getMonth(date) {
        return date.getMonth();
    }
    getDate(date) {
        return date.getDate();
    }
    getHour(date) {
        return date.getHours();
    }
    getMinute(date) {
        return date.getMinutes();
    }
    /**
     * Gets the first day of the month for the given date's month.
     * @param {Date} date
     * @returns {Date}
     */
    getFirstDateOfWeek(date, firstDayOfWeek) {
        let day = date.getDate() - ((7 + date.getDay() - firstDayOfWeek) % 7);
        return new Date(date.getFullYear(), date.getMonth(), day, date.getHours(), date.getMinutes());
    }
    /**
     * Gets the first day of the month for the given date's month.
     * @param {Date} date
     * @returns {Date}
     */
    getFirstDateOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1, date.getHours(), date.getMinutes());
    }
    /**
     * Gets the number of days in the month for the given date's month.
     * @param date
     * @returns {number}
     */
    getNumberOfDaysInMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }
    /**
     * Get an arbitrary date in the month after the given date's month.
     * @param date
     * @returns {Date}
     */
    getDateInNextMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1, date.getHours(), date.getMinutes());
    }
    /**
     * Get an arbitrary date in the month before the given date's month.
     * @param date
     * @returns {Date}
     */
    getDateInPreviousMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() - 1, 1, date.getHours(), date.getMinutes());
    }
    /**
     * Gets whether two dates have the same month and year.
     * @param {Date} d1
     * @param {Date} d2
     * @returns {boolean}
     */
    isSameMonthAndYear(d1, d2) {
        return d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
    }
    /**
     * Gets whether two dates are the same day (not not necesarily the same time).
     * @param {Date} d1
     * @param {Date} d2
     * @returns {boolean}
     */
    isSameDay(d1, d2) {
        return d1 && d2 && d1.getDate() == d2.getDate() && this.isSameMonthAndYear(d1, d2);
    }
    /**
     * Gets whether two dates are the same hours.
     * @param {Date} d1
     * @param {Date} d2
     * @returns {boolean}
     */
    isSameHour(d1, d2) {
        return d1 && d2 && d1.getHours() == d2.getHours() && this.isSameDay(d1, d2);
    }
    /**
     * Gets whether two dates are the same minutes.
     * @param {Date} d1
     * @param {Date} d2
     * @returns {boolean}
     */
    isSameMinute(d1, d2) {
        return d1 && d2 && d1.getMinutes() == d2.getMinutes() && this.isSameHour(d1, d2);
    }
    /**
     * Gets whether a date is in the month immediately after some date.
     * @param {Date} startDate The date from which to compare.
     * @param {Date} endDate The date to check.
     * @returns {boolean}
     */
    isInNextMonth(startDate, endDate) {
        let nextMonth = this.getDateInNextMonth(startDate);
        return this.isSameMonthAndYear(nextMonth, endDate);
    }
    /**
     * Gets whether a date is in the month immediately before some date.
     * @param {Date} startDate The date from which to compare.
     * @param {Date} endDate The date to check.
     * @returns {boolean}
     */
    isInPreviousMonth(startDate, endDate) {
        let previousMonth = this.getDateInPreviousMonth(startDate);
        return this.isSameMonthAndYear(endDate, previousMonth);
    }
    /**
     * Gets the midpoint between two dates.
     * @param {Date} d1
     * @param {Date} d2
     * @returns {Date}
     */
    getDateMidpoint(d1, d2) {
        return this.createDateAtMidnight((d1.getTime() + d2.getTime()) / 2);
    }
    /**
     * Gets the week of the month that a given date occurs in.
     * @param {Date} date
     * @returns {number} Index of the week of the month (zero-based).
     */
    getWeekOfMonth(date) {
        let firstDayOfMonth = this.getFirstDateOfMonth(date);
        return Math.floor((firstDayOfMonth.getDay() + date.getDate() - 1) / 7);
    }
    /**
     * Gets a new date incremented by the given number of minutes. Number of minutes can be negative.
     * @param {Date} date
     * @param {number} numberOfMinutes
     * @returns {Date}
     */
    incrementMinutes(date, numberOfMinutes) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + numberOfMinutes);
    }
    /**
     * Gets a new date incremented by the given number of hours. Number of hours can be negative.
     * @param {Date} date
     * @param {number} numberOfHours
     * @returns {Date}
     */
    incrementHours(date, numberOfHours) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + numberOfHours, date.getMinutes());
    }
    /**
     * Gets a new date incremented by the given number of days. Number of days can be negative.
     * @param {Date} date
     * @param {number} numberOfDays
     * @returns {Date}
     */
    incrementDays(date, numberOfDays) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + numberOfDays, date.getHours(), date.getMinutes());
    }
    /**
     * Gets a new date incremented by the given number of months. Number of months can be negative.
     * If the date of the given month does not match the target month, the date will be set to the
     * last day of the month.
     * @param {Date} date
     * @param {number} numberOfMonths
     * @returns {Date}
     */
    incrementMonths(date, numberOfMonths) {
        // If the same date in the target month does not actually exist, the Date object will
        // automatically advance *another* month by the number of missing days.
        // For example, if you try to go from Jan. 30 to Feb. 30, you'll end up on March 2.
        // So, we check if the month overflowed and go to the last day of the target month instead.
        let dateInTargetMonth = new Date(date.getFullYear(), date.getMonth() + numberOfMonths, 1, date.getHours(), date.getMinutes());
        let numberOfDaysInMonth = this.getNumberOfDaysInMonth(dateInTargetMonth);
        if (numberOfDaysInMonth < date.getDate()) {
            dateInTargetMonth.setDate(numberOfDaysInMonth);
        }
        else {
            dateInTargetMonth.setDate(date.getDate());
        }
        return dateInTargetMonth;
    }
    /**
     * Get the integer distance between two months. This *only* considers the month and year
     * portion of the Date instances.
     *
     * @param {Date} start
     * @param {Date} end
     * @returns {number} Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    getMonthDistance(start, end) {
        return (12 * (end.getFullYear() - start.getFullYear())) + (end.getMonth() - start.getMonth());
    }
    /**
     * Gets the last day of the month for the given date.
     * @param {Date} date
     * @returns {Date}
     */
    getLastDateOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), this.getNumberOfDaysInMonth(date), date.getHours(), date.getMinutes());
    }
    /**
     * Checks whether a date is valid.
     * @param {Date} date
     * @return {boolean} Whether the date is a valid Date.
     */
    isValidDate(date) {
        return date != null && date.getTime && !isNaN(date.getTime());
    }
    /**
     * Sets a date's time to midnight.
     * @param {Date} date
     */
    setDateTimeToMidnight(date) {
        if (this.isValidDate(date)) {
            date.setHours(0, 0, 0, 0);
        }
    }
    /**
     * Creates a date with the time set to midnight.
     * Drop-in replacement for two forms of the Date constructor:
     * 1. No argument for Date representing now.
     * 2. Single-argument value representing number of seconds since Unix Epoch
     * or a Date object.
     * @param {number|Date=} value
     * @return {Date} New date with time set to midnight.
     */
    createDateAtMidnight(value) {
        let date;
        if (!value) {
            date = new Date();
        }
        else {
            date = new Date(value);
        }
        this.setDateTimeToMidnight(date);
        return date;
    }
    /**
     * Checks if a date is within a min and max range, ignoring the time component.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {Date} date
     * @param {Date} minDate
     * @param {Date} maxDate
     */
    isDateWithinRange(date, minDate, maxDate) {
        let dateAtMidnight = this.createDateAtMidnight(date);
        let minDateAtMidnight = this.isValidDate(minDate) ? this.createDateAtMidnight(minDate) : null;
        let maxDateAtMidnight = this.isValidDate(maxDate) ? this.createDateAtMidnight(maxDate) : null;
        return (!minDateAtMidnight || minDateAtMidnight <= dateAtMidnight) &&
            (!maxDateAtMidnight || maxDateAtMidnight >= dateAtMidnight);
    }
    /**
     * Checks if a date is within a min and max range.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {Date} date
     * @param {Date} minDate
     * @param {Date} maxDate
     */
    isDateWithinRange1(date, minDate, maxDate) {
        minDate = this.isValidDate(minDate) ? minDate : null;
        maxDate = this.isValidDate(maxDate) ? maxDate : null;
        return (!minDate || minDate <= date) &&
            (!maxDate || maxDate >= date);
    }
    /**
     * Gets a new date incremented by the given number of years. Number of years can be negative.
     * See `incrementMonths` for notes on overflow for specific dates.
     * @param {Date} date
     * @param {number} numberOfYears
     * @returns {Date}
     */
    incrementYears(date, numberOfYears) {
        return this.incrementMonths(date, numberOfYears * 12);
    }
    /**
     * Get the integer distance between two years. This *only* considers the year portion of the
     * Date instances.
     *
     * @param {Date} start
     * @param {Date} end
     * @returns {number} Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    getYearDistance(start, end) {
        return end.getFullYear() - start.getFullYear();
    }
    /**
     * Clamps a date between a minimum and a maximum date.
     * @param {Date} date Date to be clamped
     * @param {Date=} minDate Minimum date
     * @param {Date=} maxDate Maximum date
     * @return {Date}
     */
    clampDate(date, minDate, maxDate) {
        let boundDate = date;
        if (minDate && date < minDate) {
            boundDate = new Date(minDate.getTime());
        }
        if (maxDate && date > maxDate) {
            boundDate = new Date(maxDate.getTime());
        }
        return boundDate;
    }
    /**
     * Extracts and parses the timestamp from a DOM node.
     * @param  {HTMLElement} node Node from which the timestamp will be extracted.
     * @return {number} Time since epoch.
     */
    getTimestampFromNode(node) {
        if (node && node.hasAttribute('data-timestamp')) {
            return Number(node.getAttribute('data-timestamp'));
        }
    }
    /**
     * Checks if a month is within a min and max range, ignoring the date and time components.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {Date} date
     * @param {Date} minDate
     * @param {Date} maxDate
     */
    isMonthWithinRange(date, minDate, maxDate) {
        let month = date.getMonth();
        let year = date.getFullYear();
        return (!minDate || minDate.getFullYear() < year || minDate.getMonth() <= month) &&
            (!maxDate || maxDate.getFullYear() > year || maxDate.getMonth() >= month);
    }
}

/**
 * This animation fades in the background color and text content of the
 * select's options. It is time delayed to occur 100ms after the overlay
 * panel has transformed in.
 */
const fadeInContent$1 = trigger('fadeInContent', [
    state('showing', style({ opacity: 1 })),
    transition('void => showing', [
        style({ opacity: 0 }),
        animate(`150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)`)
    ])
]);
const slideCalendar = trigger('slideCalendar', [
    transition('* => left', [
        animate(180, keyframes([
            style({ transform: 'translateX(100%)', offset: 0.5 }),
            style({ transform: 'translateX(-100%)', offset: 0.51 }),
            style({ transform: 'translateX(0)', offset: 1 })
        ]))
    ]),
    transition('* => right', [
        animate(180, keyframes([
            style({ transform: 'translateX(-100%)', offset: 0.5 }),
            style({ transform: 'translateX(100%)', offset: 0.51 }),
            style({ transform: 'translateX(0)', offset: 1 })
        ]))
    ])
]);

var __decorate$54 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$30 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$10 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/** Change event object emitted by Md2Select. */
class Md2DateChange {
    constructor(source, value) {
        this.source = source;
        this.value = value;
    }
}
let Md2Datepicker = class Md2Datepicker {
    constructor(_element, _overlay, _dateAdapter, _viewContainerRef, _locale, _scrollDispatcher, _util, _control) {
        this._element = _element;
        this._overlay = _overlay;
        this._dateAdapter = _dateAdapter;
        this._viewContainerRef = _viewContainerRef;
        this._locale = _locale;
        this._scrollDispatcher = _scrollDispatcher;
        this._util = _util;
        this._control = _control;
        this._value = null;
        this._panelOpen = false;
        this._openOnFocus = false;
        this._type = 'date';
        this._mode = 'auto';
        this._container = 'inline';
        this._required = false;
        this._disabled = false;
        this.today = new Date();
        this._years = [];
        this._dates = [];
        this._clockView = 'hour';
        this._prevMonth = 1;
        this._currMonth = 2;
        this._nextMonth = 3;
        this._transformOrigin = 'top';
        this._panelDoneAnimating = false;
        this._inputFocused = false;
        this._onChange = (value) => { };
        this._onTouched = () => { };
        this._validatorOnChange = () => { };
        /** Event emitted when the select has been opened. */
        this.onOpen = new EventEmitter();
        /** Event emitted when the select has been closed. */
        this.onClose = new EventEmitter();
        /** Event emitted when the selected date has been changed by the user. */
        this.change = new EventEmitter();
        /** The view that the calendar should start in. */
        this.startView = 'month';
        /** Date filter for the month and year views. */
        this._dateFilterForViews = (date) => {
            return !!date &&
                (!this.dateFilter || this.dateFilter(date)) &&
                (!this.min || this._dateAdapter.compareDate(date, this.min) >= 0) &&
                (!this.max || this._dateAdapter.compareDate(date, this.max) <= 0);
        };
        this.okLabel = 'Ok';
        this.cancelLabel = 'Cancel';
        this.tabindex = 0;
        this.enableDates = [];
        this.disableDates = [];
        this.disableWeekDays = [];
        this.timeInterval = 1;
        /** The form control validator for the min date. */
        this._minValidator = (control) => {
            return (!this.min || !control.value ||
                this._util.compareDate(this.min, control.value) < 0) ?
                null : { 'mdDatepickerMin': { 'min': this.min, 'actual': control.value } };
        };
        /** The form control validator for the max date. */
        this._maxValidator = (control) => {
            return (!this.max || !control.value ||
                this._util.compareDate(this.max, control.value) > 0) ?
                null : { 'mdDatepickerMax': { 'max': this.max, 'actual': control.value } };
        };
        /** The form control validator for the date filter. */
        this._filterValidator = (control) => {
            return !this._util || !control.value || this._dateFilter(control.value) ?
                null : { 'mdDatepickerFilter': true };
        };
        this._validator = Validators.compose([this._minValidator, this._maxValidator, this._filterValidator]);
        if (this._control) {
            this._control.valueAccessor = this;
        }
        this._weekDays = this._locale.getDays();
        this.getYears();
    }
    ngAfterContentInit() {
        this.activeDate = this._activeDate || this._util.today();
    }
    ngOnDestroy() { this.destroyPanel(); }
    registerOnValidatorChange(fn) {
        this._validatorOnChange = fn;
    }
    get type() { return this._type; }
    set type(value) {
        this._type = value || 'date';
        this._input.nativeElement.value = this._formatDate(this._value);
    }
    get format() {
        return this._format || (this.type === 'date' ?
            'dd/MM/y' : this.type === 'time' ? 'HH:mm' : this.type === 'datetime' ?
            'dd/MM/y HH:mm' : 'dd/MM/y');
    }
    set format(value) {
        if (this._format !== value) {
            this._format = value;
            this._input.nativeElement.value = this._formatDate(this._value);
        }
    }
    get mode() { return this._mode; }
    set mode(value) {
        this._mode = value || 'auto';
    }
    get container() { return this._container; }
    set container(value) {
        if (this._container !== value) {
            this._container = value || 'inline';
            this.destroyPanel();
        }
    }
    get value() { return this._value; }
    set value(value) {
        this._value = this.coerceDateProperty(value);
        if (this._value) {
            this.activeDate = this._value;
        }
        setTimeout(() => {
            this._input.nativeElement.value = this._formatDate(this._value);
        });
    }
    get activeDate() { return this._activeDate; }
    set activeDate(value) {
        this._activeDate = this._util.clampDate(value, this.min, this.max);
    }
    get minutes() {
        return ('0' + this._activeDate.getMinutes()).slice(-2);
    }
    get hours() {
        if (!this.is12HourClock()) {
            return ('0' + this._activeDate.getHours()).slice(-2);
        }
        else {
            return ('0' + this._getHours12(this._activeDate)).slice(-2);
        }
    }
    /**
     * Return the am/pm part of the hour description
     * @param upperCase  boolean if true return AM/PM, default false
     * @return string the am/pm part of the hour description
     */
    _ampm(upperCase = false) {
        if (this.is12HourClock()) {
            if (upperCase) {
                return (this._activeDate.getHours() < 12) ? 'AM' : 'PM';
            }
            else {
                return (this._activeDate.getHours() < 12) ? 'am' : 'pm';
            }
        }
        else {
            return '';
        }
    }
    get required() { return this._required; }
    set required(value) { this._required = coerceBooleanProperty(value); }
    get disabled() { return this._disabled; }
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /** The minimum selectable date. */
    get min() { return this._min; }
    set min(date) {
        this._min = this._util.parse(date);
        this.getYears();
        this._validatorOnChange();
    }
    /** The maximum selectable date. */
    get max() { return this._max; }
    set max(date) {
        this._max = this._util.parse(date);
        this.getYears();
        this._validatorOnChange();
    }
    get openOnFocus() { return this._openOnFocus; }
    set openOnFocus(value) { this._openOnFocus = coerceBooleanProperty(value); }
    set isOpen(value) {
        if (value && !this.panelOpen) {
            this.open();
        }
    }
    get panelOpen() {
        return this._panelOpen;
    }
    get getDateLabel() {
        return this._locale.getDateLabel(this.activeDate);
    }
    get getMonthLabel() {
        return this._locale.getMonthLabel(this.activeDate.getMonth(), this.activeDate.getFullYear());
    }
    toggle() {
        this.panelOpen ? this.close() : this.open();
    }
    /** Opens the overlay panel. */
    open() {
        if (this.disabled) {
            return;
        }
        this._isCalendarVisible = this.type !== 'time' ? true : false;
        this._createOverlay();
        if (!this._portal) {
            this._portal = new TemplatePortal(this._templatePortal, this._viewContainerRef);
        }
        this._overlayRef.attach(this._portal);
        this._subscribeToBackdrop();
        this._panelOpen = true;
        this.selected = this.value || new Date(1, 0, 1);
        this.activeDate = this.value || this.today;
        this.generateCalendar();
    }
    /** Closes the overlay panel and focuses the host element. */
    close() {
        setTimeout(() => {
            this._panelOpen = false;
            if (this._openOnFocus) {
                this._openOnFocus = false;
                setTimeout(() => { this._openOnFocus = true; }, 100);
            }
            if (this._overlayRef) {
                this._overlayRef.detach();
                this._backdropSubscription.unsubscribe();
            }
            this._focusHost();
            this._isYearsVisible = false;
            this._isCalendarVisible = this.type !== 'time' ? true : false;
            this._clockView = 'hour';
        }, 10);
    }
    /** Removes the panel from the DOM. */
    destroyPanel() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._cleanUpSubscriptions();
        }
    }
    _onPanelDone() {
        if (this.panelOpen) {
            this._focusPanel();
            this.onOpen.emit();
        }
        else {
            this.onClose.emit();
        }
    }
    _onFadeInDone() {
        this._panelDoneAnimating = this.panelOpen;
    }
    _handleWindowResize(event) {
        if (this.container === 'inline') {
            this.close();
        }
    }
    _focusPanel() {
        let el = document.querySelectorAll('.md2-datepicker-panel')[0];
        el.focus();
    }
    _focusHost() {
        this._element.nativeElement.querySelectorAll('input')[0].focus();
    }
    coerceDateProperty(value) {
        let v = null;
        if (this._util.isValidDate(value)) {
            v = value;
        }
        else {
            if (value && this.type === 'time') {
                let t = value + '';
                v = new Date();
                v.setHours(parseInt(t.substring(0, 2)));
                v.setMinutes(parseInt(t.substring(3, 5)));
            }
            else {
                let timestamp = Date.parse(value);
                v = isNaN(timestamp) ? null : new Date(timestamp);
            }
        }
        return v;
    }
    _handleClick(event) {
        if (this.disabled) {
            event.stopPropagation();
            event.preventDefault();
            return;
        }
    }
    _handleKeydown(event) {
        if (this.disabled) {
            return;
        }
        if (this.panelOpen) {
            event.preventDefault();
            event.stopPropagation();
            switch (event.keyCode) {
                case TAB:
                case ESCAPE:
                    this._onBlur();
                    this.close();
                    break;
            }
            let date = this.activeDate;
            if (this._isYearsVisible) {
                switch (event.keyCode) {
                    case ENTER:
                        this._onClickOk();
                        break;
                    case DOWN_ARROW:
                        if (this.activeDate.getFullYear() < (this.today.getFullYear() + 100)) {
                            this.activeDate = this._util.incrementYears(date, 1);
                            this._scrollToSelectedYear();
                        }
                        break;
                    case UP_ARROW:
                        if (this.activeDate.getFullYear() > 1900) {
                            this.activeDate = this._util.incrementYears(date, -1);
                            this._scrollToSelectedYear();
                        }
                        break;
                }
            }
            else if (this._isCalendarVisible) {
                switch (event.keyCode) {
                    case ENTER:
                        this._dateSelected(this.activeDate);
                        break;
                    case RIGHT_ARROW:
                        this.activeDate = this._util.incrementDays(date, 1);
                        break;
                    case LEFT_ARROW:
                        this.activeDate = this._util.incrementDays(date, -1);
                        break;
                    case PAGE_DOWN:
                        if (event.shiftKey) {
                            this.activeDate = this._util.incrementYears(date, 1);
                        }
                        else {
                            this.activeDate = this._util.incrementMonths(date, 1);
                        }
                        break;
                    case PAGE_UP:
                        if (event.shiftKey) {
                            this.activeDate = this._util.incrementYears(date, -1);
                        }
                        else {
                            this.activeDate = this._util.incrementMonths(date, -1);
                        }
                        break;
                    case DOWN_ARROW:
                        this.activeDate = this._util.incrementDays(date, 7);
                        break;
                    case UP_ARROW:
                        this.activeDate = this._util.incrementDays(date, -7);
                        break;
                    case HOME:
                        this.activeDate = this._util.getFirstDateOfMonth(date);
                        break;
                    case END:
                        this.activeDate = this._util.getLastDateOfMonth(date);
                        break;
                }
                if (!this._util.isSameMonthAndYear(date, this.activeDate)) {
                    this.generateCalendar();
                }
            }
            else if (this._clockView === 'hour') {
                switch (event.keyCode) {
                    case ENTER:
                        this._hourSelected(this.activeDate.getHours());
                        break;
                    case UP_ARROW:
                        this.activeDate = this._util.incrementHours(date, 1);
                        break;
                    case DOWN_ARROW:
                        this.activeDate = this._util.incrementHours(date, -1);
                        break;
                }
            }
            else {
                switch (event.keyCode) {
                    case ENTER:
                        this._minuteSelected(this.activeDate.getMinutes());
                        break;
                    case UP_ARROW:
                        this.activeDate = this._util.incrementMinutes(date, 1);
                        break;
                    case DOWN_ARROW:
                        this.activeDate = this._util.incrementMinutes(date, -1);
                        break;
                }
            }
        }
        else {
            switch (event.keyCode) {
                case ENTER:
                    event.preventDefault();
                    event.stopPropagation();
                    this.open();
                    break;
            }
        }
    }
    _onBlur() {
        if (!this.panelOpen) {
            this._onTouched();
        }
    }
    _handleFocus(event) {
        this._inputFocused = true;
        if (!this.panelOpen && this.openOnFocus) {
            this.open();
        }
    }
    _handleBlur(event) {
        this._inputFocused = false;
        if (!this.panelOpen) {
            this._onTouched();
        }
        let el = event.target;
        let date = this._util.parseDate(el.value, this.format);
        if (!date) {
            date = this._util.parse(el.value, this.format);
        }
        if (this._util.isValidDate(date)) {
            let d = new Date(this.value);
            if (this.type !== 'time') {
                d.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
            }
            if (this.type !== 'date') {
                d.setHours(date.getHours(), date.getMinutes());
            }
            if (!this._util.isSameMinute(this.value, d)) {
                this.value = d;
                this._emitChangeEvent();
            }
        }
        else {
            if (this.value) {
                this.value = null;
                this._emitChangeEvent();
            }
        }
    }
    /**
     * Display Years
     */
    _showYear() {
        this._isYearsVisible = true;
        this._isCalendarVisible = true;
        //this._scrollToSelectedYear();
    }
    getYears() {
        let startYear = this.min ? this.min.getFullYear() : 1900, endYear = this._max ? this._max.getFullYear() : this.today.getFullYear() + 100;
        this._years = [];
        for (let i = startYear; i <= endYear; i++) {
            this._years.push(i);
        }
    }
    _scrollToSelectedYear() {
        setTimeout(() => {
            let yearContainer = document.querySelector('.md2-calendar-years'), selectedYear = document.querySelector('.md2-calendar-year.selected');
            yearContainer.scrollTop = (selectedYear.offsetTop + 20) - yearContainer.clientHeight / 2;
        }, 0);
    }
    /**
     * select year
     * @param year
     */
    _setYear(year) {
        this.activeDate = new Date(year, this.activeDate.getMonth(), this.activeDate.getDate(), this.activeDate.getHours(), this.activeDate.getMinutes());
        this.generateCalendar();
        this._isYearsVisible = false;
    }
    /**
     * Display Calendar
     */
    _showCalendar() {
        this._isYearsVisible = false;
        this._isCalendarVisible = true;
    }
    /**
     * Toggle Hour visiblity
     */
    _toggleHours(value) {
        this._isYearsVisible = false;
        this._isCalendarVisible = false;
        this._clockView = value;
    }
    /**
     * Ok Button Event
     */
    _onClickOk() {
        if (this._isYearsVisible) {
            this.generateCalendar();
            this._isYearsVisible = false;
            this._isCalendarVisible = true;
        }
        else if (this._isCalendarVisible) {
            this._dateSelected(this.activeDate);
        }
        else if (this._clockView === 'hour') {
            this._clockView = 'minute';
        }
        else {
            this.value = this.activeDate;
            this._emitChangeEvent();
            this._onBlur();
            this.close();
        }
    }
    /**
     * Date Selection Event
     * @param event Event Object
     * @param date Date Object
     */
    _onClickDate(event, date) {
        event.preventDefault();
        event.stopPropagation();
        if (date.disabled) {
            return;
        }
        if (date.calMonth === this._prevMonth) {
            this._updateMonth(-1);
        }
        else if (date.calMonth === this._currMonth) {
            this._dateSelected(date.date);
        }
        else if (date.calMonth === this._nextMonth) {
            this._updateMonth(1);
        }
    }
    /**
     * date selected
     * @param date Date Object
     */
    _dateSelected(date) {
        if (this.type === 'date') {
            this.value = date;
            this._emitChangeEvent();
            this._onBlur();
            this.close();
        }
        else {
            this.selected = date;
            this.activeDate = date;
            this._isCalendarVisible = false;
            this._clockView = 'hour';
        }
    }
    /**
     * Update Month
     * @param noOfMonths increment number of months
     */
    _updateMonth(noOfMonths) {
        this.activeDate = this._util.incrementMonths(this.activeDate, noOfMonths);
        this.generateCalendar();
        if (noOfMonths > 0) {
            this.calendarState('right');
        }
        else {
            this.calendarState('left');
        }
    }
    /**
     * Check is Before month enabled or not
     * @return boolean
     */
    _isBeforeMonth() {
        return !this.min ? true :
            this.min && this._util.getMonthDistance(this.activeDate, this.min) < 0;
    }
    /**
     * Check is After month enabled or not
     * @return boolean
     */
    _isAfterMonth() {
        return !this._max ? true :
            this._max && this._util.getMonthDistance(this.activeDate, this._max) > 0;
    }
    _onActiveDateChange(date) {
        this.activeDate = date;
    }
    _onDateChange(date) {
        this.value = date;
        if (this._isYearsVisible) {
            this._isYearsVisible = false;
        }
        else {
            this._dateSelected(date);
        }
    }
    _onTimeChange(event) {
        this.value = event;
        if (this._clockView === 'hour') {
            this._clockView = 'minute';
        }
        else {
            this._emitChangeEvent();
            this._clockView = 'hour';
            this._onBlur();
            this.close();
        }
    }
    /**
     * Check the date is enabled or not
     * @param date Date Object
     * @return boolean
     */
    _isDisabledDate(date) {
        for (let d of this.enableDates) {
            if (this._util.isSameDay(date, d)) {
                return false;
            }
        }
        for (let d of this.disableDates) {
            if (this._util.isSameDay(date, d)) {
                return true;
            }
        }
        for (let d of this.disableWeekDays) {
            if (date.getDay() === d) {
                return true;
            }
        }
        return !this._util.isDateWithinRange(date, this.min, this._max);
    }
    /**
     * Generate Month Calendar
     */
    generateCalendar() {
        this._dates.length = 0;
        let year = this.activeDate.getFullYear();
        let month = this.activeDate.getMonth();
        let firstDayOfMonth = this._util.getFirstDateOfMonth(this.activeDate);
        let calMonth = this._prevMonth;
        let date = this._util.getFirstDateOfWeek(firstDayOfMonth, this._locale.firstDayOfWeek);
        do {
            let week = [];
            for (let i = 0; i < 7; i++) {
                if (date.getDate() === 1) {
                    if (calMonth === this._prevMonth) {
                        calMonth = this._currMonth;
                    }
                    else {
                        calMonth = this._nextMonth;
                    }
                }
                week.push({
                    date: date,
                    index: date.getDate(),
                    calMonth: calMonth,
                    today: this._util.isSameDay(this.today, date),
                    disabled: this._isDisabledDate(date)
                });
                date = new Date(date.getTime());
                date.setDate(date.getDate() + 1);
            }
            this._dates.push(week);
        } while ((date.getMonth() <= month) && (date.getFullYear() === year));
    }
    /**
     * Set hours
     * @param hour number of hours
     */
    _hourSelected(hour) {
        this._clockView = 'minute';
        this.activeDate = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(), this.activeDate.getDate(), hour, this.activeDate.getMinutes());
    }
    /**
     * Set minutes
     * @param minute number of minutes
     */
    _minuteSelected(minute) {
        this.activeDate = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(), this.activeDate.getDate(), this.activeDate.getHours(), minute);
        this.selected = this.activeDate;
        this.value = this.activeDate;
        this._emitChangeEvent();
        this._onBlur();
        this.close();
    }
    /** Emits an event when the user selects a date. */
    _emitChangeEvent() {
        this._onChange(this.value);
        this.change.emit(new Md2DateChange(this, this.value));
    }
    validate(c) {
        return this._validator ? this._validator(c) : null;
    }
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) { this._onChange = fn; }
    registerOnTouched(fn) { this._onTouched = fn; }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * Get an hour of the date in the 12-hour format
     * @param date Date Object
     * @return hour of the date in the 12-hour format
     */
    _getHours12(date) {
        let hrs = date.getHours();
        if (hrs == 0) {
            hrs = 12;
        }
        else if (hrs > 12) {
            hrs -= 12;
        }
        return hrs;
    }
    is12HourClock() {
        return /[aA]/.test(this.format);
    }
    /**
     * format date
     * @param date Date Object
     * @return string with formatted date
     */
    _formatDate(date) {
        if (!this.format || !date) {
            return '';
        }
        let format = this.format;
        // Years
        if (format.indexOf('yy') > -1) {
            format = format.replace('yy', ('00' + date.getFullYear()).slice(-2));
        }
        else if (format.indexOf('y') > -1) {
            format = format.replace('y', '' + date.getFullYear());
        }
        // Days
        if (format.indexOf('dd') > -1) {
            format = format.replace('dd', ('0' + date.getDate()).slice(-2));
        }
        else if (format.indexOf('d') > -1) {
            format = format.replace('d', '' + date.getDate());
        }
        // Hours
        if (/[aA]/.test(format)) {
            // 12-hour
            if (format.indexOf('HH') > -1) {
                format = format.replace('HH', ('0' + this._getHours12(date)).slice(-2));
            }
            else if (format.indexOf('H') > -1) {
                format = format.replace('H', '' + this._getHours12(date));
            }
            format = format.replace('A', ((date.getHours() < 12) ? 'AM' : 'PM'))
                .replace('a', ((date.getHours() < 12) ? 'am' : 'pm'));
        }
        else {
            // 24-hour
            if (format.indexOf('HH') > -1) {
                format = format.replace('HH', ('0' + date.getHours()).slice(-2));
            }
            else if (format.indexOf('H') > -1) {
                format = format.replace('H', '' + date.getHours());
            }
        }
        // Minutes
        if (format.indexOf('mm') > -1) {
            format = format.replace('mm', ('0' + date.getMinutes()).slice(-2));
        }
        else if (format.indexOf('m') > -1) {
            format = format.replace('m', '' + date.getMinutes());
        }
        // Seconds
        if (format.indexOf('ss') > -1) {
            format = format.replace('ss', ('0' + date.getSeconds()).slice(-2));
        }
        else if (format.indexOf('s') > -1) {
            format = format.replace('s', '' + date.getSeconds());
        }
        // Months
        if (format.indexOf('MMMM') > -1) {
            format = format.replace('MMMM', this._locale.months[date.getMonth()].full);
        }
        else if (format.indexOf('MMM') > -1) {
            format = format.replace('MMM', this._locale.months[date.getMonth()].short);
        }
        else if (format.indexOf('MM') > -1) {
            format = format.replace('MM', ('0' + (date.getMonth() + 1)).slice(-2));
        }
        else if (format.indexOf('M') > -1) {
            format = format.replace('M', '' + (date.getMonth() + 1));
        }
        return format;
    }
    _subscribeToBackdrop() {
        this._backdropSubscription = this._overlayRef.backdropClick().subscribe(() => {
            this.close();
        });
    }
    /**
     *  This method creates the overlay from the provided panel's template and saves its
     *  OverlayRef so that it can be attached to the DOM when open is called.
     */
    _createOverlay() {
        if (!this._overlayRef) {
            let config = new OverlayState();
            if (this.container === 'inline') {
                config.positionStrategy = this._createPickerPositionStrategy();
                config.hasBackdrop = true;
                config.backdropClass = 'cdk-overlay-transparent-backdrop';
                config.scrollStrategy = new RepositionScrollStrategy(this._scrollDispatcher);
            }
            else {
                config.positionStrategy = this._overlay.position()
                    .global()
                    .centerHorizontally()
                    .centerVertically();
                config.hasBackdrop = true;
            }
            this._overlayRef = this._overlay.create(config);
        }
    }
    /** Create the popup PositionStrategy. */
    _createPickerPositionStrategy() {
        return this._overlay.position()
            .connectedTo(this._element, { originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' })
            .withFallbackPosition({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'top' })
            .withFallbackPosition({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'bottom' })
            .withFallbackPosition({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'bottom' });
    }
    _cleanUpSubscriptions() {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
    }
    calendarState(direction) {
        this._calendarState = direction;
        setTimeout(() => this._calendarState = '', 180);
    }
};
__decorate$54([
    ViewChild('portal'),
    __metadata$30("design:type", TemplateRef)
], Md2Datepicker.prototype, "_templatePortal", void 0);
__decorate$54([
    ViewChild('input'),
    __metadata$30("design:type", ElementRef)
], Md2Datepicker.prototype, "_input", void 0);
__decorate$54([
    Output(),
    __metadata$30("design:type", EventEmitter)
], Md2Datepicker.prototype, "onOpen", void 0);
__decorate$54([
    Output(),
    __metadata$30("design:type", EventEmitter)
], Md2Datepicker.prototype, "onClose", void 0);
__decorate$54([
    Output(),
    __metadata$30("design:type", EventEmitter)
], Md2Datepicker.prototype, "change", void 0);
__decorate$54([
    Input(),
    __metadata$30("design:type", String)
], Md2Datepicker.prototype, "startView", void 0);
__decorate$54([
    Input(),
    __metadata$30("design:type", Function)
], Md2Datepicker.prototype, "dateFilter", void 0);
__decorate$54([
    Input(),
    __metadata$30("design:type", String)
], Md2Datepicker.prototype, "placeholder", void 0);
__decorate$54([
    Input(),
    __metadata$30("design:type", String)
], Md2Datepicker.prototype, "okLabel", void 0);
__decorate$54([
    Input(),
    __metadata$30("design:type", String)
], Md2Datepicker.prototype, "cancelLabel", void 0);
__decorate$54([
    Input(),
    __metadata$30("design:type", Number)
], Md2Datepicker.prototype, "tabindex", void 0);
__decorate$54([
    Input(),
    __metadata$30("design:type", Array)
], Md2Datepicker.prototype, "enableDates", void 0);
__decorate$54([
    Input(),
    __metadata$30("design:type", Array)
], Md2Datepicker.prototype, "disableDates", void 0);
__decorate$54([
    Input(),
    __metadata$30("design:type", Array)
], Md2Datepicker.prototype, "disableWeekDays", void 0);
__decorate$54([
    Input(),
    __metadata$30("design:type", Number)
], Md2Datepicker.prototype, "timeInterval", void 0);
__decorate$54([
    Input(),
    __metadata$30("design:type", Object),
    __metadata$30("design:paramtypes", [String])
], Md2Datepicker.prototype, "type", null);
__decorate$54([
    Input(),
    __metadata$30("design:type", Object),
    __metadata$30("design:paramtypes", [String])
], Md2Datepicker.prototype, "format", null);
__decorate$54([
    Input(),
    __metadata$30("design:type", Object),
    __metadata$30("design:paramtypes", [String])
], Md2Datepicker.prototype, "mode", null);
__decorate$54([
    Input(),
    __metadata$30("design:type", Object),
    __metadata$30("design:paramtypes", [String])
], Md2Datepicker.prototype, "container", null);
__decorate$54([
    Input(),
    __metadata$30("design:type", Object),
    __metadata$30("design:paramtypes", [Date])
], Md2Datepicker.prototype, "value", null);
__decorate$54([
    Input(),
    __metadata$30("design:type", Date)
], Md2Datepicker.prototype, "selected", void 0);
__decorate$54([
    Input(),
    __metadata$30("design:type", Boolean),
    __metadata$30("design:paramtypes", [Object])
], Md2Datepicker.prototype, "required", null);
__decorate$54([
    Input(),
    __metadata$30("design:type", Boolean),
    __metadata$30("design:paramtypes", [Object])
], Md2Datepicker.prototype, "disabled", null);
__decorate$54([
    Input(),
    __metadata$30("design:type", Date),
    __metadata$30("design:paramtypes", [Date])
], Md2Datepicker.prototype, "min", null);
__decorate$54([
    Input(),
    __metadata$30("design:type", Date),
    __metadata$30("design:paramtypes", [Date])
], Md2Datepicker.prototype, "max", null);
__decorate$54([
    Input(),
    __metadata$30("design:type", Boolean),
    __metadata$30("design:paramtypes", [Boolean])
], Md2Datepicker.prototype, "openOnFocus", null);
__decorate$54([
    Input(),
    __metadata$30("design:type", Boolean),
    __metadata$30("design:paramtypes", [Boolean])
], Md2Datepicker.prototype, "isOpen", null);
__decorate$54([
    HostListener('click', ['$event']),
    __metadata$30("design:type", Function),
    __metadata$30("design:paramtypes", [MouseEvent]),
    __metadata$30("design:returntype", void 0)
], Md2Datepicker.prototype, "_handleClick", null);
Md2Datepicker = __decorate$54([
    Component({selector: 'md2-datepicker',
        template: "<div class=\"md2-datepicker-trigger\"><button type=\"button\" class=\"md2-datepicker-button\" tabindex=\"-1\" (click)=\"toggle()\"><svg *ngIf=\"type==='date'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"></path></svg> <svg *ngIf=\"type==='time'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z\"></path></svg> <svg *ngIf=\"type==='datetime'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z\"></path></svg></button><div class=\"md2-datepicker-input\" [class.md2-datepicker-input-focused]=\"_inputFocused\"><span class=\"md2-datepicker-placeholder\" [class.md2-floating-placeholder]=\"value || _inputFocused\">{{ placeholder }}</span> <input #input type=\"text\" class=\"md2-datepicker-value\" [tabindex]=\"tabindex\" [disabled]=\"disabled\" autocomplete=\"off\" (change)=\"$event.stopPropagation()\" (click)=\"_handleFocus($event)\" (focus)=\"_handleFocus($event)\" (blur)=\"_handleBlur($event)\" (keydown)=\"_handleKeydown($event)\" readonly=\"readonly\"> <span class=\"md2-datepicker-arrow\" (click)=\"toggle()\"></span></div></div><ng-template #portal><div class=\"md2-datepicker-panel\" [@fadeInContent]=\"'showing'\" (@fadeInContent.done)=\"_onPanelDone()\" (keydown)=\"_handleKeydown($event)\" [style.transformOrigin]=\"_transformOrigin\" [class.md2-datepicker-panel-done-animating]=\"_panelDoneAnimating\" tabindex=\"0\" [attr.container]=\"container\" [attr.mode]=\"mode\"><div class=\"md2-datepicker-header\"><div class=\"md2-datepicker-header-year\" *ngIf=\"type!=='time'\" [class.active]=\"_isYearsVisible\" (click)=\"_showYear()\">{{ activeDate | date: 'y' }}</div><div class=\"md2-datepicker-header-date-time\"><span class=\"md2-datepicker-header-date\" *ngIf=\"type!=='time'\" [class.active]=\"_isCalendarVisible && !_isYearsVisible\" (click)=\"_showCalendar()\">{{ getDateLabel }} </span><span class=\"md2-datepicker-header-time\" *ngIf=\"type!=='date'\" [class.active]=\"!_isCalendarVisible\"><span class=\"md2-datepicker-header-hour\" [class.active]=\"_clockView === 'hour'\" (click)=\"_toggleHours('hour')\">{{ hours }}</span>:<span class=\"md2-datepicker-header-minute\" [class.active]=\"_clockView === 'minute'\" (click)=\"_toggleHours('minute')\">{{ minutes }}</span> <span class=\"md2-datepicker-header-ampm\" *ngIf=\"is12HourClock()\">{{ _ampm(true) }}</span></span></div></div><div class=\"md2-datepicker-content\"><div class=\"md2-datepicker-calendar\" [class.active]=\"_isCalendarVisible\"><div class=\"md2-calendar-years\" [class.active]=\"_isYearsVisible\"><div class=\"md2-calendar-years-content\"><div *ngFor=\"let y of _years\" class=\"md2-calendar-year\" [class.selected]=\"y === activeDate.getFullYear()\" (click)=\"_setYear(y)\">{{y}}</div></div></div><div class=\"md2-calendar-month\" [class.active]=\"!_isYearsVisible\"><div class=\"md2-calendar-controls\"><div class=\"md2-button\" [class.disabled]=\"!_isBeforeMonth()\" (click)=\"_isBeforeMonth() && _updateMonth(-1)\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"></path></svg></div><div class=\"md2-calendar-month-year\" [@slideCalendar]=\"_calendarState\">{{ getMonthLabel }}</div><div class=\"md2-button\" [class.disabled]=\"!_isAfterMonth()\" (click)=\"_isAfterMonth() && _updateMonth(1)\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path></svg></div></div><table class=\"md2-calendar-dates\"><thead><tr><th *ngFor=\"let day of _weekDays\">{{day.xshort}}</th></tr></thead><tbody [@slideCalendar]=\"_calendarState\"><tr *ngFor=\"let w of _dates\"><td *ngFor=\"let d of w\"><div class=\"md2-calendar-date\" [class.md2-calendar-date-today]=\"d.today\" [class.md2-calendar-date-active]=\"_util.isSameDay(activeDate, d.date)\" [class.md2-calendar-date-selected]=\"_util.isSameDay(selected, d.date)\" [class.md2-calendar-date-disabled]=\"d.disabled\" [class.prev-month]=\"d.calMonth===_prevMonth\" [class.curr-month]=\"d.calMonth===_currMonth\" [class.next-month]=\"d.calMonth===_nextMonth\" (click)=\"_onClickDate($event,d)\">{{d.index}}</div></td></tr></tbody></table></div></div><md2-clock [class.active]=\"!_isCalendarVisible\" [startView]=\"_clockView\" [interval]=\"timeInterval\" [selected]=\"activeDate\" [min]=\"min\" [max]=\"max\" (activeDateChange)=\"_onActiveDateChange($event)\" (selectedChange)=\"_onTimeChange($event)\"></md2-clock><div class=\"md2-datepicker-actions\"><div class=\"md2-button\" (click)=\"close()\">{{ cancelLabel }}</div><div class=\"md2-button\" (click)=\"_onClickOk()\">{{ okLabel }}</div></div></div></div></ng-template>",
        styles: [":host{position:relative;display:inline-block;min-width:175px;outline:0;backface-visibility:hidden}:host.md2-datepicker-disabled{pointer-events:none;cursor:default}.md2-datepicker-trigger{display:block;padding:18px 0 4px 46px;white-space:nowrap}.md2-datepicker-button{position:absolute;top:13px;left:0;display:inline-block;height:40px;width:40px;padding:8px;line-height:24px;color:rgba(0,0,0,.54);fill:currentColor;border:0;border-radius:50%;outline:0;user-select:none;cursor:pointer;box-sizing:border-box;background:0 0;vertical-align:middle;align-items:center;text-align:center}.md2-datepicker-button:focus{background-color:rgba(158,158,158,.2)}.md2-datepicker-disabled .md2-datepicker-button{color:rgba(0,0,0,.38)}.md2-datepicker-input{color:rgba(0,0,0,.38);border-bottom:1px solid rgba(0,0,0,.12);display:flex;justify-content:space-between;align-items:center;height:30px;min-width:168px;line-height:22px;position:relative;padding-right:20px;box-sizing:border-box}[aria-disabled=true] .md2-datepicker-input{background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;border-color:transparent;background-position:0 bottom;cursor:default;user-select:none}.md2-datepicker-input.md2-datepicker-input-focused{color:#106cc8;border-color:#106cc8}md2-datepicker.ng-invalid.ng-touched:not(.md2-datepicker-disabled) .md2-datepicker-input{color:#f44336;border-color:#f44336}.md2-datepicker-placeholder{position:absolute;right:18px;bottom:100%;left:0;padding:0 2px;transform:translate3d(0,26px,0) scale(1);transform-origin:left top;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;transition:all 150ms cubic-bezier(.25,.8,.25,1)}.md2-datepicker-placeholder.md2-floating-placeholder{left:-2px;text-align:left;transform:translate3d(0,6px,0) scale(.75)}[dir=rtl] .md2-datepicker-placeholder{right:0;left:18px;transform-origin:right top}[dir=rtl] .md2-datepicker-placeholder.md2-floating-placeholder{right:-2px;text-align:right}[aria-required=true] .md2-datepicker-placeholder::after{content:'*'}.md2-datepicker-value{position:relative;width:100%;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;color:rgba(0,0,0,.87);border:0;outline:0;background:0 0}.md2-datepicker-disabled .md2-datepicker-value{color:rgba(0,0,0,.38)}[dir=rtl] .md2-datepicker-value{left:auto;right:0}.md2-datepicker-arrow{position:absolute;right:0;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;margin:0 4px;color:rgba(0,0,0,.38)}.md2-datepicker-input-focused .md2-datepicker-arrow{color:#106cc8}md2-datepicker.ng-invalid.ng-touched:not(.md2-datepicker-disabled) .md2-datepicker-arrow{color:#f44336}.md2-datepicker-clear{position:absolute;right:0;height:20px;color:rgba(0,0,0,.54);cursor:pointer}.md2-datepicker-clear svg{fill:currentColor}.md2-datepicker-panel{width:276px;border-radius:3px;color:rgba(0,0,0,.87);background-color:#fff;overflow:hidden;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);outline:0;user-select:none}.md2-datepicker-panel[container=dialog]{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.md2-datepicker-panel[mode=landscape]{display:flex;width:426px}.md2-datepicker-header{padding:16px;color:#fff;font-weight:500;white-space:nowrap;background:#106cc8;box-sizing:border-box}[mode=landscape] .md2-datepicker-header{width:150px;min-width:150px;padding-right:15px;white-space:normal;word-wrap:break-word}.md2-datepicker-header-year{font-size:16px;opacity:.7;cursor:pointer}.md2-datepicker-header-year.active{opacity:1;pointer-events:none}.md2-datepicker-header-date-time{font-size:24px}[mode=landscape] .md2-datepicker-header-date-time{font-size:32px}.md2-datepicker-header-date{opacity:.7;cursor:pointer}.md2-datepicker-header-date.active{opacity:1;pointer-events:none}.md2-datepicker-header-time{opacity:.7;display:inline-block;padding-left:8px;cursor:pointer}.md2-datepicker-header-time .md2-datepicker-header-ampm{opacity:.7;cursor:default}.md2-datepicker-header-time.active{opacity:1;cursor:default}.md2-datepicker-header-time.active .md2-datepicker-header-hour,.md2-datepicker-header-time.active .md2-datepicker-header-minute{opacity:.7;cursor:pointer}.md2-datepicker-header-time.active .md2-datepicker-header-hour.active,.md2-datepicker-header-time.active .md2-datepicker-header-minute.active{opacity:1;pointer-events:none}[mode=landscape] .md2-datepicker-header-time{display:block;padding-left:0}.md2-datepicker-content{position:relative;width:100%;padding-top:280px;overflow:hidden}.md2-datepicker-calendar{position:absolute;top:0;right:100%;display:block;width:100%;height:280px;transition:.3s}.md2-datepicker-calendar.active{right:0}.md2-calendar-years{position:absolute;top:10px;right:100%;bottom:10px;display:block;width:100%;line-height:40px;background:#fff;overflow-x:hidden;overflow-y:auto;transition:.3s}.md2-calendar-years.active{right:0}.md2-calendar-years .md2-calendar-years-content{display:flex;flex-direction:column;justify-content:center;min-height:100%}.md2-calendar-year{position:relative;display:block;margin:0 auto;padding:0;font-size:17px;font-weight:400;text-align:center;cursor:pointer}.md2-calendar-year.selected{color:#106cc8;font-size:26px;font-weight:500}.md2-calendar-month{position:absolute;left:100%;display:block;width:100%;font-size:12px;font-weight:400;text-align:center;transition:.3s}.md2-calendar-month.active{left:0}.md2-calendar-controls{display:flex;justify-content:space-between;font-size:14px;font-weight:700;text-align:center;line-height:48px}.md2-calendar-controls .md2-calendar-month-year-header{width:100%}.md2-calendar-controls .md2-button{display:inline-block;width:48px;height:48px;padding:12px;outline:0;border:0;cursor:pointer;background:0 0;box-sizing:border-box}.md2-calendar-controls .md2-button.disabled{color:rgba(0,0,0,.38);cursor:default;pointer-events:none}.md2-calendar-controls .md2-button svg{fill:currentColor;vertical-align:top}.md2-calendar-dates{margin:0 8px}.md2-calendar-dates th{width:35px;height:16px;font-weight:500;line-height:10px;opacity:.5}.md2-calendar-dates td{padding:0}.md2-calendar-date{position:relative;display:inline-block;width:35px;height:35px;border:1px solid transparent;border-radius:50%;text-align:center;cursor:pointer;line-height:35px;box-sizing:border-box}.md2-calendar-date.md2-calendar-date-today{border-color:#106cc8}.md2-calendar-date.md2-calendar-date-active,.md2-calendar-date:hover{background:#e0e0e0}.md2-calendar-date.md2-calendar-date-selected,.md2-calendar-date.md2-calendar-date-selected:hover{color:#fff;background:#106cc8}.md2-calendar-date.md2-calendar-date-selected.md2-calendar-date-today,.md2-calendar-date.md2-calendar-date-selected:hover.md2-calendar-date-today{box-shadow:inset 0 0 0 1px #fff}.md2-calendar-date.md2-calendar-date-disabled,.md2-calendar-date.md2-calendar-date-disabled:hover{color:rgba(0,0,0,.43);background:0 0;pointer-events:none}.md2-calendar-date.md2-calendar-date-disabled.md2-calendar-date-selected,.md2-calendar-date.md2-calendar-date-disabled:hover.md2-calendar-date-selected{color:#fff;background:rgba(16,108,200,.4)}.md2-calendar-date.md2-calendar-date-disabled.md2-calendar-date-today,.md2-calendar-date.md2-calendar-date-disabled:hover.md2-calendar-date-today{border-color:rgba(16,108,200,.18)}.md2-calendar-date.next-month,.md2-calendar-date.prev-month{visibility:hidden}md2-clock{position:absolute!important;top:0;left:100%;display:block;width:240px;height:240px;margin:18px!important;transition:.3s}md2-clock.active{left:0}.md2-datepicker-actions{text-align:right}.md2-datepicker-actions .md2-button{display:inline-block;min-width:64px;margin:4px 8px 8px 0;padding:0 12px;font-size:14px;color:#106cc8;line-height:36px;text-align:center;text-transform:uppercase;border-radius:2px;cursor:pointer;box-sizing:border-box;transition:all 450ms cubic-bezier(.23,1,.32,1)}.md2-datepicker-actions .md2-button:hover{background:#ebebeb}@media (min-width:480px){.md2-datepicker-panel[mode=auto]{display:flex;width:426px}[mode=auto] .md2-datepicker-header{width:150px;min-width:150px;padding-right:15px;white-space:normal;word-wrap:break-word}[mode=auto] .md2-datepicker-header-time{display:block;padding-left:0}[mode=auto] .md2-datepicker-header-date-time{font-size:32px}}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.6)} /*# sourceMappingURL=datepicker.css.map */ "],
        host: {
            'role': 'datepicker',
            '[class.md2-datepicker-disabled]': 'disabled',
            '[class.md2-datepicker-opened]': 'panelOpen',
            '[attr.aria-label]': 'placeholder',
            '[attr.aria-required]': 'required.toString()',
            '[attr.aria-disabled]': 'disabled.toString()',
            '[attr.aria-invalid]': '_control?.invalid || "false"',
            '(window:resize)': '_handleWindowResize($event)'
        },
        animations: [
            fadeInContent$1,
            slideCalendar
        ],
    }),
    __param$10(2, Optional()),
    __param$10(7, Self()), __param$10(7, Optional()),
    __metadata$30("design:paramtypes", [ElementRef, Overlay,
        DateAdapter,
        ViewContainerRef, DateLocale,
        ScrollDispatcher,
        DateUtil, NgControl])
], Md2Datepicker);

var __decorate$58 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/** Datepicker data that requires internationalization. */
let Md2DatepickerIntl = class Md2DatepickerIntl {
    /** Datepicker data that requires internationalization. */
    constructor() {
        /** A label for the calendar popup (used by screen readers). */
        this.calendarLabel = 'Calendar';
        /** A label for the button used to open the calendar popup (used by screen readers). */
        this.openCalendarLabel = 'Open calendar';
        /** A label for the previous month button (used by screen readers). */
        this.prevMonthLabel = 'Previous month';
        /** A label for the next month button (used by screen readers). */
        this.nextMonthLabel = 'Next month';
        /** A label for the previous year button (used by screen readers). */
        this.prevYearLabel = 'Previous year';
        /** A label for the next year button (used by screen readers). */
        this.nextYearLabel = 'Next year';
        /** A label for the 'switch to month view' button (used by screen readers). */
        this.switchToMonthViewLabel = 'Change to month view';
        /** A label for the 'switch to year view' button (used by screen readers). */
        this.switchToYearViewLabel = 'Change to year view';
    }
};
Md2DatepickerIntl = __decorate$58([
    Injectable()
], Md2DatepickerIntl);

var __decorate$57 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$32 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$12 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
let Md2Calendar = class Md2Calendar {
    constructor(_elementRef, _intl, _ngZone, _dateAdapter, _dateFormats) {
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
        this._dateFilterForViews = (date) => {
            return !!date &&
                (!this.dateFilter || this.dateFilter(date)) &&
                (!this.minDate || this._dateAdapter.compareDate(date, this.minDate) >= 0) &&
                (!this.maxDate || this._dateAdapter.compareDate(date, this.maxDate) <= 0);
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
    /**
     * The current active date. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     */
    get _activeDate() { return this._clampedActiveDate; }
    set _activeDate(value) {
        this._clampedActiveDate = this._dateAdapter.clampDate(value, this.minDate, this.maxDate);
    }
    /** The label for the current calendar view. */
    get _yearText() {
        return this._dateAdapter.getYearName(this._activeDate);
    }
    get _dateText() {
        return this._dateAdapter.getISODateString(this._activeDate);
    }
    get _periodButtonText() {
        return this._currentView === 'month' ?
            this._dateAdapter.format(this._activeDate, this._dateFormats.display.monthYearLabel)
                .toLocaleUpperCase() :
            this._dateAdapter.getYearName(this._activeDate);
    }
    get _periodButtonLabel() {
        return this._currentView === 'month' ? this._intl.switchToYearViewLabel : this._intl.switchToMonthViewLabel;
    }
    /** The label for the the previous button. */
    get _prevButtonLabel() {
        return this._currentView === 'month' ? this._intl.prevMonthLabel : this._intl.prevYearLabel;
    }
    /** The label for the the next button. */
    get _nextButtonLabel() {
        return this._currentView === 'month' ? this._intl.nextMonthLabel : this._intl.nextYearLabel;
    }
    get _okButtonLabel() {
        return 'OK';
    }
    get _cancelButtonLabel() {
        return 'CANCEL';
    }
    ngAfterContentInit() {
        this._activeDate = this.startAt || this._dateAdapter.today();
        this._focusActiveCell();
        this._currentView = this.startView || 'month';
    }
    /** Handles date selection in the month view. */
    _dateSelected(date) {
        if (!this._dateAdapter.sameDate(date, this.selected)) {
            this.selectedChange.emit(date);
        }
    }
    /** Handles month selection in the year view. */
    _monthSelected(month) {
        this._activeDate = month;
        this._currentView = 'month';
    }
    _timeSelected(time) {
        this._activeDate = time;
        this._currentView = 'month';
    }
    /** Handles user clicks on the period label. */
    _currentPeriodClicked() {
        this._currentView = this._currentView === 'month' ? 'year' : 'month';
    }
    _okButtonClicked() {
        this._currentView = this._currentView === 'month' ? 'time' : 'month';
    }
    /** Handles user clicks on the previous button. */
    _previousClicked() {
        this._activeDate = this._currentView === 'month' ?
            this._dateAdapter.addCalendarMonths(this._activeDate, -1) :
            this._dateAdapter.addCalendarYears(this._activeDate, -1);
    }
    /** Handles user clicks on the next button. */
    _nextClicked() {
        this._activeDate = this._currentView === 'month' ?
            this._dateAdapter.addCalendarMonths(this._activeDate, 1) :
            this._dateAdapter.addCalendarYears(this._activeDate, 1);
    }
    /** Whether the previous period button is enabled. */
    _previousEnabled() {
        if (!this.minDate) {
            return true;
        }
        return !this.minDate || !this._isSameView(this._activeDate, this.minDate);
    }
    /** Whether the next period button is enabled. */
    _nextEnabled() {
        return !this.maxDate || !this._isSameView(this._activeDate, this.maxDate);
    }
    /** Handles keydown events on the calendar body. */
    _handleCalendarBodyKeydown(event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        if (this._currentView === 'month') {
            this._handleCalendarBodyKeydownInMonthView(event);
        }
        else {
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
    _isSameView(date1, date2) {
        return this._currentView === 'month' ?
            this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2) &&
                this._dateAdapter.getMonth(date1) == this._dateAdapter.getMonth(date2) :
            this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2);
    }
    /** Handles keydown events on the calendar body when calendar is in month view. */
    _handleCalendarBodyKeydownInMonthView(event) {
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
    }
    /** Handles keydown events on the calendar body when calendar is in year view. */
    _handleCalendarBodyKeydownInYearView(event) {
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
    }
    /**
     * Determine the date for the month that comes before the given month in the same column in the
     * calendar table.
     */
    _prevMonthInSameCol(date) {
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
    _nextMonthInSameCol(date) {
        // Determine how many months to jump forward given that there are 2 empty slots at the beginning
        // of each year.
        let increment = this._dateAdapter.getMonth(date) <= 4 ? 7 :
            (this._dateAdapter.getMonth(date) >= 7 ? 5 : 12);
        return this._dateAdapter.addCalendarMonths(date, increment);
    }
};
__decorate$57([
    Input(),
    __metadata$32("design:type", Object)
], Md2Calendar.prototype, "startAt", void 0);
__decorate$57([
    Input(),
    __metadata$32("design:type", String)
], Md2Calendar.prototype, "startView", void 0);
__decorate$57([
    Input(),
    __metadata$32("design:type", Object)
], Md2Calendar.prototype, "selected", void 0);
__decorate$57([
    Input(),
    __metadata$32("design:type", Object)
], Md2Calendar.prototype, "minDate", void 0);
__decorate$57([
    Input(),
    __metadata$32("design:type", Object)
], Md2Calendar.prototype, "maxDate", void 0);
__decorate$57([
    Input(),
    __metadata$32("design:type", Function)
], Md2Calendar.prototype, "dateFilter", void 0);
__decorate$57([
    Output(),
    __metadata$32("design:type", Object)
], Md2Calendar.prototype, "selectedChange", void 0);
Md2Calendar = __decorate$57([
    Component({selector: 'md2-calendar',
        template: "<div class=\"md2-calendar-header\"><div class=\"md2-calendar-header-year\" [class.active]=\"false\">{{ _yearText }}</div><div class=\"md2-calendar-header-date\" [class.active]=\"true\">{{ _dateText }}</div></div><div class=\"md2-calendar-content\" (keydown)=\"_handleCalendarBodyKeydown($event)\" [ngSwitch]=\"_currentView\" cdkMonitorSubtreeFocus><div class=\"md2-month-content\" *ngSwitchCase=\"'month'\"><div class=\"md2-calendar-controls\"><button type=\"button\" class=\"md2-calendar-previous-button\" [disabled]=\"!_previousEnabled()\" (click)=\"_previousClicked()\" [attr.aria-label]=\"_prevButtonLabel\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"></path></svg></button> <button type=\"button\" class=\"md2-calendar-period-button\" (click)=\"_currentPeriodClicked()\" [attr.aria-label]=\"_periodButtonLabel\">{{_periodButtonText}}</button> <button type=\"button\" class=\"md2-calendar-next-button\" [disabled]=\"!_nextEnabled()\" (click)=\"_nextClicked()\" [attr.aria-label]=\"_nextButtonLabel\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path></svg></button></div><md2-month-view [activeDate]=\"_activeDate\" [selected]=\"selected\" [dateFilter]=\"_dateFilterForViews\" (selectedChange)=\"_dateSelected($event)\"></md2-month-view></div><md2-year-view *ngSwitchCase=\"'year'\" [activeDate]=\"_activeDate\" [selected]=\"selected\" [dateFilter]=\"_dateFilterForViews\" (selectedChange)=\"_monthSelected($event)\"></md2-year-view><md2-clock *ngSwitchDefault [selected]=\"selected\" [startView]=\"_clockView\" (selectedChange)=\"_timeSelected($event)\"></md2-clock></div><div class=\"md2-calendar-footer\"><button type=\"button\" class=\"md2-calendar-cancel-button\" [attr.aria-label]=\"_cancelButtonLabel\">{{ _cancelButtonLabel }}</button> <button type=\"button\" class=\"md2-calendar-ok-button\" [attr.aria-label]=\"_okButtonLabel\" (click)=\"_okButtonClicked()\">{{ _okButtonLabel }}</button></div>",
        styles: [".md2-datepicker-content{background-color:#fff}.md2-calendar{display:block}.md2-calendar-header{padding:16px;font-size:14px;background-color:#106cc8;color:#fff}.md2-calendar-header-date,.md2-calendar-header-year{width:100%;font-weight:500;transition:.3s cubic-bezier(.25,.8,.25,1)}.md2-calendar-header-date:not(.active),.md2-calendar-header-year:not(.active){cursor:pointer;opacity:.6}.md2-calendar-header-date{font-size:30px;line-height:34px}.md2-calendar-content{padding:0 8px 8px 8px;outline:0}.md2-calendar-controls{display:flex;justify-content:space-between}.md2-calendar-period-button{display:inline-block;height:48px;padding:12px;font:inherit;font-size:14px;font-weight:700;outline:0;border:0;cursor:pointer;background:0 0;box-sizing:border-box}.md2-calendar-next-button,.md2-calendar-previous-button{display:inline-block;width:48px;height:48px;padding:12px;outline:0;border:0;cursor:pointer;background:0 0;box-sizing:border-box}.md2-calendar-next-button[disabled],.md2-calendar-previous-button[disabled]{color:rgba(0,0,0,.38);pointer-events:none}.md2-calendar-next-button svg,.md2-calendar-previous-button svg{fill:currentColor;vertical-align:top}.md2-calendar-table{border-spacing:0;border-collapse:collapse;width:100%}.md2-calendar-table-header{color:rgba(0,0,0,.38)}.md2-calendar-table-header th{text-align:center;font-size:11px;font-weight:400;padding:0 0 8px 0}.md2-calendar-footer{text-align:right}.md2-calendar-cancel-button,.md2-calendar-ok-button{display:inline-block;min-width:64px;margin:4px 8px 8px 0;padding:0 12px;font-size:14px;color:#106cc8;line-height:36px;text-align:center;text-transform:uppercase;outline:0;border:0;border-radius:2px;background:0 0;cursor:pointer;box-sizing:border-box;transition:all 450ms cubic-bezier(.23,1,.32,1)}.md2-calendar-cancel-button:hover,.md2-calendar-ok-button:hover{background:#ebebeb} /*# sourceMappingURL=calendar.css.map */ "],
        host: {
            '[class.md2-calendar]': 'true',
        },
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
    }),
    __param$12(3, Optional()),
    __param$12(4, Optional()), __param$12(4, Inject(MD_DATE_FORMATS)),
    __metadata$32("design:paramtypes", [ElementRef,
        Md2DatepickerIntl,
        NgZone,
        DateAdapter, Object])
], Md2Calendar);

var __decorate$56 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$31 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$11 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/** Used to generate a unique ID for each datepicker instance. */
let datepickerUid = 0;
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * Md2Calendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * @docs-private
 */
let Md2DatepickerContent = class Md2DatepickerContent {
    ngAfterContentInit() {
        this._calendar._focusActiveCell();
    }
    /**
     * Handles keydown event on datepicker content.
     * @param event The event.
     */
    _handleKeydown(event) {
        switch (event.keyCode) {
            case ESCAPE:
                this.datepicker.close();
                break;
            default:
                // Return so that we don't preventDefault on keys that are not explicitly handled.
                return;
        }
        event.preventDefault();
    }
};
__decorate$56([
    ViewChild(Md2Calendar),
    __metadata$31("design:type", Md2Calendar)
], Md2DatepickerContent.prototype, "_calendar", void 0);
Md2DatepickerContent = __decorate$56([
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
// TODO(mmalerba): We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="md2Datepicker"). We can change this to a directive if
// angular adds support for `exportAs: '$implicit'` on directives.
/** Component responsible for managing the datepicker popup/dialog. */
let Md2Datepicker2 = class Md2Datepicker2 {
    constructor(_overlay, _ngZone, _viewContainerRef, _scrollDispatcher, _dateAdapter, _dir) {
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
        this.id = `md2-datepicker-${datepickerUid++}`;
        /** The currently selected date. */
        this._selected = null;
        if (!this._dateAdapter) {
            throw Error('DateAdapter');
        }
    }
    /** The date to open the calendar to initially. */
    get startAt() {
        // If an explicit startAt is set we start there, otherwise we start at whatever the currently
        // selected value is.
        return this._startAt || (this._datepickerInput ? this._datepickerInput.value : null);
    }
    set startAt(date) { this._startAt = date; }
    /** The minimum selectable date. */
    get _minDate() {
        return this._datepickerInput && this._datepickerInput.min;
    }
    /** The maximum selectable date. */
    get _maxDate() {
        return this._datepickerInput && this._datepickerInput.max;
    }
    get _dateFilter() {
        return this._datepickerInput && this._datepickerInput._dateFilter;
    }
    ngOnDestroy() {
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
    }
    /** Selects the given date and closes the currently open popup or dialog. */
    _selectAndClose(date) {
        let oldValue = this._selected;
        this._selected = date;
        if (!this._dateAdapter.sameDate(oldValue, this._selected)) {
            this.selectedChanged.emit(date);
        }
        this.close();
    }
    /**
     * Register an input with this datepicker.
     * @param input The datepicker input to register with this datepicker.
     */
    _registerInput(input) {
        if (this._datepickerInput) {
            throw new Error('An Md2Datepicker can only be associated with a single input.');
        }
        this._datepickerInput = input;
        this._inputSubscription =
            this._datepickerInput._valueChange.subscribe((value) => this._selected = value);
    }
    /** Open the calendar. */
    open() {
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
    }
    /** Close the calendar. */
    close() {
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
    }
    /** Open the calendar as a dialog. */
    _openAsDialog() {
        if (!this._dialogRef) {
            this._createDialog();
        }
        if (!this._dialogRef.hasAttached()) {
            let componentRef = this._dialogRef.attach(this._calendarPortal);
            componentRef.instance.datepicker = this;
        }
        this._dialogRef.backdropClick().first().subscribe(() => this.close());
    }
    /** Open the calendar as a popup. */
    _openAsPopup() {
        if (!this._popupRef) {
            this._createPopup();
        }
        if (!this._popupRef.hasAttached()) {
            let componentRef = this._popupRef.attach(this._calendarPortal);
            componentRef.instance.datepicker = this;
            // Update the position once the calendar has rendered.
            this._ngZone.onStable.first().subscribe(() => this._popupRef.updatePosition());
        }
        this._popupRef.backdropClick().first().subscribe(() => this.close());
    }
    /** Create the dialog. */
    _createDialog() {
        const overlayState = new OverlayState();
        overlayState.positionStrategy = this._overlay.position().global()
            .centerHorizontally()
            .centerVertically();
        overlayState.hasBackdrop = true;
        overlayState.backdropClass = 'cdk-overlay-dark-backdrop';
        overlayState.direction = this._dir ? this._dir.value : 'ltr';
        this._dialogRef = this._overlay.create(overlayState);
    }
    /** Create the popup. */
    _createPopup() {
        const overlayState = new OverlayState();
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
    }
    /** Create the popup PositionStrategy. */
    _createPopupPositionStrategy() {
        return this._overlay.position()
            .connectedTo(this._datepickerInput.getPopupConnectionElementRef(), { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
            .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
            .withFallbackPosition({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' })
            .withFallbackPosition({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' });
    }
};
__decorate$56([
    Input(),
    __metadata$31("design:type", Object),
    __metadata$31("design:paramtypes", [Object])
], Md2Datepicker2.prototype, "startAt", null);
__decorate$56([
    Input(),
    __metadata$31("design:type", String)
], Md2Datepicker2.prototype, "startView", void 0);
__decorate$56([
    Input(),
    __metadata$31("design:type", Object)
], Md2Datepicker2.prototype, "touchUi", void 0);
__decorate$56([
    Output(),
    __metadata$31("design:type", Object)
], Md2Datepicker2.prototype, "selectedChanged", void 0);
Md2Datepicker2 = __decorate$56([
    Component({selector: 'md2-datepicker2',
        template: '<ng-content></ng-content>',
    }),
    __param$11(4, Optional()),
    __param$11(5, Optional()),
    __metadata$31("design:paramtypes", [Overlay,
        NgZone,
        ViewContainerRef,
        ScrollDispatcher,
        DateAdapter,
        Dir])
], Md2Datepicker2);

var __decorate$59 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$33 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$13 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const MD2_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Md2DatepickerInput),
    multi: true
};
const MD2_DATEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => Md2DatepickerInput),
    multi: true
};
/** Directive used to connect an input to a MdDatepicker. */
let Md2DatepickerInput = class Md2DatepickerInput {
    constructor(_elementRef, _renderer, _dateAdapter, _dateFormats) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        /** Emits when the value changes (either due to user input or programmatic change). */
        this._valueChange = new EventEmitter();
        this._onTouched = () => { };
        this._cvaOnChange = (value) => { };
        this._validatorOnChange = () => { };
        /** The form control validator for the min date. */
        this._minValidator = (control) => {
            return (!this.min || !control.value ||
                this._dateAdapter.compareDate(this.min, control.value) <= 0) ?
                null : { 'md2DatepickerMin': { 'min': this.min, 'actual': control.value } };
        };
        /** The form control validator for the max date. */
        this._maxValidator = (control) => {
            return (!this.max || !control.value ||
                this._dateAdapter.compareDate(this.max, control.value) >= 0) ?
                null : { 'md2DatepickerMax': { 'max': this.max, 'actual': control.value } };
        };
        /** The form control validator for the date filter. */
        this._filterValidator = (control) => {
            return !this._dateFilter || !control.value || this._dateFilter(control.value) ?
                null : { 'md2DatepickerFilter': true };
        };
        /** The combined form control validator for this input. */
        this._validator = Validators.compose([this._minValidator, this._maxValidator, this._filterValidator]);
        if (!this._dateAdapter) {
            throw Error('DateAdapter');
        }
        if (!this._dateFormats) {
            throw Error('MD2_DATE_FORMATS');
        }
    }
    /** The datepicker that this input is associated with. */
    set md2Datepicker(value) {
        if (value) {
            this._datepicker = value;
            this._datepicker._registerInput(this);
        }
    }
    set md2DatepickerFilter(filter) {
        this._dateFilter = filter;
        this._validatorOnChange();
    }
    /** The value of the input. */
    get value() {
        return this._dateAdapter.parse(this._elementRef.nativeElement.value, this._dateFormats.parse.dateInput);
    }
    set value(value) {
        let date = this._dateAdapter.parse(value, this._dateFormats.parse.dateInput);
        let oldDate = this.value;
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', date ? this._dateAdapter.format(date, this._dateFormats.display.dateInput) : '');
        if (!this._dateAdapter.sameDate(oldDate, date)) {
            this._valueChange.emit(date);
        }
    }
    /** The minimum valid date. */
    get min() { return this._min; }
    set min(value) {
        this._min = value;
        this._validatorOnChange();
    }
    /** The maximum valid date. */
    get max() { return this._max; }
    set max(value) {
        this._max = value;
        this._validatorOnChange();
    }
    ngAfterContentInit() {
        if (this._datepicker) {
            this._datepickerSubscription =
                this._datepicker.selectedChanged.subscribe((selected) => {
                    this.value = selected;
                    this._cvaOnChange(selected);
                });
        }
    }
    ngOnDestroy() {
        if (this._datepickerSubscription) {
            this._datepickerSubscription.unsubscribe();
        }
    }
    registerOnValidatorChange(fn) {
        this._validatorOnChange = fn;
    }
    validate(c) {
        return this._validator ? this._validator(c) : null;
    }
    /**
     * Gets the element that the datepicker popup should be connected to.
     * @return The element to connect the popup to.
     */
    getPopupConnectionElementRef() {
        return this._elementRef;
    }
    // Implemented as part of ControlValueAccessor
    writeValue(value) {
        this.value = value;
    }
    // Implemented as part of ControlValueAccessor
    registerOnChange(fn) {
        this._cvaOnChange = fn;
    }
    // Implemented as part of ControlValueAccessor
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor
    setDisabledState(disabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', disabled);
    }
    _onKeydown(event) {
        if (event.altKey && event.keyCode === DOWN_ARROW) {
            this._datepicker.open();
            event.preventDefault();
        }
    }
    _onInput(value) {
        let date = this._dateAdapter.parse(value, this._dateFormats.parse.dateInput);
        this._cvaOnChange(date);
        this._valueChange.emit(date);
    }
};
__decorate$59([
    Input(),
    __metadata$33("design:type", Md2Datepicker2),
    __metadata$33("design:paramtypes", [Md2Datepicker2])
], Md2DatepickerInput.prototype, "md2Datepicker", null);
__decorate$59([
    Input(),
    __metadata$33("design:type", Function),
    __metadata$33("design:paramtypes", [Function])
], Md2DatepickerInput.prototype, "md2DatepickerFilter", null);
__decorate$59([
    Input(),
    __metadata$33("design:type", Object),
    __metadata$33("design:paramtypes", [Object])
], Md2DatepickerInput.prototype, "value", null);
__decorate$59([
    Input(),
    __metadata$33("design:type", Object),
    __metadata$33("design:paramtypes", [Object])
], Md2DatepickerInput.prototype, "min", null);
__decorate$59([
    Input(),
    __metadata$33("design:type", Object),
    __metadata$33("design:paramtypes", [Object])
], Md2DatepickerInput.prototype, "max", null);
Md2DatepickerInput = __decorate$59([
    Directive({
        selector: 'input[md2Datepicker]',
        providers: [MD2_DATEPICKER_VALUE_ACCESSOR, MD2_DATEPICKER_VALIDATORS],
        host: {
            '[attr.aria-expanded]': '_datepicker?.opened || "false"',
            '[attr.aria-haspopup]': 'true',
            '[attr.aria-owns]': '_datepicker?.id',
            '[attr.min]': 'min ? _dateAdapter.getISODateString(min) : null',
            '[attr.max]': 'max ? _dateAdapter.getISODateString(max) : null',
            '(input)': '_onInput($event.target.value)',
            '(blur)': '_onTouched()',
            '(keydown)': '_onKeydown($event)',
        }
    }),
    __param$13(2, Optional()),
    __param$13(3, Optional()), __param$13(3, Inject(MD_DATE_FORMATS)),
    __metadata$33("design:paramtypes", [ElementRef,
        Renderer2,
        DateAdapter, Object])
], Md2DatepickerInput);

var __decorate$60 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$34 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let Md2DatepickerToggle = class Md2DatepickerToggle {
    constructor(_intl) {
        this._intl = _intl;
    }
    _open(event) {
        if (this.datepicker) {
            this.datepicker.open();
            event.stopPropagation();
        }
    }
};
__decorate$60([
    Input('md2DatepickerToggle'),
    __metadata$34("design:type", Md2Datepicker2)
], Md2DatepickerToggle.prototype, "datepicker", void 0);
Md2DatepickerToggle = __decorate$60([
    Component({selector: 'button[md2DatepickerToggle]',
        template: '',
        styles: [".md2-datepicker-toggle{display:inline-block;background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE5IDNoLTFWMWgtMnYySDhWMUg2djJINWMtMS4xMSAwLTEuOTkuOS0xLjk5IDJMMyAxOWMwIDEuMS44OSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMlY1YzAtMS4xLS45LTItMi0yem0wIDE2SDVWOGgxNHYxMXpNNyAxMGg1djVIN3oiLz48L3N2Zz4=) no-repeat;background-size:contain;height:24px;width:24px;border:none;outline:0;vertical-align:middle}.md2-datepicker-toggle:not([disabled]){cursor:pointer} /*# sourceMappingURL=datepicker-toggle.css.map */ "],
        host: {
            'type': 'button',
            'class': 'md2-datepicker-toggle',
            '[attr.aria-label]': '_intl.openCalendarLabel',
            '(click)': '_open($event)',
        },
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
    }),
    __metadata$34("design:paramtypes", [Md2DatepickerIntl])
], Md2DatepickerToggle);

var __decorate$62 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$36 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * @docs-private
 */
class Md2CalendarCell {
    constructor(value, displayValue, ariaLabel, enabled) {
        this.value = value;
        this.displayValue = displayValue;
        this.ariaLabel = ariaLabel;
        this.enabled = enabled;
    }
}
/**
 * An internal component used to display calendar data in a table.
 * @docs-private
 */
let Md2CalendarBody = class Md2CalendarBody {
    /**
     * An internal component used to display calendar data in a table.
     * @docs-private
     */
    constructor() {
        /** The number of columns in the table. */
        this.numCols = 7;
        /** Whether to allow selection of disabled cells. */
        this.allowDisabledSelection = false;
        /** The cell number of the active cell in the table. */
        this.activeCell = 0;
        /** Emits when a new value is selected. */
        this.selectedValueChange = new EventEmitter();
    }
    _cellClicked(cell) {
        if (!this.allowDisabledSelection && !cell.enabled) {
            return;
        }
        this.selectedValueChange.emit(cell.value);
    }
    /** The number of blank cells to put at the beginning for the first row. */
    get _firstRowOffset() {
        return this.rows && this.rows.length && this.rows[0].length ?
            this.numCols - this.rows[0].length : 0;
    }
    _isActiveCell(rowIndex, colIndex) {
        let cellNumber = rowIndex * this.numCols + colIndex;
        // Account for the fact that the first row may not have as many cells.
        if (rowIndex) {
            cellNumber -= this._firstRowOffset;
        }
        return cellNumber == this.activeCell;
    }
};
__decorate$62([
    Input(),
    __metadata$36("design:type", String)
], Md2CalendarBody.prototype, "label", void 0);
__decorate$62([
    Input(),
    __metadata$36("design:type", Array)
], Md2CalendarBody.prototype, "rows", void 0);
__decorate$62([
    Input(),
    __metadata$36("design:type", Number)
], Md2CalendarBody.prototype, "todayValue", void 0);
__decorate$62([
    Input(),
    __metadata$36("design:type", Number)
], Md2CalendarBody.prototype, "selectedValue", void 0);
__decorate$62([
    Input(),
    __metadata$36("design:type", Number)
], Md2CalendarBody.prototype, "labelMinRequiredCells", void 0);
__decorate$62([
    Input(),
    __metadata$36("design:type", Object)
], Md2CalendarBody.prototype, "numCols", void 0);
__decorate$62([
    Input(),
    __metadata$36("design:type", Object)
], Md2CalendarBody.prototype, "allowDisabledSelection", void 0);
__decorate$62([
    Input(),
    __metadata$36("design:type", Object)
], Md2CalendarBody.prototype, "activeCell", void 0);
__decorate$62([
    Output(),
    __metadata$36("design:type", Object)
], Md2CalendarBody.prototype, "selectedValueChange", void 0);
Md2CalendarBody = __decorate$62([
    Component({selector: '[md2-calendar-body]',
        template: "<tr *ngIf=\"_firstRowOffset < labelMinRequiredCells\" aria-hidden=\"true\"><td class=\"md2-calendar-body-label\" [attr.colspan]=\"numCols\">{{label}}</td></tr><tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\"><td *ngIf=\"rowIndex === 0 && _firstRowOffset\" aria-hidden=\"true\" class=\"md2-calendar-body-label\" [attr.colspan]=\"_firstRowOffset\">{{_firstRowOffset >= labelMinRequiredCells ? label : ''}}</td><td *ngFor=\"let item of row; let colIndex = index\" role=\"gridcell\" class=\"md2-calendar-body-cell\" [tabindex]=\"_isActiveCell(rowIndex, colIndex) ? 0 : -1\" [class.md2-calendar-body-disabled]=\"!item.enabled\" [class.md2-calendar-body-active]=\"_isActiveCell(rowIndex, colIndex)\" [attr.aria-label]=\"item.ariaLabel\" [attr.aria-disabled]=\"!item.enabled || null\" (click)=\"_cellClicked(item)\"><div class=\"md2-calendar-body-cell-content\" [class.md2-calendar-body-selected]=\"selectedValue === item.value\" [class.md2-calendar-body-today]=\"todayValue === item.value\">{{item.displayValue}}</div></td></tr>",
        styles: [".md2-calendar-body{font-size:13px;min-width:224px}.md2-calendar-body-label{padding:7.14286% 0 7.14286% 7.14286%;height:0;line-height:0;color:rgba(0,0,0,.54);transform:translateX(-6px);text-align:left;font-size:14px;font-weight:700}.md2-calendar-body-cell{position:relative;width:14.28571%;height:0;line-height:0;padding:7.14286% 0;text-align:center;outline:0;cursor:pointer}.md2-calendar-body-disabled{cursor:default}.md2-calendar-body-cell-content{position:absolute;top:5%;left:5%;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:90%;height:90%;color:rgba(0,0,0,.87);border-width:1px;border-style:solid;border-color:transparent;border-radius:50%}.md2-calendar-body-disabled>.md2-calendar-body-cell-content:not(.md2-calendar-body-selected){color:rgba(0,0,0,.38)}.cdk-keyboard-focused .md2-calendar-body-active>.md2-calendar-body-cell-content:not(.md2-calendar-body-selected),:not(.md2-calendar-body-disabled):hover>.md2-calendar-body-cell-content:not(.md2-calendar-body-selected){background-color:rgba(0,0,0,.12)}.md2-calendar-body-selected{background-color:#106cc8;color:#fff}.md2-calendar-body-disabled>.md2-calendar-body-selected{background-color:rgba(16,108,200,.4)}.md2-calendar-body-today:not(.md2-calendar-body-selected){border-color:#106cc8}.md2-calendar-body-today.md2-calendar-body-selected{box-shadow:inset 0 0 0 1px md2-color(#106cc8,default-contrast)}.md2-calendar-body-disabled>.md2-calendar-body-today:not(.md2-calendar-body-selected){border-color:rgba(0,0,0,.18)}[dir=rtl] .md2-calendar-body-label{padding:0 7.14286% 0 0;transform:translateX(6px);text-align:right} /*# sourceMappingURL=calendar-body.css.map */ "],
        host: {
            'class': 'md2-calendar-body',
        },
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], Md2CalendarBody);

var __decorate$61 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$35 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$14 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const DAYS_PER_WEEK = 7;
/**
 * An internal component used to display a single month in the datepicker.
 * @docs-private
 */
let Md2MonthView = class Md2MonthView {
    constructor(_dateAdapter, _dateFormats) {
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        /** Emits when a new date is selected. */
        this.selectedChange = new EventEmitter();
        if (!this._dateAdapter) {
            throw Error('DateAdapter');
        }
        if (!this._dateFormats) {
            throw Error('MD_DATE_FORMATS');
        }
        const firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();
        const narrowWeekdays = this._dateAdapter.getDayOfWeekNames('narrow');
        const longWeekdays = this._dateAdapter.getDayOfWeekNames('long');
        // Rotate the labels for days of the week based on the configured first day of the week.
        let weekdays = longWeekdays.map((long, i) => {
            return { long, narrow: narrowWeekdays[i] };
        });
        this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
        this._activeDate = this._dateAdapter.today();
    }
    /**
     * The date to display in this month view (everything other than the month and year is ignored).
     */
    get activeDate() { return this._activeDate; }
    set activeDate(value) {
        let oldActiveDate = this._activeDate;
        this._activeDate = value || this._dateAdapter.today();
        if (!this._hasSameMonthAndYear(oldActiveDate, this._activeDate)) {
            this._init();
        }
    }
    /** The currently selected date. */
    get selected() { return this._selected; }
    set selected(value) {
        this._selected = value;
        this._selectedDate = this._getDateInCurrentMonth(this.selected);
    }
    ngAfterContentInit() {
        this._init();
    }
    /** Handles when a new date is selected. */
    _dateSelected(date) {
        if (this._selectedDate == date) {
            return;
        }
        this.selectedChange.emit(this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), date));
    }
    /** Initializes this month view. */
    _init() {
        this._selectedDate = this._getDateInCurrentMonth(this.selected);
        this._todayDate = this._getDateInCurrentMonth(this._dateAdapter.today());
        this._monthLabel =
            this._dateAdapter.getMonthNames('short')[this._dateAdapter.getMonth(this.activeDate)]
                .toLocaleUpperCase();
        let firstOfMonth = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), 1);
        this._firstWeekOffset =
            (DAYS_PER_WEEK + this._dateAdapter.getDayOfWeek(firstOfMonth) -
                this._dateAdapter.getFirstDayOfWeek()) % DAYS_PER_WEEK;
        this._createWeekCells();
    }
    /** Creates MdCalendarCells for the dates in this month. */
    _createWeekCells() {
        let daysInMonth = this._dateAdapter.getNumDaysInMonth(this.activeDate);
        let dateNames = this._dateAdapter.getDateNames();
        this._weeks = [[]];
        for (let i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
            if (cell == DAYS_PER_WEEK) {
                this._weeks.push([]);
                cell = 0;
            }
            let date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), i + 1);
            let enabled = !this.dateFilter ||
                this.dateFilter(date);
            let ariaLabel = this._dateAdapter.format(date, this._dateFormats.display.dateA11yLabel);
            this._weeks[this._weeks.length - 1]
                .push(new Md2CalendarCell(i + 1, dateNames[i], ariaLabel, enabled));
        }
    }
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     */
    _getDateInCurrentMonth(date) {
        return this._hasSameMonthAndYear(date, this.activeDate) ?
            this._dateAdapter.getDate(date) : null;
    }
    /** Checks whether the 2 dates are non-null and fall within the same month of the same year. */
    _hasSameMonthAndYear(d1, d2) {
        return !!(d1 && d2 && this._dateAdapter.getMonth(d1) == this._dateAdapter.getMonth(d2) &&
            this._dateAdapter.getYear(d1) == this._dateAdapter.getYear(d2));
    }
};
__decorate$61([
    Input(),
    __metadata$35("design:type", Object),
    __metadata$35("design:paramtypes", [Object])
], Md2MonthView.prototype, "activeDate", null);
__decorate$61([
    Input(),
    __metadata$35("design:type", Object),
    __metadata$35("design:paramtypes", [Object])
], Md2MonthView.prototype, "selected", null);
__decorate$61([
    Input(),
    __metadata$35("design:type", Function)
], Md2MonthView.prototype, "dateFilter", void 0);
__decorate$61([
    Output(),
    __metadata$35("design:type", Object)
], Md2MonthView.prototype, "selectedChange", void 0);
Md2MonthView = __decorate$61([
    Component({selector: 'md2-month-view',
        template: "<table class=\"md2-calendar-table\"><thead class=\"md2-calendar-table-header\"><tr><th *ngFor=\"let day of _weekdays\" [attr.aria-label]=\"day.long\">{{day.narrow}}</th></tr></thead><tbody md2-calendar-body role=\"grid\" [label]=\"_monthLabel\" [rows]=\"_weeks\" [todayValue]=\"_todayDate\" [selectedValue]=\"_selectedDate\" [labelMinRequiredCells]=\"3\" [activeCell]=\"_dateAdapter.getDate(activeDate) - 1\" (selectedValueChange)=\"_dateSelected($event)\"></tbody></table>",
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
    }),
    __param$14(0, Optional()),
    __param$14(1, Optional()), __param$14(1, Inject(MD_DATE_FORMATS)),
    __metadata$35("design:paramtypes", [DateAdapter, Object])
], Md2MonthView);

var __decorate$63 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$37 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$15 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * An internal component used to display a single year in the datepicker.
 * @docs-private
 */
let Md2YearView = class Md2YearView {
    constructor(_dateAdapter, _dateFormats) {
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        /** Emits when a new month is selected. */
        this.selectedChange = new EventEmitter();
        if (!this._dateAdapter) {
            throw Error('DateAdapter');
        }
        if (!this._dateFormats) {
            throw Error('MD_DATE_FORMATS');
        }
        this._activeDate = this._dateAdapter.today();
    }
    /** The date to display in this year view (everything other than the year is ignored). */
    get activeDate() { return this._activeDate; }
    set activeDate(value) {
        let oldActiveDate = this._activeDate;
        this._activeDate = value || this._dateAdapter.today();
        if (this._dateAdapter.getYear(oldActiveDate) != this._dateAdapter.getYear(this._activeDate)) {
            this._init();
        }
    }
    /** The currently selected date. */
    get selected() { return this._selected; }
    set selected(value) {
        this._selected = value;
        this._selectedMonth = this._getMonthInCurrentYear(this.selected);
    }
    ngAfterContentInit() {
        this._init();
    }
    /** Handles when a new month is selected. */
    _monthSelected(month) {
        this.selectedChange.emit(this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, this._dateAdapter.getDate(this.activeDate)));
    }
    /** Initializes this month view. */
    _init() {
        this._selectedMonth = this._getMonthInCurrentYear(this.selected);
        this._todayMonth = this._getMonthInCurrentYear(this._dateAdapter.today());
        this._yearLabel = this._dateAdapter.getYearName(this.activeDate);
        let monthNames = this._dateAdapter.getMonthNames('short');
        // First row of months only contains 5 elements so we can fit the year label on the same row.
        this._months = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9, 10, 11]].map(row => row.map(month => this._createCellForMonth(month, monthNames[month])));
    }
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    _getMonthInCurrentYear(date) {
        return date && this._dateAdapter.getYear(date) == this._dateAdapter.getYear(this.activeDate) ?
            this._dateAdapter.getMonth(date) : null;
    }
    /** Creates an MdCalendarCell for the given month. */
    _createCellForMonth(month, monthName) {
        let ariaLabel = this._dateAdapter.format(this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1), this._dateFormats.display.monthYearA11yLabel);
        return new Md2CalendarCell(month, monthName.toLocaleUpperCase(), ariaLabel, this._isMonthEnabled(month));
    }
    /** Whether the given month is enabled. */
    _isMonthEnabled(month) {
        if (!this.dateFilter) {
            return true;
        }
        let firstOfMonth = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1);
        // If any date in the month is enabled count the month as enabled.
        for (let date = firstOfMonth; this._dateAdapter.getMonth(date) == month; date = this._dateAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    }
};
__decorate$63([
    Input(),
    __metadata$37("design:type", Object),
    __metadata$37("design:paramtypes", [Object])
], Md2YearView.prototype, "activeDate", null);
__decorate$63([
    Input(),
    __metadata$37("design:type", Object),
    __metadata$37("design:paramtypes", [Object])
], Md2YearView.prototype, "selected", null);
__decorate$63([
    Input(),
    __metadata$37("design:type", Function)
], Md2YearView.prototype, "dateFilter", void 0);
__decorate$63([
    Output(),
    __metadata$37("design:type", Object)
], Md2YearView.prototype, "selectedChange", void 0);
Md2YearView = __decorate$63([
    Component({selector: 'md2-year-view',
        template: "<table class=\"md2-calendar-table\"><thead class=\"md2-calendar-table-header\"></thead><tbody md2-calendar-body role=\"grid\" allowDisabledSelection=\"true\" [label]=\"_yearLabel\" [rows]=\"_months\" [todayValue]=\"_todayMonth\" [selectedValue]=\"_selectedMonth\" [labelMinRequiredCells]=\"2\" [activeCell]=\"_dateAdapter.getMonth(activeDate)\" (selectedValueChange)=\"_monthSelected($event)\"></tbody></table>",
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
    }),
    __param$15(0, Optional()),
    __param$15(1, Optional()), __param$15(1, Inject(MD_DATE_FORMATS)),
    __metadata$37("design:paramtypes", [DateAdapter, Object])
], Md2YearView);

var __decorate$64 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$38 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const CLOCK_RADIUS = 50;
const CLOCK_INNER_RADIUS = 27.5;
const CLOCK_OUTER_RADIUS = 41.25;
const CLOCK_TICK_RADIUS = 7.0833;
/**
 * A clock that is used as part of the datepicker.
 * @docs-private
 */
let Md2Clock = class Md2Clock {
    constructor(_element, _locale, _util) {
        this._element = _element;
        this._locale = _locale;
        this._util = _util;
        this.interval = 1;
        this.twelvehour = false;
        /** Emits when the currently selected date changes. */
        this.selectedChange = new EventEmitter();
        this.activeDateChange = new EventEmitter();
        /** Hours and Minutes representing the clock view. */
        this._hours = [];
        this._minutes = [];
        /** Whether the clock is in hour view. */
        this._hourView = true;
        this.mouseMoveListener = (event) => { this._handleMousemove(event); };
        this.mouseUpListener = (event) => { this._handleMouseup(event); };
    }
    /**
     * The date to display in this clock view.
     */
    get activeDate() { return this._activeDate; }
    set activeDate(value) {
        let oldActiveDate = this._activeDate;
        this._activeDate = this._util.clampDate(value, this.min, this.max);
        if (!this._util.isSameMinute(oldActiveDate, this._activeDate)) {
            this._init();
        }
    }
    /** The currently selected date. */
    get selected() { return this._selected; }
    set selected(value) {
        this._selected = this._util.parse(value);
        if (this._selected) {
            this.activeDate = this._selected;
        }
    }
    /** The minimum selectable date. */
    get min() { return this._min; }
    set min(date) { this._min = this._util.parse(date); }
    /** The maximum selectable date. */
    get max() { return this._max; }
    set max(date) { this._max = this._util.parse(date); }
    /** Whether the clock should be started in hour or minute view. */
    set startView(value) {
        this._hourView = value != 'minute';
    }
    get _hand() {
        this._selectedHour = this._util.getHour(this.activeDate);
        this._selectedMinute = this._util.getMinute(this.activeDate);
        let deg = 0;
        let radius = CLOCK_OUTER_RADIUS;
        if (this._hourView) {
            let outer = this.activeDate.getHours() > 0 && this.activeDate.getHours() < 13;
            radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
            if (this.twelvehour) {
                radius = CLOCK_OUTER_RADIUS;
            }
            deg = Math.round(this.activeDate.getHours() * (360 / (24 / 2)));
        }
        else {
            deg = Math.round(this.activeDate.getMinutes() * (360 / 60));
        }
        return {
            'transform': `rotate(${deg}deg)`,
            'height': `${radius}%`,
            'margin-top': `${50 - radius}%`
        };
    }
    ngAfterContentInit() {
        this.activeDate = this._activeDate || this._util.today();
        this._init();
    }
    /** Handles hour selection in the clock view. */
    _hourSelected() {
        this._hourView = false;
    }
    /** Handles minute selection in the clock view. */
    _minuteSelected() {
        this._hourView = true;
    }
    /** Handles mousedown events on the clock body. */
    _handleMousedown(event) {
        this.setTime(event);
        document.addEventListener('mousemove', this.mouseMoveListener);
        document.addEventListener('touchmove', this.mouseMoveListener);
        document.addEventListener('mouseup', this.mouseUpListener);
        document.addEventListener('touchend', this.mouseUpListener);
    }
    _handleMousemove(event) {
        event.preventDefault();
        this.setTime(event);
    }
    _handleMouseup(event) {
        document.removeEventListener('mousemove', this.mouseMoveListener);
        document.removeEventListener('touchmove', this.mouseMoveListener);
        document.removeEventListener('mouseup', this.mouseUpListener);
        document.removeEventListener('touchend', this.mouseUpListener);
        this.selectedChange.emit(this.activeDate);
        if (this._hourView) {
            this._hourSelected();
        }
        else {
            this._minuteSelected();
        }
    }
    /** Initializes this clock view. */
    _init() {
        this._hours.length = 0;
        this._minutes.length = 0;
        if (this.twelvehour) {
            for (let i = 1; i < 13; i++) {
                let radian = i / 6 * Math.PI;
                let radius = CLOCK_OUTER_RADIUS;
                let date = new Date(this.activeDate.getTime());
                date.setHours(i + 1, 0, 0, 0);
                let enabled = this._util.isDateWithinRange1(date, this.min, this.max);
                this._hours.push({
                    value: i,
                    displayValue: i === 0 ? '00' : i,
                    enabled: enabled,
                    top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
                    left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS,
                });
            }
        }
        else {
            for (let i = 0; i < 24; i++) {
                let radian = i / 6 * Math.PI;
                let outer = i > 0 && i < 13, radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
                let date = new Date(this.activeDate.getTime());
                date.setHours(i + 1, 0, 0, 0);
                let enabled = this._util.isDateWithinRange1(date, this.min, this.max);
                this._hours.push({
                    value: i,
                    displayValue: i === 0 ? '00' : i,
                    enabled: enabled,
                    top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
                    left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS,
                    fontSize: i > 0 && i < 13 ? '' : '80%'
                });
            }
        }
        for (let i = 0; i < 60; i += 5) {
            let radian = i / 30 * Math.PI;
            let date = new Date(this.activeDate.getTime());
            date.setMinutes(i, 0, 0);
            let enabled = this._util.isDateWithinRange1(date, this.min, this.max);
            this._minutes.push({
                value: i,
                displayValue: i === 0 ? '00' : i,
                enabled: enabled,
                top: CLOCK_RADIUS - Math.cos(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS,
                left: CLOCK_RADIUS + Math.sin(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS,
            });
        }
    }
    /**
     * Set Time
     * @param event
     */
    setTime(event) {
        let trigger$$1 = this._element.nativeElement;
        let triggerRect = trigger$$1.getBoundingClientRect();
        let width = trigger$$1.offsetWidth;
        let height = trigger$$1.offsetHeight;
        let pageX = event.pageX !== undefined ? event.pageX : event.touches[0].pageX;
        let pageY = event.pageY !== undefined ? event.pageY : event.touches[0].pageY;
        let x = (width / 2) - (pageX - triggerRect.left - window.pageXOffset);
        let y = (height / 2) - (pageY - triggerRect.top - window.pageYOffset);
        let radian = Math.atan2(-x, y);
        let unit = Math.PI / (this._hourView ? 6 : (this.interval ? (30 / this.interval) : 30));
        let z = Math.sqrt(x * x + y * y);
        let outer = this._hourView && z > ((width * (CLOCK_OUTER_RADIUS / 100)) +
            (width * (CLOCK_INNER_RADIUS / 100))) / 2;
        let value = 0;
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        value = Math.round(radian / unit);
        radian = value * unit;
        let date = new Date(this.activeDate.getTime());
        if (this._hourView) {
            if (this.twelvehour) {
                value = value === 0 ? 12 : value;
            }
            else {
                if (value === 12) {
                    value = 0;
                }
                value = outer ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
            }
            date.setHours(value);
        }
        else {
            if (this.interval) {
                value *= this.interval;
            }
            if (value === 60) {
                value = 0;
            }
            date.setMinutes(value);
        }
        this.activeDate = this._util.clampDate(date, this.min, this.max);
        this.activeDateChange.emit(this.activeDate);
    }
};
__decorate$64([
    Input(),
    __metadata$38("design:type", Date),
    __metadata$38("design:paramtypes", [Date])
], Md2Clock.prototype, "activeDate", null);
__decorate$64([
    Input(),
    __metadata$38("design:type", Date),
    __metadata$38("design:paramtypes", [Date])
], Md2Clock.prototype, "selected", null);
__decorate$64([
    Input(),
    __metadata$38("design:type", Date),
    __metadata$38("design:paramtypes", [Date])
], Md2Clock.prototype, "min", null);
__decorate$64([
    Input(),
    __metadata$38("design:type", Date),
    __metadata$38("design:paramtypes", [Date])
], Md2Clock.prototype, "max", null);
__decorate$64([
    Input(),
    __metadata$38("design:type", String),
    __metadata$38("design:paramtypes", [String])
], Md2Clock.prototype, "startView", null);
__decorate$64([
    Input(),
    __metadata$38("design:type", Function)
], Md2Clock.prototype, "dateFilter", void 0);
__decorate$64([
    Input(),
    __metadata$38("design:type", Number)
], Md2Clock.prototype, "interval", void 0);
__decorate$64([
    Input(),
    __metadata$38("design:type", Boolean)
], Md2Clock.prototype, "twelvehour", void 0);
__decorate$64([
    Output(),
    __metadata$38("design:type", Object)
], Md2Clock.prototype, "selectedChange", void 0);
__decorate$64([
    Output(),
    __metadata$38("design:type", Object)
], Md2Clock.prototype, "activeDateChange", void 0);
Md2Clock = __decorate$64([
    Component({selector: 'md2-clock',
        template: "<div class=\"md2-clock\"><div class=\"md2-clock-center\"></div><div class=\"md2-clock-hand\" [ngStyle]=\"_hand\"></div><div class=\"md2-clock-hours\" [class.active]=\"_hourView\"><div *ngFor=\"let item of _hours\" class=\"md2-clock-cell\" [class.md2-clock-cell-selected]=\"_selectedHour == item.value\" [class.md2-clock-cell-disabled]=\"!item.enabled\" [style.top]=\"item.top+'%'\" [style.left]=\"item.left+'%'\" [style.fontSize]=\"item.fontSize\">{{ item.displayValue }}</div></div><div class=\"md2-clock-minutes\" [class.active]=\"!_hourView\"><div *ngFor=\"let item of _minutes\" class=\"md2-clock-cell\" [class.md2-clock-cell-selected]=\"_selectedMinute == item.value\" [class.md2-clock-cell-disabled]=\"!item.enabled\" [style.top]=\"item.top+'%'\" [style.left]=\"item.left+'%'\">{{ item.displayValue }}</div></div></div>",
        styles: [":host{position:relative;display:block;min-width:224px;margin:8px;font-size:14px;box-sizing:border-box;user-select:none}.md2-clock{position:relative;width:100%;height:0;padding-top:100%;background-color:#e0e0e0;border-radius:50%}.md2-clock-center{position:absolute;top:50%;left:50%;width:2%;height:2%;margin:-1%;border-radius:50%;background-color:#106cc8}.md2-clock-hand{position:absolute;top:0;right:0;bottom:0;left:0;width:1px;margin:0 auto;background-color:#106cc8;transform-origin:bottom}.md2-clock-hand::before{content:'';position:absolute;top:-4px;left:-4px;width:8px;height:8px;border-radius:50%;background-color:#106cc8}.md2-clock-hours,.md2-clock-minutes{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;visibility:hidden;transition:350ms;transform:scale(1.2)}.md2-clock-hours.active,.md2-clock-minutes.active{opacity:1;visibility:visible;transform:scale(1)}.md2-clock-minutes{transform:scale(.8)}.md2-clock-cell{position:absolute;display:flex;width:14.1666%;height:14.1666%;color:rgba(0,0,0,.87);justify-content:center;box-sizing:border-box;border-radius:50%;align-items:center;cursor:pointer}.md2-clock-cell:not(.md2-clock-cell-selected):not(.md2-clock-cell-disabled):hover{background-color:rgba(0,0,0,.1)}.md2-clock-cell.md2-clock-cell-disabled{color:rgba(0,0,0,.38);pointer-events:none}.md2-clock-cell.md2-clock-cell-selected{color:#fff;background-color:#1279e0} /*# sourceMappingURL=clock.css.map */ "],
        host: {
            'role': 'clock',
            '(mousedown)': '_handleMousedown($event)',
        },
    }),
    __metadata$38("design:paramtypes", [ElementRef, DateLocale,
        DateUtil])
], Md2Clock);

var __decorate$53 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Md2DatepickerModule = class Md2DatepickerModule {
};
Md2DatepickerModule = __decorate$53([
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

/**
 * Extends an object with the *enumerable* and *own* properties of one or more source objects,
 * similar to Object.assign.
 *
 * @param dest The object which will have properties copied to it.
 * @param sources The source objects from which properties will be copied.
 */
/**
 * Extends an object with the *enumerable* and *own* properties of one or more source objects,
 * similar to Object.assign.
 *
 * @param dest The object which will have properties copied to it.
 * @param sources The source objects from which properties will be copied.
 */ function extendObject(dest, ...sources) {
    if (dest == null) {
        throw TypeError('Cannot convert undefined or null to object');
    }
    for (let source of sources) {
        if (source != null) {
            for (let key in source) {
                if (source.hasOwnProperty(key)) {
                    dest[key] = source[key];
                }
            }
        }
    }
    return dest;
}

var __decorate$66 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$39 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$16 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
class Md2DialogConfig {
    constructor() {
        this.role = 'dialog';
        this.disableClose = false;
    }
}
let Md2DialogPortal = class Md2DialogPortal extends TemplatePortalDirective {
    constructor(templateRef, viewContainerRef) {
        super(templateRef, viewContainerRef);
    }
};
Md2DialogPortal = __decorate$66([
    Directive({ selector: '[md2DialogPortal]' }),
    __metadata$39("design:paramtypes", [TemplateRef, ViewContainerRef])
], Md2DialogPortal);
/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
let Md2DialogTitle = class Md2DialogTitle {
};
Md2DialogTitle = __decorate$66([
    Directive({ selector: 'md2-dialog-title' })
], Md2DialogTitle);
/**
 * Scrollable content container of a dialog.
 */
let Md2DialogContent = class Md2DialogContent {
};
Md2DialogContent = __decorate$66([
    Directive({ selector: 'md2-dialog-content' })
], Md2DialogContent);
/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
let Md2DialogActions = class Md2DialogActions {
};
Md2DialogActions = __decorate$66([
    Directive({ selector: 'md2-dialog-footer, md2-dialog-actions' })
], Md2DialogActions);
let Md2Dialog = class Md2Dialog {
    constructor(_overlay, _parentDialog) {
        this._overlay = _overlay;
        this._parentDialog = _parentDialog;
        this._openDialogsAtThisLevel = [];
        this._boundKeydown = this._handleKeydown.bind(this);
        this._panelOpen = false;
        this._overlayRef = null;
        /** Property watched by the animation framework to show or hide the dialog */
        this._visibility = 'initial';
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
    }
    ngOnDestroy() { this.destroyPanel(); }
    get _openDialogs() {
        return this._parentDialog ? this._parentDialog._openDialogs : this._openDialogsAtThisLevel;
    }
    /** Open the dialog */
    open(config) {
        this.config = _applyConfigDefaults(config);
        if (this._panelOpen) {
            return Promise.resolve(this);
        }
        this._createOverlay();
        this._overlayRef.attach(this._portal);
        this._subscribeToBackdrop();
        if (!this._openDialogs.length && !this._parentDialog) {
            document.addEventListener('keydown', this._boundKeydown);
        }
        this._openDialogs.push(this);
        this._panelOpen = true;
        this._visibility = 'visible';
        return Promise.resolve(this);
    }
    /** Close the dialog */
    close() {
        this._visibility = 'hidden';
        this._panelOpen = false;
        if (this._overlayRef) {
            this._overlayRef.detach();
            if (this._backdropSubscription) {
                this._backdropSubscription.unsubscribe();
            }
        }
        let index = this._openDialogs.indexOf(this);
        if (index > -1) {
            this._openDialogs.splice(index, 1);
            // no open dialogs are left, call next on afterAllClosed Subject
            if (!this._openDialogs.length) {
                document.removeEventListener('keydown', this._boundKeydown);
            }
        }
        return Promise.resolve(this);
    }
    /** Removes the panel from the DOM. */
    destroyPanel() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._cleanUpSubscriptions();
        }
    }
    _onPanelDone() {
        if (this._panelOpen) {
            this.onOpen.emit(this);
        }
        else {
            this.onClose.emit(this);
        }
    }
    _handleKeydown(event) {
        let topDialog = this._openDialogs[this._openDialogs.length - 1];
        if (event.keyCode === ESCAPE && topDialog &&
            !topDialog.config.disableClose) {
            topDialog.close();
        }
    }
    _subscribeToBackdrop() {
        if (!this.config.disableClose) {
            this._backdropSubscription = this._overlayRef.backdropClick().first().subscribe(() => this.close());
        }
    }
    _createOverlay() {
        if (!this._overlayRef) {
            let config = new OverlayState();
            config.positionStrategy = this._overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically();
            config.hasBackdrop = true;
            this._overlayRef = this._overlay.create(config);
        }
    }
    _cleanUpSubscriptions() {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
    }
};
__decorate$66([
    Output(),
    __metadata$39("design:type", EventEmitter)
], Md2Dialog.prototype, "onOpen", void 0);
__decorate$66([
    Output(),
    __metadata$39("design:type", EventEmitter)
], Md2Dialog.prototype, "onClose", void 0);
__decorate$66([
    ViewChild(Md2DialogPortal),
    __metadata$39("design:type", Md2DialogPortal)
], Md2Dialog.prototype, "_portal", void 0);
__decorate$66([
    Input('title'),
    __metadata$39("design:type", String)
], Md2Dialog.prototype, "dialogTitle", void 0);
Md2Dialog = __decorate$66([
    Component({selector: 'md2-dialog',
        template: "<ng-template md2DialogPortal><div class=\"md2-dialog-panel\" [attr.role]=\"dialogConfig?.role\"><div class=\"md2-dialog-content\"><div class=\"md2-dialog-header\"><button *ngIf=\"!config.disableClose\" type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"close()\">&times;</button><h2 *ngIf=\"dialogTitle\" class=\"md2-dialog-title\" id=\"myDialogLabel\" [innerHtml]=\"dialogTitle\"></h2><ng-content select=\"md2-dialog-title\"></ng-content></div><div class=\"md2-dialog-body\"><ng-content select=\"md2-dialog-content\"></ng-content><ng-content></ng-content></div><ng-content select=\"md2-dialog-footer\"></ng-content><ng-content select=\"md2-dialog-actions\"></ng-content></div></div></ng-template>",
        styles: [".md2-dialog-panel{position:relative;max-width:90vw;width:600px;border-radius:3px;background-color:#fff;overflow:hidden;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.md2-dialog-header{background:#2196f3;color:#fff;font-size:25px;line-height:1.1;font-weight:500;padding:0 48px 0 16px;border-bottom:1px solid #e5e5e5;word-wrap:break-word}.md2-dialog-header .close{position:absolute;top:21px;right:16px;display:inline-block;width:18px;height:18px;overflow:hidden;-webkit-appearance:none;padding:0;cursor:pointer;background:0 0;border:0;outline:0;opacity:.8;font-size:0;z-index:1;min-width:initial;box-shadow:none;margin:0}.md2-dialog-header .close::after,.md2-dialog-header .close::before{content:'';position:absolute;top:50%;left:0;width:100%;height:2px;margin-top:-1px;background:#ccc;border-radius:2px}.md2-dialog-header .close::before{transform:rotate(45deg)}.md2-dialog-header .close::after{transform:rotate(-45deg)}.md2-dialog-header .close:hover{opacity:1}.md2-dialog-header .md2-dialog-title,.md2-dialog-header md2-dialog-title{display:block;margin:0;padding:16px 0;font-size:25px;font-weight:500}.md2-dialog-header dialog-header{line-height:33px}.md2-dialog-body{position:relative;max-height:65vh;padding:16px;overflow-y:auto}.md2-dialog-footer,md2-dialog-footer{display:block;padding:16px;text-align:right;border-top:1px solid rgba(0,0,0,.12)}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.6)} /*# sourceMappingURL=dialog.css.map */ "],
        host: {
            'tabindex': '0',
            '[attr.role]': 'config?.role',
        },
        animations: [
            trigger('state', [
                state('void', style({ transform: 'scale(0.3)' })),
                state('initial', style({ transform: 'scale(0.3)' })),
                state('visible', style({ transform: 'scale(1)' })),
                state('hidden', style({ transform: 'scale(0.3)' })),
                transition('* => visible', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
                transition('* => hidden', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
            ])
        ],
        encapsulation: ViewEncapsulation.None,
        exportAs: 'md2Dialog'
    }),
    __param$16(1, Optional()), __param$16(1, SkipSelf()),
    __metadata$39("design:paramtypes", [Overlay,
        Md2Dialog])
], Md2Dialog);
/**
 * Applies default options to the dialog config.
 * @param dialogConfig Config to be modified.
 * @returns The new configuration object.
 */
function _applyConfigDefaults(dialogConfig) {
    return extendObject(new Md2DialogConfig(), dialogConfig);
}

var __decorate$65 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Md2DialogModule = class Md2DialogModule {
};
Md2DialogModule = __decorate$65([
    NgModule({
        imports: [CommonModule, OverlayModule, MdCommonModule, PlatformModule],
        exports: [
            Md2Dialog,
            Md2DialogTitle,
            Md2DialogContent,
            Md2DialogActions,
            Md2DialogPortal
        ],
        declarations: [
            Md2Dialog,
            Md2DialogTitle,
            Md2DialogContent,
            Md2DialogActions,
            Md2DialogPortal
        ],
        entryComponents: [Md2Dialog],
    })
], Md2DialogModule);

var __decorate$68 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Md2MenuContent = class Md2MenuContent {
};
Md2MenuContent = __decorate$68([
    Component({selector: '[md2-menu-content]',
        host: { 'role': 'menu' },
        template: '<ng-content></ng-content>',
        styles: ["[md2-menu]{position:relative;display:inline-block}[md2-menu-content]{position:absolute;top:0;left:0;display:inline-block;background:#fff;list-style:none;min-width:112px;max-width:280px;max-height:calc(100vh + 48px);padding:8px 0;margin:0;z-index:1001;border-radius:2px;transform:scale(0);transform-origin:left top;transition:all .2s linear;box-shadow:0 2px 6px 1px rgba(0,0,0,.34)}[md2-menu-item] [md2-menu-content]{left:100%;margin:-8px 0}[md2-menu-content][x-position=before]{right:0;left:auto;transform-origin:right top}[md2-menu-item] [md2-menu-content][x-position=before]{right:100%}[md2-menu-content][y-position=above]{top:auto;bottom:0;transform-origin:left bottom}[md2-menu-content][y-position=above][x-position=before]{transform-origin:right bottom}.open>[md2-menu-content]{transform:scale(1)}[md2-menu-item]{position:relative;width:100%;cursor:pointer;user-select:none;outline:0;border:none;white-space:nowrap;text-overflow:ellipsis;display:flex;flex-direction:row;align-items:center;height:36px;padding:0 16px;font-size:16px;text-align:start;text-decoration:none;background:0 0;color:rgba(0,0,0,.87);box-sizing:border-box}[md2-menu-item][disabled]{color:rgba(0,0,0,.38)}[md2-menu-item].open,[md2-menu-item]:focus:not([disabled]),[md2-menu-item]:hover:not([disabled]){background:rgba(0,0,0,.04);text-decoration:none}[md2-menu-item]>[md2-menu-trigger]{display:block;height:36px;width:calc(100% + 32px);margin:0 -16px;padding:0 16px;font:inherit;color:inherit;text-align:left;background:0 0;outline:0;border:0;cursor:pointer;box-shadow:none}.md-overlay-container{position:fixed;pointer-events:none;top:0;left:0;height:100%;width:100%;z-index:1000}.md-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.md-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.md-overlay-transparent-backdrop{background:0 0}.md-overlay-backdrop.md-overlay-backdrop-showing{opacity:.48} /*# sourceMappingURL=menu.css.map */ "],
        encapsulation: ViewEncapsulation.None,
    })
], Md2MenuContent);

var __decorate$69 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Md2MenuItem = class Md2MenuItem {
};
Md2MenuItem = __decorate$69([
    Component({selector: '[md2-menu-item]',
        host: {
            'role': 'menuitem'
        },
        template: '<ng-content></ng-content>'
    })
], Md2MenuItem);

var __decorate$70 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$40 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let Md2MenuTrigger = class Md2MenuTrigger {
    constructor(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
    }
    ngAfterViewInit() {
        this._handleClick = this._renderer.listenGlobal('document', 'click', (event) => {
            if (!this._hasChildMenu(event)) {
                this._closeMenu();
            }
        });
    }
    ngOnDestroy() {
        this._handleClick = null;
    }
    _toggleMenu() {
        if (this._hasClass(this._getParentElement(), 'open')) {
            this._closeMenu();
        }
        else {
            this._openMenu();
        }
    }
    _openMenu() {
        this._getParentElement().classList.add('open');
        let siblingElements = this._getSiblingElements(this._getParentElement());
        siblingElements.forEach((el) => {
            el.classList.remove('open');
            this._closeChildrenMenu(el);
        });
    }
    _closeMenu() {
        this._getParentElement().classList.remove('open');
        this._closeChildrenMenu(this._getParentElement());
    }
    _closeChildrenMenu(element) {
        [].forEach.call(element.querySelectorAll('.open'), (el) => {
            el.classList.remove('open');
        });
    }
    _getHostElement() {
        return this._element.nativeElement;
    }
    _getParentElement() {
        return this._element.nativeElement.parentNode;
    }
    _getSiblingElements(element) {
        let siblingElements = [];
        let el = element.parentNode.firstChild;
        for (; el; el = el.nextSibling) {
            if (el.nodeType == 1 && el !== element) {
                siblingElements.push(el);
            }
        }
        return siblingElements;
    }
    _getClosestElement(element, target) {
        if (element.hasAttribute(target)) {
            return element;
        }
        let parentEl;
        while (element) {
            parentEl = element.parentElement;
            if (parentEl && parentEl.hasAttribute(target)) {
                return parentEl;
            }
            element = parentEl;
        }
        return null;
    }
    _hasClass(element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    }
    _hasChildMenu(event) {
        let el = this._getClosestElement(event.target, 'md2-menu-trigger');
        if (el && el === this._getHostElement()) {
            return true;
        }
        else if (this._getParentElement().contains(event.target)) {
            el = this._getClosestElement(event.target, 'md2-menu-item');
            if (el && el.querySelectorAll('[md2-menu-content]').length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
};
Md2MenuTrigger = __decorate$70([
    Directive({
        selector: '[md2-menu-trigger]',
        host: {
            'aria-haspopup': 'true',
            '(click)': '_toggleMenu()',
        },
        exportAs: 'md2MenuTrigger'
    }),
    __metadata$40("design:paramtypes", [ElementRef, Renderer])
], Md2MenuTrigger);

var __decorate$67 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Md2Menu = class Md2Menu {
};
Md2Menu = __decorate$67([
    Component({selector: '[md2-menu]',
        template: '<ng-content></ng-content>',
        styles: ["[md2-menu]{position:relative;display:inline-block}[md2-menu-content]{position:absolute;top:0;left:0;display:inline-block;background:#fff;list-style:none;min-width:112px;max-width:280px;max-height:calc(100vh + 48px);padding:8px 0;margin:0;z-index:1001;border-radius:2px;transform:scale(0);transform-origin:left top;transition:all .2s linear;box-shadow:0 2px 6px 1px rgba(0,0,0,.34)}[md2-menu-item] [md2-menu-content]{left:100%;margin:-8px 0}[md2-menu-content][x-position=before]{right:0;left:auto;transform-origin:right top}[md2-menu-item] [md2-menu-content][x-position=before]{right:100%}[md2-menu-content][y-position=above]{top:auto;bottom:0;transform-origin:left bottom}[md2-menu-content][y-position=above][x-position=before]{transform-origin:right bottom}.open>[md2-menu-content]{transform:scale(1)}[md2-menu-item]{position:relative;width:100%;cursor:pointer;user-select:none;outline:0;border:none;white-space:nowrap;text-overflow:ellipsis;display:flex;flex-direction:row;align-items:center;height:36px;padding:0 16px;font-size:16px;text-align:start;text-decoration:none;background:0 0;color:rgba(0,0,0,.87);box-sizing:border-box}[md2-menu-item][disabled]{color:rgba(0,0,0,.38)}[md2-menu-item].open,[md2-menu-item]:focus:not([disabled]),[md2-menu-item]:hover:not([disabled]){background:rgba(0,0,0,.04);text-decoration:none}[md2-menu-item]>[md2-menu-trigger]{display:block;height:36px;width:calc(100% + 32px);margin:0 -16px;padding:0 16px;font:inherit;color:inherit;text-align:left;background:0 0;outline:0;border:0;cursor:pointer;box-shadow:none}.md-overlay-container{position:fixed;pointer-events:none;top:0;left:0;height:100%;width:100%;z-index:1000}.md-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.md-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.md-overlay-transparent-backdrop{background:0 0}.md-overlay-backdrop.md-overlay-backdrop-showing{opacity:.48} /*# sourceMappingURL=menu.css.map */ "],
        encapsulation: ViewEncapsulation.None,
    })
], Md2Menu);
let Md2MenuModule = class Md2MenuModule {
};
Md2MenuModule = __decorate$67([
    NgModule({
        imports: [CommonModule],
        exports: [Md2Menu, Md2MenuContent, Md2MenuItem, Md2MenuTrigger],
        declarations: [Md2Menu, Md2MenuContent, Md2MenuItem, Md2MenuTrigger],
    })
], Md2MenuModule);

//# sourceMappingURL=index.js.map

var __decorate$71 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$41 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Change event object that is emitted when the tab has changed. */
class Md2TabChange {
    constructor(tab, index) {
        this.tab = tab;
        this.index = index;
    }
}
let Md2Transclude = class Md2Transclude {
    constructor(viewRef) {
        this.viewRef = viewRef;
    }
    get md2Transclude() { return this._md2Transclude; }
    set md2Transclude(templateRef) {
        this._md2Transclude = templateRef;
        if (templateRef) {
            this.viewRef.createEmbeddedView(templateRef);
        }
    }
};
__decorate$71([
    Input(),
    __metadata$41("design:type", Object),
    __metadata$41("design:paramtypes", [TemplateRef])
], Md2Transclude.prototype, "md2Transclude", null);
Md2Transclude = __decorate$71([
    Directive({ selector: '[md2Transclude]' }),
    __metadata$41("design:paramtypes", [ViewContainerRef])
], Md2Transclude);
let Md2Tab = class Md2Tab {
};
__decorate$71([
    Input(),
    __metadata$41("design:type", String)
], Md2Tab.prototype, "label", void 0);
__decorate$71([
    Input(),
    __metadata$41("design:type", Boolean)
], Md2Tab.prototype, "active", void 0);
__decorate$71([
    Input(),
    __metadata$41("design:type", Boolean)
], Md2Tab.prototype, "disabled", void 0);
__decorate$71([
    Input(),
    __metadata$41("design:type", String)
], Md2Tab.prototype, "class", void 0);
Md2Tab = __decorate$71([
    Component({selector: 'md2-tab',
        template: `<ng-content></ng-content>`,
        host: {
            '[class]': 'class',
            '[class.active]': 'active'
        }
    })
], Md2Tab);
let Md2TabLabel = class Md2TabLabel {
    constructor(templateRef, tab) {
        this.templateRef = templateRef;
        tab.labelRef = templateRef;
    }
};
Md2TabLabel = __decorate$71([
    Directive({ selector: '[md2-tab-label]' }),
    __metadata$41("design:paramtypes", [TemplateRef, Md2Tab])
], Md2TabLabel);
let Md2Tabs = class Md2Tabs {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this._isInitialized = false;
        this._focusIndex = 0;
        this._selectedIndex = 0;
        this._shouldPaginate = false;
        this._offsetLeft = 0;
        this._inkBarLeft = '0';
        this._inkBarWidth = '0';
        this.change = new EventEmitter();
        this.selectedIndexChange = new EventEmitter();
    }
    get selectedIndex() { return this._selectedIndex; }
    set selectedIndex(value) {
        if (typeof value === 'string') {
            value = parseInt(value);
        }
        if (value !== this._selectedIndex) {
            this._selectedIndex = value;
            this.adjustOffset(value);
            this._updateInkBar();
            if (this.tabs) {
                const tabs = this.tabs.toArray();
                if (!tabs[value].disabled) {
                    tabs.forEach(tab => tab.active = false);
                    tabs[value].active = true;
                }
            }
            if (this._isInitialized) {
                this._emitChangeEvent();
                this.selectedIndexChange.emit(value);
            }
        }
    }
    get focusIndex() { return this._focusIndex; }
    set focusIndex(value) {
        this._focusIndex = value;
        this.adjustOffset(value);
    }
    get element() {
        const elements = {
            root: this.elementRef.nativeElement,
            wrapper: null,
            canvas: null,
            paging: null,
            tabs: null
        };
        elements.wrapper = elements.root.querySelector('.md2-tabs-header-wrapper');
        elements.canvas = elements.wrapper.querySelector('.md2-tabs-canvas');
        elements.paging = elements.canvas.querySelector('.md2-tabs-header');
        elements.tabs = elements.paging.querySelectorAll('.md2-tab-label');
        return elements;
    }
    /**
     * After Content Init
     */
    ngAfterContentInit() {
        setTimeout(() => {
            this.updatePagination();
        }, 0);
        setTimeout(() => {
            const tabs = this.tabs.toArray();
            if (this.selectedIndex) {
                if (this.selectedIndex >= tabs.length) {
                    this.selectedIndex = 0;
                }
                tabs.forEach(tab => tab.active = false);
                tabs[this.selectedIndex].active = true;
                this.adjustOffset(this.selectedIndex);
            }
            else {
                let index = tabs.findIndex((t) => t.active);
                if (index < 0) {
                    tabs[0].active = true;
                }
                else {
                    this.selectedIndex = index;
                }
            }
            this._updateInkBar();
        }, 0);
        this._isInitialized = true;
    }
    /**
     * Calculates the styles from the selected tab for the ink-bar.
     */
    _updateInkBar() {
        let elements = this.element;
        if (!elements.tabs[this.selectedIndex]) {
            return;
        }
        let tab = elements.tabs[this.selectedIndex];
        this._inkBarLeft = tab.offsetLeft + 'px';
        this._inkBarWidth = tab.offsetWidth + 'px';
    }
    /** Emits an event when the user selects an option. */
    _emitChangeEvent() {
        let index = this._selectedIndex;
        this.change.emit(new Md2TabChange(this.tabs.toArray()[index], index));
    }
    /**
     * Focus next Tab
     */
    focusNextTab() { this.incrementIndex(1); }
    /**
     * Focus previous Tab
     */
    focusPreviousTab() { this.incrementIndex(-1); }
    /**
     * Mouse Wheel scroll
     * @param event
     */
    scroll(event) {
        if (!this._shouldPaginate) {
            return;
        }
        event.preventDefault();
        this._offsetLeft = this.fixOffset(this._offsetLeft - event.wheelDelta);
    }
    /**
     * Next Page
     */
    nextPage() {
        let elements = this.element;
        let viewportWidth = elements.canvas.clientWidth, totalWidth = viewportWidth + this._offsetLeft, i, tab;
        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth > totalWidth) {
                break;
            }
        }
        this._offsetLeft = this.fixOffset(tab.offsetLeft);
    }
    /**
     * Previous Page
     */
    previousPage() {
        let i, tab, elements = this.element;
        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth >= this._offsetLeft) {
                break;
            }
        }
        this._offsetLeft = this.fixOffset(tab.offsetLeft +
            tab.offsetWidth - elements.canvas.clientWidth);
    }
    /**
     * On Window Resize
     * @param event
     */
    onWindowResize(event) {
        this._offsetLeft = this.fixOffset(this._offsetLeft);
        this.updatePagination();
    }
    /**
     * Can page Back
     */
    canPageBack() { return this._offsetLeft > 0; }
    /**
     * Can page Previous
     */
    canPageForward() {
        let elements = this.element;
        let lastTab = elements.tabs[elements.tabs.length - 1];
        return lastTab && lastTab.offsetLeft + lastTab.offsetWidth > elements.canvas.clientWidth +
            this._offsetLeft;
    }
    /**
     * Update Pagination
     */
    updatePagination() {
        let canvasWidth = this.element.root.clientWidth;
        let tabs = this.element.tabs ? this.element.tabs : [];
        for (let i = 0; i < tabs.length; i++) {
            canvasWidth -= tabs[i].offsetWidth;
        }
        this._shouldPaginate = canvasWidth < 0;
    }
    /**
     * Increment Focus Tab
     * @param inc
     */
    incrementIndex(inc) {
        let newIndex, index = this.focusIndex;
        for (newIndex = index + inc; this.tabs.toArray()[newIndex] && this.tabs.toArray()[newIndex].disabled; newIndex += inc) { }
        if (this.tabs.toArray()[newIndex]) {
            this.focusIndex = newIndex;
        }
    }
    /**
     * Adjust Offset of Tab
     * @param index
     */
    adjustOffset(index) {
        let elements = this.element;
        if (!elements.tabs[index]) {
            return;
        }
        let tab = elements.tabs[index], left = tab.offsetLeft, right = tab.offsetWidth + left;
        this._offsetLeft = Math.max(this._offsetLeft, this.fixOffset(right - elements.canvas.clientWidth + 32 * 2));
        this._offsetLeft = Math.min(this._offsetLeft, this.fixOffset(left));
    }
    /**
     * Fix Offset of Tab
     * @param value
     * @return value
     */
    fixOffset(value) {
        let elements = this.element;
        if (!elements.tabs.length || !this._shouldPaginate) {
            return 0;
        }
        let lastTab = elements.tabs[elements.tabs.length - 1], totalWidth = lastTab.offsetLeft + lastTab.offsetWidth;
        value = Math.min(totalWidth - elements.canvas.clientWidth, value);
        value = Math.max(0, value);
        return value;
    }
};
__decorate$71([
    ContentChildren(Md2Tab),
    __metadata$41("design:type", QueryList)
], Md2Tabs.prototype, "tabs", void 0);
__decorate$71([
    Input(),
    __metadata$41("design:type", String)
], Md2Tabs.prototype, "class", void 0);
__decorate$71([
    Input(),
    __metadata$41("design:type", Object),
    __metadata$41("design:paramtypes", [Object])
], Md2Tabs.prototype, "selectedIndex", null);
__decorate$71([
    Output(),
    __metadata$41("design:type", EventEmitter)
], Md2Tabs.prototype, "change", void 0);
__decorate$71([
    Output(),
    __metadata$41("design:type", EventEmitter)
], Md2Tabs.prototype, "selectedIndexChange", void 0);
Md2Tabs = __decorate$71([
    Component({selector: 'md2-tabs',
        template: "<div class=\"md2-tabs-header-wrapper\"><div role=\"button\" class=\"md2-prev-button\" [class.disabled]=\"!canPageBack()\" *ngIf=\"_shouldPaginate\" (click)=\"previousPage()\"><em class=\"prev-icon\">Prev</em></div><div role=\"button\" class=\"md2-next-button\" [class.disabled]=\"!canPageForward()\" *ngIf=\"_shouldPaginate\" (click)=\"nextPage()\"><em class=\"next-icon\">Next</em></div><div class=\"md2-tabs-canvas\" [class.md2-paginated]=\"_shouldPaginate\" role=\"tablist\" tabindex=\"0\" (keydown.arrowRight)=\"focusNextTab()\" (keydown.arrowLeft)=\"focusPreviousTab()\" (keydown.enter)=\"selectedIndex = focusIndex\" (mousewheel)=\"scroll($event)\"><div class=\"md2-tabs-header\" [style.marginLeft.px]=\"-_offsetLeft\"><div class=\"md2-tab-label\" role=\"tab\" *ngFor=\"let tab of tabs; let i = index\" [class.focus]=\"focusIndex === i\" [class.active]=\"selectedIndex === i\" [class.disabled]=\"tab.disabled\" (click)=\"focusIndex = selectedIndex = i\"><span [md2Transclude]=\"tab.labelRef\">{{tab.label}}</span></div><div class=\"md2-tab-ink-bar\" [style.left]=\"_inkBarLeft\" [style.width]=\"_inkBarWidth\"></div></div></div></div><div class=\"md2-tabs-body-wrapper\"><ng-content></ng-content></div>",
        styles: ["md2-tabs{position:relative;overflow:hidden;display:block;margin:0;border:1px solid #e1e1e1;border-radius:2px}.md2-tabs-header-wrapper{position:relative;display:block;height:48px;background:#fff;border-width:0 0 1px;border-style:solid;border-color:rgba(0,0,0,.12);margin:0;padding:0;list-style:none;user-select:none}.md2-tabs-header-wrapper::after{content:'';display:table;clear:both}.md2-next-button,.md2-prev-button{position:absolute;top:0;height:100%;width:32px;padding:8px 0;z-index:2;cursor:pointer}.md2-next-button.disabled,.md2-prev-button.disabled{opacity:.25;cursor:default}.md2-prev-button{left:0}.md2-next-button{right:0}.md2-next-button .next-icon,.md2-prev-button .prev-icon{display:block;width:12px;height:12px;font-size:0;border-width:0 0 2px 2px;border-style:solid;border-color:#757575;border-radius:1px;transform:rotate(45deg);margin:10px}.md2-next-button .next-icon{border-width:2px 2px 0 0}.md2-tabs-canvas{position:relative;height:100%;overflow:hidden;display:block;outline:0}.md2-tabs-canvas.md2-paginated{margin:0 32px}.md2-tabs-header{position:relative;display:inline-block;height:100%;white-space:nowrap;transition:.5s cubic-bezier(.35,0,.25,1)}.md2-tab-label{position:relative;height:100%;color:rgba(0,0,0,.54);font-size:14px;text-align:center;line-height:24px;padding:12px 24px;transition:background-color 350ms cubic-bezier(.35,0,.25,1);cursor:pointer;white-space:nowrap;text-transform:uppercase;display:inline-block;font-weight:500;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden;-ms-text-overflow:ellipsis;-o-text-overflow:ellipsis;text-overflow:ellipsis}.md2-tab-label.active{color:#106cc8}.md2-tabs-canvas:focus .md2-tab-label.focus{background:rgba(0,0,0,.05)}.md2-tab-label.disabled{color:rgba(0,0,0,.26);pointer-events:none;user-select:none;-webkit-user-drag:none;opacity:.5;cursor:default}.md2-tab-ink-bar{position:absolute;bottom:0;height:2px;background:#ff5252;transition:250ms cubic-bezier(.35,0,.25,1)}.md2-tabs-body-wrapper{position:relative;min-height:0;display:block;clear:both}md2-tab{padding:16px;display:none;position:relative}md2-tab.active{display:block;position:relative} /*# sourceMappingURL=tabs.css.map */ "],
        host: {
            '[class]': 'class',
            '(window:resize)': 'onWindowResize($event)'
        },
        encapsulation: ViewEncapsulation.None
    }),
    __metadata$41("design:paramtypes", [ElementRef])
], Md2Tabs);
const MD2_TABS_DIRECTIVES = [Md2TabLabel, Md2Tabs, Md2Tab];
let Md2TabsModule = class Md2TabsModule {
};
Md2TabsModule = __decorate$71([
    NgModule({
        imports: [CommonModule],
        exports: MD2_TABS_DIRECTIVES,
        declarations: [Md2Transclude, Md2TabLabel, Md2Tabs, Md2Tab],
    })
], Md2TabsModule);

//# sourceMappingURL=index.js.map

var __decorate$73 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$42 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const noop = () => { };
let nextId$5 = 0;
class Tag {
    constructor(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
}
const MD2_TAGS_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Md2Tags),
    multi: true
};
let Md2Tags = class Md2Tags {
    constructor(_element) {
        this._element = _element;
        this.change = new EventEmitter();
        this._value = '';
        this._disabled = false;
        this._isInitialized = false;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this._tags = [];
        this._list = [];
        this._items = [];
        this._focusedTag = 0;
        this._selectedTag = -1;
        this._inputValue = '';
        this._inputFocused = false;
        this.noBlur = true;
        this.id = 'md2-tags-' + (++nextId$5);
        this.tabindex = 0;
        this.placeholder = '';
        this.textKey = 'text';
        this.valueKey = null;
        this.selectAndFocusTagSafe = function (index) {
            if (!this._items.length) {
                this._selectTag(-1);
                this._handleFocus();
                return;
            }
            if (index === this._items.length) {
                return this._handleFocus();
            }
            index = Math.max(index, 0);
            index = Math.min(index, this._items.length - 1);
            this._selectTag(index);
        };
    }
    ngAfterContentInit() { this._isInitialized = true; }
    get disabled() { return this._disabled; }
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    set tags(value) { this._tags = value; }
    get value() { return this._value; }
    set value(value) { this.setValue(value); }
    /**
     * setup value
     * @param value
     */
    setValue(value) {
        if (value !== this._value) {
            this._value = value;
            this._items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    let selItm = this._tags.find((t) => this.equals(this.valueKey ?
                        t[this.valueKey] : t, value[i]));
                    if (selItm) {
                        this._items.push(new Tag(selItm, this.textKey, this.valueKey));
                    }
                }
            }
            if (this._isInitialized) {
                this._onChangeCallback(value);
                this.change.emit(this._value);
            }
        }
    }
    /**
     * Compare two vars or objects
     * @param o1 compare first object
     * @param o2 compare second object
     * @return boolean comparation result
     */
    equals(o1, o2) {
        if (o1 === o2) {
            return true;
        }
        if (o1 === null || o2 === null) {
            return false;
        }
        if (o1 !== o1 && o2 !== o2) {
            return true;
        }
        let t1 = typeof o1, t2 = typeof o2, key, keySet;
        if (t1 === t2 && t1 === 'object') {
            keySet = Object.create(null);
            for (key in o1) {
                if (!this.equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && key.charAt(0) !== '$' && o2[key]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    get isMenuVisible() {
        return ((this._inputFocused || this.noBlur) && this._inputValue &&
            this._list && this._list.length) ? true : false;
    }
    /**
     * update scroll of tags suggestion menu
     */
    updateScroll() {
        if (this._focusedTag < 0) {
            return;
        }
        let menuContainer = this._element.nativeElement.querySelector('.md2-tags-menu');
        if (!menuContainer) {
            return;
        }
        let choices = menuContainer.querySelectorAll('.md2-option');
        if (choices.length < 1) {
            return;
        }
        let highlighted = choices[this._focusedTag];
        if (!highlighted) {
            return;
        }
        let top = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
        let height = menuContainer.offsetHeight;
        if (top > height) {
            menuContainer.scrollTop += top - height;
        }
        else if (top < highlighted.clientHeight) {
            menuContainer.scrollTop -= highlighted.clientHeight - top;
        }
    }
    /**
     * input key listener
     * @param event
     */
    _handleInputKeydown(event) {
        // Backspace
        if (event.keyCode === 8 && !this._inputValue) {
            event.preventDefault();
            event.stopPropagation();
            if (this._items.length && this._selectedTag < 0) {
                this.selectAndFocusTagSafe(this._items.length - 1);
            }
            if (this._items.length && this._selectedTag > -1) {
                this.removeAndSelectAdjacentTag(this._selectedTag);
            }
            return;
        }
        // Del Key
        if (event.keyCode === 46 && !this._inputValue) {
            return;
        }
        // Left / Right Arrow
        if ((event.keyCode === 37 || event.keyCode === 39) && !this._inputValue) {
            return;
        }
        // Down Arrow
        if (event.keyCode === 40) {
            if (!this.isMenuVisible) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            this._focusedTag = (this._focusedTag === this._list.length - 1) ?
                0 : Math.min(this._focusedTag + 1, this._list.length - 1);
            this.updateScroll();
            return;
        }
        // Up Arrow
        if (event.keyCode === 38) {
            if (!this.isMenuVisible) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            this._focusedTag = (this._focusedTag === 0) ?
                this._list.length - 1 : Math.max(0, this._focusedTag - 1);
            this.updateScroll();
            return;
        }
        // Tab Key
        if (event.keyCode === 9) {
            return;
        }
        // Enter / Space
        if (event.keyCode === 13 || event.keyCode === 32) {
            if (!this._inputValue || !this.isMenuVisible) {
                event.preventDefault();
                return;
            }
            event.preventDefault();
            this._addTag(event, this._focusedTag);
            return;
        }
        // Escape Key
        if (event.keyCode === 27) {
            event.stopPropagation();
            event.preventDefault();
            if (this._inputValue) {
                this._inputValue = '';
            }
            if (this._selectedTag >= 0) {
                this._handleFocus();
            }
            return;
        }
        // reset selected tag
        if (this._selectedTag >= 0) {
            this.resetselectedTag();
        }
        // filter
        setTimeout(() => {
            this.filterMatches();
        }, 10);
    }
    _handleKeydown(event) {
        if (this.disabled || this._inputValue) {
            return;
        }
        switch (event.keyCode) {
            case BACKSPACE:
            case DELETE:
                if (this._selectedTag < 0) {
                    return;
                }
                event.preventDefault();
                this.removeAndSelectAdjacentTag(this._selectedTag);
                break;
            case TAB:
            case ESCAPE:
                if (this._selectedTag < 0) {
                    return;
                }
                event.preventDefault();
                this._handleFocus();
                break;
            case LEFT_ARROW:
                event.preventDefault();
                if (this._selectedTag < 0) {
                    this._selectedTag = this._items.length;
                }
                if (this._items.length) {
                    this.selectAndFocusTagSafe(this._selectedTag - 1);
                }
                break;
            case RIGHT_ARROW:
                event.preventDefault();
                if (this._selectedTag >= this._items.length) {
                    this._selectedTag = -1;
                }
                this.selectAndFocusTagSafe(this._selectedTag + 1);
                break;
        }
    }
    removeAndSelectAdjacentTag(index) {
        let selIndex = this.getAdjacentTagIndex(index);
        this.removeTag(index);
        this.selectAndFocusTagSafe(selIndex);
    }
    resetselectedTag() {
        this._selectedTag = -1;
    }
    getAdjacentTagIndex(index) {
        let len = this._items.length - 1;
        return (len === 0) ? -1 :
            (index === len) ? index - 1 : index;
    }
    /**
     * add tag
     * @param event
     * @param index index of the specific tag
     */
    _addTag(event, index) {
        event.preventDefault();
        event.stopPropagation();
        this._items.push(this._list[index]);
        this._inputValue = '';
        this.updateValue();
    }
    _removeTagAndFocusInput(index) {
        this.removeTag(index);
        this._handleFocus();
    }
    /**
     * remove tag
     * @param index
     */
    removeTag(index) {
        this._items.splice(index, 1);
        this.updateValue();
    }
    /**
     * update value
     */
    updateValue() {
        this._value = new Array();
        for (let i = 0; i < this._items.length; i++) {
            this._value.push(this._items[i].value);
        }
        this._onChangeCallback(this._value);
        this.change.emit(this._value);
    }
    /**
     * select tag
     * @param index of select tag
     */
    _selectTag(index) {
        if (index >= -1 && index <= this._items.length) {
            this._selectedTag = index;
        }
    }
    _handleFocus() {
        this._element.nativeElement.querySelector('input').focus();
        this.resetselectedTag();
    }
    _onInputFocus() {
        this._inputFocused = true;
        this.resetselectedTag();
    }
    _onInputBlur() {
        this._inputFocused = false;
    }
    _listEnter() { this.noBlur = true; }
    _listLeave() { this.noBlur = false; }
    /**
     * update suggestion menu with filter
     * @param query
     */
    filterMatches() {
        let tempList = this._tags.map((tag) => new Tag(tag, this.textKey, this.valueKey));
        this._list = tempList.filter((t) => (new RegExp(this._inputValue, 'ig').test(t.text) &&
            !this._items.find((i) => t.text === i.text)));
        if (this._list.length > 0) {
            this._focusedTag = 0;
        }
    }
    writeValue(value) {
        if (value !== this._value) {
            this._value = value;
            this._items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    let selItm = this._tags.find((t) => this.equals(this.valueKey ?
                        t[this.valueKey] : t, value[i]));
                    if (selItm) {
                        this._items.push(new Tag(selItm, this.textKey, this.valueKey));
                    }
                }
            }
        }
    }
    registerOnChange(fn) { this._onChangeCallback = fn; }
    registerOnTouched(fn) { this._onTouchedCallback = fn; }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
};
__decorate$73([
    Output(),
    __metadata$42("design:type", EventEmitter)
], Md2Tags.prototype, "change", void 0);
__decorate$73([
    Input(),
    __metadata$42("design:type", String)
], Md2Tags.prototype, "id", void 0);
__decorate$73([
    Input(),
    __metadata$42("design:type", Number)
], Md2Tags.prototype, "tabindex", void 0);
__decorate$73([
    Input(),
    __metadata$42("design:type", String)
], Md2Tags.prototype, "placeholder", void 0);
__decorate$73([
    Input('md2-tag-text'),
    __metadata$42("design:type", String)
], Md2Tags.prototype, "textKey", void 0);
__decorate$73([
    Input('md2-tag-value'),
    __metadata$42("design:type", String)
], Md2Tags.prototype, "valueKey", void 0);
__decorate$73([
    Input(),
    __metadata$42("design:type", Boolean),
    __metadata$42("design:paramtypes", [Object])
], Md2Tags.prototype, "disabled", null);
__decorate$73([
    Input('md2-tags'),
    __metadata$42("design:type", Array),
    __metadata$42("design:paramtypes", [Array])
], Md2Tags.prototype, "tags", null);
__decorate$73([
    Input(),
    __metadata$42("design:type", Object),
    __metadata$42("design:paramtypes", [Object])
], Md2Tags.prototype, "value", null);
__decorate$73([
    HostListener('keydown', ['$event']),
    __metadata$42("design:type", Function),
    __metadata$42("design:paramtypes", [KeyboardEvent]),
    __metadata$42("design:returntype", void 0)
], Md2Tags.prototype, "_handleKeydown", null);
__decorate$73([
    HostListener('focus'),
    __metadata$42("design:type", Function),
    __metadata$42("design:paramtypes", []),
    __metadata$42("design:returntype", void 0)
], Md2Tags.prototype, "_handleFocus", null);
Md2Tags = __decorate$73([
    Component({selector: 'md2-tags',
        template: "<div class=\"md2-tags-container\"><span *ngFor=\"let t of _items; let i = index;\" class=\"md2-tag\" [class.active]=\"_selectedTag === i\" (click)=\"_selectTag(i)\"><span class=\"md2-tag-text\">{{t.text}}</span> <svg (click)=\"_removeTagAndFocusInput(i)\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/></svg></span><div class=\"md2-tag-add\"><input [(ngModel)]=\"_inputValue\" type=\"text\" tabs=\"false\" autocomplete=\"off\" tabindex=\"-1\" [disabled]=\"disabled\" class=\"md2-tags-input\" [placeholder]=\"placeholder\" (focus)=\"_onInputFocus()\" (blur)=\"_onInputBlur()\" (keydown)=\"_handleInputKeydown($event)\" (change)=\"$event.stopPropagation()\"><ul *ngIf=\"isMenuVisible\" class=\"md2-tags-menu\" (mouseenter)=\"_listEnter()\" (mouseleave)=\"_listLeave()\"><li class=\"md2-tag-option\" *ngFor=\"let l of _list; let i = index;\" [class.focused]=\"_focusedTag === i\" (click)=\"_addTag($event, i)\"><span class=\"md2-tag-option-text\" [innerHtml]=\"l.text | highlight:_inputValue\"></span></li></ul></div></div>",
        styles: [":host{outline:0;user-select:none;backface-visibility:hidden}.md2-tags-container{position:relative;display:block;max-width:100%;padding:2px 2px 4px;border-bottom:1px solid rgba(0,0,0,.12);box-sizing:content-box;min-width:64px;min-height:26px;cursor:text}.md2-tags-container::after,.md2-tags-container::before{display:table;content:' '}.md2-tags-container::after{clear:both}.focus .md2-tags-container{padding-bottom:3px;border-bottom:2px solid #106cc8}.md2-tags-disabled .md2-tags-container{color:rgba(0,0,0,.38);cursor:default}.md2-tags-disabled.focus .md2-tags-container{padding-bottom:4px;border-bottom:1px solid rgba(0,0,0,.38)}.md2-tag{position:relative;cursor:default;border-radius:16px;display:block;height:32px;line-height:32px;margin:4px 4px 0 0;padding:0 26px 0 12px;float:left;box-sizing:border-box;max-width:100%;background:#e0e0e0;color:#424242;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.md2-tag.active{background:#106cc8;color:rgba(255,255,255,.87)}.md2-tag.active svg{color:rgba(255,255,255,.87)}.md2-tag svg{position:absolute;top:4px;right:2px;cursor:pointer;display:inline-block;overflow:hidden;fill:currentColor;color:rgba(0,0,0,.54)}.md2-tag-add{position:relative;display:inline-block;margin-left:4px}input{border:0;outline:0;margin-top:6px;height:30px;line-height:30px;padding:0;color:rgba(0,0,0,.87);background:0 0}.md2-tags-placeholder{color:rgba(0,0,0,.38)}.md2-tags-menu{position:absolute;left:0;top:100%;display:block;z-index:10;flex-direction:column;width:100%;margin:6px 0 0;padding:8px 0;box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);max-height:256px;min-height:48px;overflow-y:auto;transform:scale(1);background:#fff;backface-visibility:hidden}.md2-tags-menu .md2-tag-option{cursor:pointer;position:relative;display:block;color:#212121;align-items:center;width:auto;transition:background 150ms linear;padding:12px 16px;line-height:24px;box-sizing:border-box;word-wrap:break-word}.md2-tags-menu .md2-tag-option.focused,.md2-tags-menu .md2-tag-option:hover{background:#eee}.md2-tags-menu .md2-tag-option .md2-tag-option-text{width:auto;font-size:16px}.highlight{color:#757575} /*# sourceMappingURL=tags.css.map */ "],
        host: {
            'role': 'tags',
            '[id]': 'id',
            '[class.focus]': '_inputFocused || _selectedTag >= 0',
            '[class.md2-tags-disabled]': 'disabled',
            '[tabindex]': 'disabled ? -1 : tabindex',
            '[attr.aria-disabled]': 'disabled'
        },
        providers: [MD2_TAGS_CONTROL_VALUE_ACCESSOR],
        encapsulation: ViewEncapsulation.None,
        exportAs: 'md2Tags'
    }),
    __metadata$42("design:paramtypes", [ElementRef])
], Md2Tags);

var __decorate$72 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Md2TagsModule = class Md2TagsModule {
};
Md2TagsModule = __decorate$72([
    NgModule({
        imports: [CommonModule, FormsModule, Md2AutocompleteModule],
        exports: [Md2Tags],
        declarations: [Md2Tags],
    })
], Md2TagsModule);

var __decorate$74 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$43 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class Toast {
    constructor(message) {
        this.message = message;
    }
}
class Md2ToastConfig {
    constructor() {
        this.duration = 3000;
        this.viewContainerRef = null;
    }
}
let Md2Toast = class Md2Toast {
    constructor(_overlay, _config) {
        this._overlay = _overlay;
        this._config = _config;
        this.index = 0;
    }
    /**
     * toast message
     * @param toast string or object with message and other properties of toast
     */
    toast(message, duration) {
        this.show(message, duration);
    }
    /**
     * show toast
     * @param toastObj string or object with message and other properties of toast
     */
    show(message, duration) {
        if (!message || !message.trim()) {
            return;
        }
        if (duration) {
            this._config.duration = duration;
        }
        let toast;
        toast = new Toast(message);
        if (toast) {
            if (!this._toastInstance) {
                this._createToast();
            }
            this._setToastMessage(toast);
        }
    }
    /** Create the toast to display */
    _createToast() {
        this._createOverlay();
        let portal = new ComponentPortal(Md2ToastComponent, this._config.viewContainerRef);
        this._toastInstance = this._overlayRef.attach(portal).instance;
    }
    /** Create the overlay config and position strategy */
    _createOverlay() {
        if (!this._overlayRef) {
            let config = new OverlayState();
            config.positionStrategy = this._overlay.position()
                .global()
                .top('0').right('0');
            this._overlayRef = this._overlay.create(config);
        }
    }
    /** Disposes the current toast and the overlay it is attached to */
    _disposeToast() {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._toastInstance = null;
    }
    /** Updates the toast message and repositions the overlay according to the new message length */
    _setToastMessage(toast) {
        toast.id = ++this.index;
        this._toastInstance.addToast(toast);
        setTimeout(() => {
            this.clearToast(toast.id);
        }, this._config.duration);
    }
    /**
     * clear specific toast
     * @param toastId
     */
    clearToast(toastId) {
        if (this._toastInstance) {
            this._toastInstance.removeToast(toastId);
            setTimeout(() => {
                if (!this._toastInstance.hasToast()) {
                    this._disposeToast();
                }
            }, 250);
        }
    }
    /**
     * clear all toasts
     */
    clearAllToasts() {
        if (this._toastInstance) {
            this._toastInstance.removeAllToasts();
            setTimeout(() => {
                if (!this._toastInstance.hasToast()) {
                    this._disposeToast();
                }
            }, 250);
        }
    }
};
Md2Toast = __decorate$74([
    Injectable(),
    __metadata$43("design:paramtypes", [Overlay, Md2ToastConfig])
], Md2Toast);
let Md2ToastComponent = class Md2ToastComponent {
    constructor() {
        this.toasts = [];
        this.maxShown = 5;
    }
    /**
     * add toast
     * @param toast toast object with all parameters
     */
    addToast(toast) {
        setTimeout(() => {
            toast.isVisible = true;
        }, 1);
        this.toasts.push(toast);
        if (this.toasts.length > this.maxShown) {
            this.toasts[0].isVisible = false;
            setTimeout(() => {
                this.toasts.splice(0, (this.toasts.length - this.maxShown));
            }, 250);
        }
    }
    /**
     * remove toast
     * @param toastId number of toast id
     */
    removeToast(toastId) {
        this.toasts.forEach((t) => { if (t.id === toastId) {
            t.isVisible = false;
        } });
        setTimeout(() => {
            this.toasts = this.toasts.filter((toast) => { return toast.id !== toastId; });
        }, 250);
    }
    /**
     * remove all toasts
     * @param toastId number of toast id
     */
    removeAllToasts() {
        this.toasts.forEach((t) => { t.isVisible = false; });
        setTimeout(() => {
            this.toasts = [];
        }, 250);
    }
    /**
     * check has any toast
     * @return boolean
     */
    hasToast() { return this.toasts.length > 0; }
};
Md2ToastComponent = __decorate$74([
    Component({
        selector: 'md2-toast',
        template: "<div *ngFor=\"let toast of toasts\" class=\"md2-toast\" [class.in]=\"toast.isVisible\" (click)=\"removeToast(toast.id)\">{{ toast.message }}</div>",
        styles: ["md2-toast{display:block;box-sizing:border-box;cursor:default;overflow:hidden;min-width:304px;max-width:100%;padding:8px;user-select:none}.md2-toast{position:relative;padding:14px 24px;margin-bottom:5px;display:block;margin-top:-53px;opacity:0;background-color:#323232;color:#fafafa;box-shadow:0 2px 5px 0 rgba(0,0,0,.26);border-radius:2px;font-size:14px;overflow:hidden;word-wrap:break-word;transition:all 250ms linear}.md2-toast.in{margin-top:0;opacity:1}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;text-transform:none;width:1px}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000} /*# sourceMappingURL=toast.css.map */ "],
        encapsulation: ViewEncapsulation.None,
    })
], Md2ToastComponent);
const MD2_TOAST_DIRECTIVES = [Md2ToastComponent];
let Md2ToastModule = class Md2ToastModule {
};
Md2ToastModule = __decorate$74([
    NgModule({
        imports: [CommonModule],
        exports: MD2_TOAST_DIRECTIVES,
        declarations: MD2_TOAST_DIRECTIVES,
        entryComponents: MD2_TOAST_DIRECTIVES,
        providers: [Md2Toast, Md2ToastConfig, OVERLAY_PROVIDERS]
    })
], Md2ToastModule);

//# sourceMappingURL=index.js.map

var __decorate$76 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$44 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$17 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/** Time in ms to delay before changing the tooltip visibility to hidden */
const TOUCHEND_HIDE_DELAY = 1500;
/** Time in ms to throttle repositioning after scroll events. */
const SCROLL_THROTTLE_MS = 20;
/** Throws an error if the user supplied an invalid tooltip position. */
function throwMd2TooltipInvalidPositionError(position) {
    throw new Error(`Tooltip position "${position}" is invalid.`);
}
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.google.com/components/tooltips.html
 */
let Md2Tooltip = class Md2Tooltip {
    constructor(_overlay, _elementRef, _scrollDispatcher, _viewContainerRef, _ngZone, _renderer, _platform, _dir) {
        this._overlay = _overlay;
        this._elementRef = _elementRef;
        this._scrollDispatcher = _scrollDispatcher;
        this._viewContainerRef = _viewContainerRef;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._platform = _platform;
        this._dir = _dir;
        this._position = 'below';
        this._disabled = false;
        /** The default delay in ms before showing the tooltip after show is called */
        this.showDelay = 0;
        /** The default delay in ms before hiding the tooltip after hide is called */
        this.hideDelay = 0;
        // The mouse events shouldn't be bound on iOS devices, because
        // they can prevent the first tap from firing its click event.
        if (!_platform.IOS) {
            _renderer.listen(_elementRef.nativeElement, 'mouseenter', () => this.show());
            _renderer.listen(_elementRef.nativeElement, 'mouseleave', () => this.hide());
        }
    }
    /** Allows the user to define the position of the tooltip relative to the parent element */
    get position() { return this._position; }
    set position(value) {
        if (value !== this._position) {
            this._position = value;
            // TODO(andrewjs): When the overlay's position can be dynamically changed, do not destroy
            // the tooltip.
            if (this._tooltipInstance) {
                this._disposeTooltip();
            }
        }
    }
    /** Disables the display of the tooltip. */
    get disabled() { return this._disabled; }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        // If tooltip is disabled, hide immediately.
        if (this._disabled) {
            this.hide(0);
        }
    }
    /** The message to be displayed in the tooltip */
    get message() { return this._message; }
    set message(value) {
        this._message = value;
        if (this._tooltipInstance) {
            this._setTooltipMessage(this._message);
        }
    }
    /**
     * Dispose the tooltip when destroyed.
     */
    ngOnDestroy() {
        if (this._tooltipInstance) {
            this._disposeTooltip();
        }
    }
    /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input */
    show(delay = this.showDelay) {
        if (this.disabled || !this._message || !this._message.trim()) {
            return;
        }
        if (!this._tooltipInstance) {
            this._createTooltip();
        }
        this._setTooltipMessage(this._message);
        this._tooltipInstance.show(this._position, delay);
    }
    /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input */
    hide(delay = this.hideDelay) {
        if (this._tooltipInstance) {
            this._tooltipInstance.hide(delay);
        }
    }
    /** Shows/hides the tooltip */
    toggle() {
        this._isTooltipVisible() ? this.hide() : this.show();
    }
    /** Returns true if the tooltip is currently visible to the user */
    _isTooltipVisible() {
        return !!this._tooltipInstance && this._tooltipInstance.isVisible();
    }
    /** Create the tooltip to display */
    _createTooltip() {
        this._createOverlay();
        let portal = new ComponentPortal(Md2TooltipComponent, this._viewContainerRef);
        this._tooltipInstance = this._overlayRef.attach(portal).instance;
        // Dispose the overlay when finished the shown tooltip.
        this._tooltipInstance.afterHidden().subscribe(() => {
            // Check first if the tooltip has already been removed through this components destroy.
            if (this._tooltipInstance) {
                this._disposeTooltip();
            }
        });
    }
    /** Create the overlay config and position strategy */
    _createOverlay() {
        let origin = this._getOrigin();
        let position = this._getOverlayPosition();
        // Create connected position strategy that listens for scroll events to reposition.
        // After position changes occur and the overlay is clipped by a parent scrollable then
        // close the tooltip.
        let strategy = this._overlay.position().connectedTo(this._elementRef, origin, position);
        strategy.withScrollableContainers(this._scrollDispatcher.getScrollContainers(this._elementRef));
        strategy.onPositionChange.subscribe(change => {
            if (change.scrollableViewProperties.isOverlayClipped &&
                this._tooltipInstance && this._tooltipInstance.isVisible()) {
                this.hide(0);
            }
        });
        let config = new OverlayState();
        config.direction = this._dir ? this._dir.value : 'ltr';
        config.positionStrategy = strategy;
        config.scrollStrategy =
            new RepositionScrollStrategy(this._scrollDispatcher, SCROLL_THROTTLE_MS);
        this._overlayRef = this._overlay.create(config);
    }
    /** Disposes the current tooltip and the overlay it is attached to */
    _disposeTooltip() {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._tooltipInstance = null;
    }
    /** Returns the origin position based on the user's position preference */
    _getOrigin() {
        if (this.position == 'above' || this.position == 'below') {
            return { originX: 'center', originY: this.position == 'above' ? 'top' : 'bottom' };
        }
        const isDirectionLtr = !this._dir || this._dir.value == 'ltr';
        if (this.position == 'left' ||
            this.position == 'before' && isDirectionLtr ||
            this.position == 'after' && !isDirectionLtr) {
            return { originX: 'start', originY: 'center' };
        }
        if (this.position == 'right' ||
            this.position == 'after' && isDirectionLtr ||
            this.position == 'before' && !isDirectionLtr) {
            return { originX: 'end', originY: 'center' };
        }
        throwMd2TooltipInvalidPositionError(this.position);
    }
    /** Returns the overlay position based on the user's preference */
    _getOverlayPosition() {
        if (this.position == 'above') {
            return { overlayX: 'center', overlayY: 'bottom' };
        }
        if (this.position == 'below') {
            return { overlayX: 'center', overlayY: 'top' };
        }
        const isLtr = !this._dir || this._dir.value == 'ltr';
        if (this.position == 'left' ||
            this.position == 'before' && isLtr ||
            this.position == 'after' && !isLtr) {
            return { overlayX: 'end', overlayY: 'center' };
        }
        if (this.position == 'right' ||
            this.position == 'after' && isLtr ||
            this.position == 'before' && !isLtr) {
            return { overlayX: 'start', overlayY: 'center' };
        }
        throwMd2TooltipInvalidPositionError(this.position);
    }
    /** Updates the tooltip message and repositions the overlay according to the new message length */
    _setTooltipMessage(message) {
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        this._tooltipInstance.message = message;
        this._tooltipInstance._markForCheck();
        this._ngZone.onMicrotaskEmpty.first().subscribe(() => {
            if (this._tooltipInstance) {
                this._overlayRef.updatePosition();
            }
        });
    }
};
__decorate$76([
    Input('tooltip-position'),
    __metadata$44("design:type", String),
    __metadata$44("design:paramtypes", [String])
], Md2Tooltip.prototype, "position", null);
__decorate$76([
    Input('tooltipDisabled'),
    __metadata$44("design:type", Boolean),
    __metadata$44("design:paramtypes", [Object])
], Md2Tooltip.prototype, "disabled", null);
__decorate$76([
    Input('tooltip-delay'),
    __metadata$44("design:type", Object)
], Md2Tooltip.prototype, "showDelay", void 0);
__decorate$76([
    Input('tooltip-hide-delay'),
    __metadata$44("design:type", Object)
], Md2Tooltip.prototype, "hideDelay", void 0);
__decorate$76([
    Input('tooltip'),
    __metadata$44("design:type", Object),
    __metadata$44("design:paramtypes", [String])
], Md2Tooltip.prototype, "message", null);
Md2Tooltip = __decorate$76([
    Directive({
        selector: '[tooltip]',
        host: {
            '(longpress)': 'show()',
            '(touchend)': 'hide(' + TOUCHEND_HIDE_DELAY + ')',
        },
        exportAs: 'md2Tooltip',
    }),
    __param$17(7, Optional()),
    __metadata$44("design:paramtypes", [Overlay,
        ElementRef,
        ScrollDispatcher,
        ViewContainerRef,
        NgZone,
        Renderer2,
        Platform,
        Dir])
], Md2Tooltip);
/**
 * Internal component that wraps the tooltip's content.
 * @docs-private
 */
let Md2TooltipComponent = class Md2TooltipComponent {
    constructor(_dir, _changeDetectorRef) {
        this._dir = _dir;
        this._changeDetectorRef = _changeDetectorRef;
        /** Property watched by the animation framework to show or hide the tooltip */
        this._visibility = 'initial';
        /** Whether interactions on the page should close the tooltip */
        this._closeOnInteraction = false;
        /** The transform origin used in the animation for showing and hiding the tooltip */
        this._transformOrigin = 'bottom';
        /** Subject for notifying that the tooltip has been hidden from the view */
        this._onHide = new Subject();
    }
    /**
     * Shows the tooltip with an animation originating from the provided origin
     * @param position Position of the tooltip.
     * @param delay Amount of milliseconds to the delay showing the tooltip.
     */
    show(position, delay) {
        // Cancel the delayed hide if it is scheduled
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
        // Body interactions should cancel the tooltip if there is a delay in showing.
        this._closeOnInteraction = true;
        this._setTransformOrigin(position);
        this._showTimeoutId = setTimeout(() => {
            this._visibility = 'visible';
            // If this was set to true immediately, then a body click that triggers show() would
            // trigger interaction and close the tooltip right after it was displayed.
            this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this._markForCheck();
            setTimeout(() => this._closeOnInteraction = true, 0);
        }, delay);
    }
    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param delay Amount of milliseconds to delay showing the tooltip.
     */
    hide(delay) {
        // Cancel the delayed show if it is scheduled
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
        }
        this._hideTimeoutId = setTimeout(() => {
            this._visibility = 'hidden';
            this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this._markForCheck();
        }, delay);
    }
    /**
     * Returns an observable that notifies when the tooltip has been hidden from view
     */
    afterHidden() {
        return this._onHide.asObservable();
    }
    /**
     * Whether the tooltip is being displayed
     */
    isVisible() {
        return this._visibility === 'visible';
    }
    /** Sets the tooltip transform origin according to the tooltip position */
    _setTransformOrigin(value) {
        const isLtr = !this._dir || this._dir.value == 'ltr';
        switch (value) {
            case 'before':
                this._transformOrigin = isLtr ? 'right' : 'left';
                break;
            case 'after':
                this._transformOrigin = isLtr ? 'left' : 'right';
                break;
            case 'left':
                this._transformOrigin = 'right';
                break;
            case 'right':
                this._transformOrigin = 'left';
                break;
            case 'above':
                this._transformOrigin = 'bottom';
                break;
            case 'below':
                this._transformOrigin = 'top';
                break;
            default: throwMd2TooltipInvalidPositionError(value);
        }
    }
    _afterVisibilityAnimation(e) {
        if (e.toState === 'hidden' && !this.isVisible()) {
            this._onHide.next();
        }
    }
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.google.com/components/tooltips.html#tooltips-interaction
     */
    _handleBodyInteraction() {
        if (this._closeOnInteraction) {
            this.hide(0);
        }
    }
    /**
     * Marks that the tooltip needs to be checked in the next change detection run.
     * Mainly used for rendering the initial text before positioning a tooltip, which
     * can be problematic in components with OnPush change detection.
     */
    _markForCheck() {
        this._changeDetectorRef.markForCheck();
    }
};
Md2TooltipComponent = __decorate$76([
    Component({selector: 'md2-tooltip',
        template: "<div class=\"md2-tooltip\" [style.transform-origin]=\"_transformOrigin\" [@state]=\"_visibility\" (@state.done)=\"_afterVisibilityAnimation($event)\" [innerHTML]=\"message\"></div>",
        styles: [":host{pointer-events:none}.md2-tooltip{color:#fff;padding:6px 8px;border-radius:2px;font-size:10px;margin:14px;max-width:250px;background:rgba(97,97,97,.9);word-wrap:break-word}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000} /*# sourceMappingURL=tooltip.css.map */ "],
        animations: [
            trigger('state', [
                state('void', style({ transform: 'scale(0)' })),
                state('initial', style({ transform: 'scale(0)' })),
                state('visible', style({ transform: 'scale(1)' })),
                state('hidden', style({ transform: 'scale(0)' })),
                transition('* => visible', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
                transition('* => hidden', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
            ])
        ],
        host: {
            '(body:click)': 'this._handleBodyInteraction()'
        }
    }),
    __param$17(0, Optional()),
    __metadata$44("design:paramtypes", [Dir, ChangeDetectorRef])
], Md2TooltipComponent);

var __decorate$75 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Md2TooltipModule = class Md2TooltipModule {
};
Md2TooltipModule = __decorate$75([
    NgModule({
        imports: [OverlayModule, MdCommonModule, PlatformModule],
        exports: [Md2Tooltip, Md2TooltipComponent, MdCommonModule],
        declarations: [Md2Tooltip, Md2TooltipComponent],
        entryComponents: [Md2TooltipComponent],
    })
], Md2TooltipModule);

var __decorate$35 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const MD2_MODULES = [
    Md2AccordionModule,
    Md2AutocompleteModule,
    Md2ChipsModule,
    Md2CollapseModule,
    Md2ColorpickerModule,
    Md2DataTableModule,
    Md2DatepickerModule,
    Md2DialogModule,
    Md2MenuModule,
    MdRippleModule,
    Md2SelectModule,
    Md2TabsModule,
    Md2TagsModule,
    Md2ToastModule,
    Md2TooltipModule,
    OverlayModule,
    PortalModule,
    RtlModule,
    StyleModule,
    A11yModule,
    PlatformModule,
    CompatibilityModule,
    MdNativeDateModule,
];
let Md2Module = class Md2Module {
};
Md2Module = __decorate$35([
    NgModule({
        imports: MD2_MODULES,
        exports: MD2_MODULES,
    })
], Md2Module);

//# sourceMappingURL=index.js.map

export { MdCoreModule, Dir, RtlModule, ObserveContentModule, ObserveContent, Portal, BasePortalHost, ComponentPortal, TemplatePortal, PortalHostDirective, TemplatePortalDirective, PortalModule, DomPortalHost, GestureConfig, LiveAnnouncer, LIVE_ANNOUNCER_ELEMENT_TOKEN, LIVE_ANNOUNCER_PROVIDER, InteractivityChecker, isFakeMousedownFromScreenReader, A11yModule, UniqueSelectionDispatcher, UNIQUE_SELECTION_DISPATCHER_PROVIDER, MdLineModule, MdLine, MdLineSetter, coerceBooleanProperty, coerceNumberProperty, CompatibilityModule, NoConflictStyleCompatibilityMode, MdCommonModule, MdOptionModule, MdOptionSelectionChange, MdOption, MdOptgroupBase, _MdOptgroupMixinBase, MdOptgroup, PlatformModule, Platform, getSupportedInputTypes, Overlay, OVERLAY_PROVIDERS, OverlayContainer, FullscreenOverlayContainer, OverlayRef, OverlayState, ConnectedOverlayDirective, OverlayOrigin, OverlayModule, ViewportRuler, GlobalPositionStrategy, ConnectedPositionStrategy, ConnectionPositionPair, ScrollableViewProperties, ConnectedOverlayPositionChange, ScrollDispatchModule, Scrollable, ScrollDispatcher, RepositionScrollStrategy, CloseScrollStrategy, NoopScrollStrategy, BlockScrollStrategy, MdRippleModule, MdRipple, MD_RIPPLE_GLOBAL_OPTIONS, RippleRef, RippleState, RIPPLE_FADE_IN_DURATION, RIPPLE_FADE_OUT_DURATION, SelectionModel, SelectionChange, FocusTrap, FocusTrapFactory, FocusTrapDeprecatedDirective, FocusTrapDirective, StyleModule, TOUCH_BUFFER_MS, FocusOriginMonitor, CdkMonitorFocus, FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY, FOCUS_ORIGIN_MONITOR_PROVIDER, applyCssTransform, UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW, PAGE_UP, PAGE_DOWN, HOME, END, ENTER, SPACE, TAB, ESCAPE, BACKSPACE, DELETE, COMMA, MATERIAL_COMPATIBILITY_MODE, MATERIAL_SANITY_CHECKS, getMdCompatibilityInvalidPrefixError, MAT_ELEMENTS_SELECTOR, MD_ELEMENTS_SELECTOR, MatPrefixRejector, MdPrefixRejector, AnimationCurves, AnimationDurations, MdSelectionModule, MdPseudoCheckbox, NativeDateModule, MdNativeDateModule, DateAdapter, MD_DATE_FORMATS, NativeDateAdapter, MD_NATIVE_DATE_FORMATS, Md2Module, Md2AccordionModule, Md2Accordion, Md2AccordionHeader, Md2AccordionTab, Md2AutocompleteModule, Item, MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR, Md2AutocompleteChange, Md2Autocomplete, HighlightPipe, Chip, MD2_CHIPS_CONTROL_VALUE_ACCESSOR, Md2ChipsChange, Md2Chips, MD2_CHIPS_DIRECTIVES, Md2ChipsModule, Md2CollapseModule, Md2Collapse, TextDirective, ColorpickerSliderDirective, Md2ColorChange, Md2Colorpicker, Hsva, Hsla, Rgba, SliderPosition, SliderDimension, MD2_COLORPICKER_DIRECTIVES, Md2ColorpickerModule, Md2PaginationChange, Md2DataTable, Md2DataTableSortBy, Md2Pagination, MD2_DATA_TABLE_DIRECTIVES, Md2DataTableModule, Md2DatepickerModule, Md2DateChange, Md2Datepicker, Md2DatepickerContent, Md2Datepicker2, Md2MonthView, Md2YearView, Md2CalendarCell, Md2CalendarBody, CLOCK_RADIUS, CLOCK_INNER_RADIUS, CLOCK_OUTER_RADIUS, CLOCK_TICK_RADIUS, Md2Clock, DateUtil, DateLocale, Md2DialogModule, Md2DialogConfig, Md2DialogPortal, Md2DialogTitle, Md2DialogContent, Md2DialogActions, Md2Dialog, Md2Menu, Md2MenuModule, Md2MenuContent, Md2MenuItem, Md2MenuTrigger, Md2SelectModule, fadeInContent, transformPanel, transformPlaceholder, SELECT_ITEM_HEIGHT, SELECT_PANEL_MAX_HEIGHT, SELECT_MAX_OPTIONS_DISPLAYED, SELECT_TRIGGER_HEIGHT, SELECT_ITEM_HEIGHT_ADJUSTMENT, SELECT_PANEL_PADDING_X, SELECT_PANEL_INDENT_PADDING_X, SELECT_MULTIPLE_PANEL_PADDING_X, SELECT_PANEL_PADDING_Y, SELECT_PANEL_VIEWPORT_PADDING, Md2SelectChange, Md2Select, Md2SelectHeader, Md2OptionSelectionChange, Md2Option, Md2OptionModule, Md2OptgroupBase, _Md2OptgroupMixinBase, Md2Optgroup, Md2TabChange, Md2Transclude, Md2Tab, Md2TabLabel, Md2Tabs, MD2_TABS_DIRECTIVES, Md2TabsModule, Md2TagsModule, Tag, MD2_TAGS_CONTROL_VALUE_ACCESSOR, Md2Tags, Toast, Md2ToastConfig, Md2Toast, Md2ToastComponent, MD2_TOAST_DIRECTIVES, Md2ToastModule, Md2TooltipModule, TOUCHEND_HIDE_DELAY, SCROLL_THROTTLE_MS, throwMd2TooltipInvalidPositionError, Md2Tooltip, Md2TooltipComponent };
