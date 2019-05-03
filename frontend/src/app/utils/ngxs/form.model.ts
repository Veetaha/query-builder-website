import { Obj } from '@app/interfaces';

export const enum NgxsFormValidityState {
    /**
     * This control has passed all validation checks.
     */
    Valid = 'VALID',
    /**
     * This control has failed at least one validation check.
     */
    Invalid = 'INVALID',
    /**
     * This control is in the midst of conducting a validation check.
     */
    Pending = 'PENDING',
    /**
     *  This control is exempt from validation checks.
     */
    Disabled = 'DISABLED'
}

export interface NgxsFormStateModel<TInputControlsModel extends Obj = Obj> {
    model:  TInputControlsModel;
    dirty:  boolean;
    status: NgxsFormValidityState;
    errors: {};
} 