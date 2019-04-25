import * as I from '@app/interfaces';
import { BooleanFilterInput } from './boolean.input';
import { FloatFilterInput   } from './float.input';
import { IntFilterInput     } from './int.input';
import { StringFilterInput  } from './string.input';
import { EnumFilterInput    } from './enum.input';
import { DateFilterInput    } from './date.input';

type IFilterInputImpl<TTarget = any> = (
    TTarget extends number            ? 
    IntFilterInput | FloatFilterInput :

    TTarget extends string              ? 
    StringFilterInput | EnumFilterInput :

    TTarget extends boolean ? 
    BooleanFilterInput      :

    TTarget extends Date ?
    DateFilterInput      :

    never
);

/**
 * Defines an interface that you should implement when defining `*FilterInput` 
 * classes. Thus you will get better type checking.
 * 
 * @param TTargetObj Target type to define `*FilterInput` class for.
 */
export type IFilterInput<TTargetObj extends I.Obj<any> = I.Obj<any>> = {
    [TKey in keyof TTargetObj]?: I.Nullable<IFilterInputImpl<TTargetObj[TKey]>>;
};