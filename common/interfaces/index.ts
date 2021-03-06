import { 
    Obj, Op, FilterProps, Func, Tag, ClassDecorator, PropertyDecorator, 
    AccessorDecorator, MethodDecorator, ParameterDecorator
} from 'ts-typedefs';
export * from 'ts-typedefs';
import { Observable } from 'rxjs';

export * from './jwt-payload.interface';

export type CoreObjData<TObj extends Obj> = FilterProps<
    TObj,
    Op.NotExtends<Func<any, any, TObj>>
>;
export type Decorator = (
    | ClassDecorator 
    | PropertyDecorator 
    | AccessorDecorator 
    | MethodDecorator
    | ParameterDecorator
);

// TODO move it to 'ts-typedefs'
export type StrKeyOf<TObj extends Obj> = Extract<keyof TObj, string>;

// number within range [0-65635]
export type port_t = Tag<number, 'port_t'>;
export type int    = Tag<number, 'int'>;

export type UnpackObservable<TObservable extends Observable<any>> = (
    TObservable extends Observable<infer TValue> ? TValue : never
);