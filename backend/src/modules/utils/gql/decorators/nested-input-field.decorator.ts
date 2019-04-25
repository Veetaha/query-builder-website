import * as I from '@app/interfaces';
import { composeDecorators } from '@utils/meta';
import { Type } from 'class-transformer';
import { Field } from 'type-graphql';
import { ValidateNested } from 'class-validator';

export function NestedInputField
<TOpts extends I.GqlFieldOpts, TInputClass extends I.Class>
(typeFn: I.TypeFn<TInputClass>, opts?: TOpts): I.GqlFieldDecor<InstanceType<TInputClass>, TOpts> {
    return composeDecorators(
        Type(typeFn) as I.PropertyDecorator,
        ValidateNested() as I.PropertyDecorator,
        Field(typeFn, opts)
    );
}