import { Md2Datepicker2 } from './datepicker2';
import { Md2DatepickerIntl } from './datepicker-intl';
export declare class Md2DatepickerToggle<D> {
    _intl: Md2DatepickerIntl;
    /** Datepicker instance that the button will toggle. */
    datepicker: Md2Datepicker2<D>;
    constructor(_intl: Md2DatepickerIntl);
    _open(event: Event): void;
}
