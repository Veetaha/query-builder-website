import * as I from '@app/interfaces';

export abstract class AssignConstructable<TDerived extends AssignConstructable<any>> {
    constructor(data: I.CoreObjData<TDerived>) {
        Object.assign(this, data);
    }
}