import * as I from '@app/interfaces';
import { SortInput } from './sort.input';

/**
 * Defines an interface that you should implement when defining `*SortInput` 
 * classes. Thus you will get better type checking.
 * 
 * @param TTargetObj Target type to define `*SortInput` class for.
 */
export type ISortInput<TTargetObj extends I.Obj = I.Obj> = Partial<
    I.MapValues<TTargetObj, I.Nullable<SortInput>>
>;