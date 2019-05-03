import { InputType, Field } from "type-graphql";

import * as I from '@app/interfaces';
import { NullableOpt                  } from '@utils/gql/opts';
import { FloatField, FloatArrField } from '@utils/gql/decorators/explicit-type-field.decorator';
import { AbstractFilterInput       } from './abstract-filter.input';



const NullableFloatField      = FloatField(NullableOpt);
const NullableFloatArrayField = FloatArrField(NullableOpt);

/**
 * Filter input parameters for `Float` type.
 */
@InputType()
export class FloatFilterInput extends AbstractFilterInput {
    @NullableFloatField      eq?:  I.Nullable<number>;
    @NullableFloatField      neq?: I.Nullable<number>;
    @NullableFloatField      geq?: I.Nullable<number>;
    @NullableFloatField      leq?: I.Nullable<number>;
    @NullableFloatField      gt?:  I.Nullable<number>;
    @NullableFloatField      lt?:  I.Nullable<number>;
    @NullableFloatArrayField in?:  I.Nullable<number[]>;
    @NullableFloatArrayField nin?: I.Nullable<number[]>;
}

const floatFilterInputTypeFn = () => FloatFilterInput;


export const FloatFilterInputField: I.GqlFieldDecorFactory<FloatFilterInput> = (
    opts => Field(floatFilterInputTypeFn, opts)
);
