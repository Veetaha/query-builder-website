import * as I from '@app/interfaces';
import { ActionClass } from './action.interface';

/**
 * Higher order function to define an action class with the given `TPaload` type
 * and `type` name.
 * 
 * @param TPayload Type of the properties of the instances of the defined action class.
 * 
 * @param type Type name use `static readonly type` property of the defined class.
 */
export function createAction<TPayload extends I.Obj = {}>(type: string) {
    return class {
        static readonly type = type;
        constructor(payload: TPayload) {
            Object.assign(this, payload);
        }
    } as ActionClass<TPayload>;
}