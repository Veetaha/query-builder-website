import * as I from '@app/interfaces';

export abstract class AssignConstructable<TDerived extends I.Obj> {
    constructor(data: I.CoreObjData<TDerived>) {
        Object.assign(this, data);
    }
}