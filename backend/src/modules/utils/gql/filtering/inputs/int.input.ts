import { InputType, Field } from "type-graphql";

import * as I from '@app/interfaces';
import { NullableOpt              } from '@utils/gql/opts';
import { IntField, IntArrField } from '@utils/gql/decorators/explicit-type-field.decorator';
import { AbstractFilterInput   } from './abstract-filter.input';


const NullableIntField      = IntField(NullableOpt);
const NullableIntArrayField = IntArrField(NullableOpt);

/**
 * Filter input parameters for `Int` type.
 */
@InputType()
export class IntFilterInput extends AbstractFilterInput {
    @NullableIntField      eq!:  I.Nullable<number>;
    @NullableIntField      neq!: I.Nullable<number>;
    @NullableIntField      geq!: I.Nullable<number>;
    @NullableIntField      leq!: I.Nullable<number>;
    @NullableIntField      gt!:  I.Nullable<number>;
    @NullableIntField      lt!:  I.Nullable<number>;
    @NullableIntArrayField in!:  I.Nullable<number[]>;
    @NullableIntArrayField nin!: I.Nullable<number[]>;
}

const intFilterInputTypeFn = () => IntFilterInput;

export const IntFilterInputField: I.GqlFieldDecorFactory<IntFilterInput> = (
    opts => Field(intFilterInputTypeFn, opts)
);
