import * as I from '@app/interfaces';

export interface ActionClass<TPayload extends I.Obj> {
    readonly type: string;
    new (payload: TPayload): TPayload;
}