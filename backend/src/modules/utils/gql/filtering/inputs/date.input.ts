import { InputType, Field } from "type-graphql";

import * as I from '@app/interfaces';
import { NullableOpt             } from '@utils/gql/opts';
import { DateField, DateArrField } from '@utils/gql/decorators/explicit-type-field.decorator';
import { AbstractFilterInput     } from './abstract-filter.input';


const NullableDateField      = DateField(NullableOpt);
const NullableDateArrayField = DateArrField(NullableOpt);

@InputType({
    description: 'Filter input parameters for `Date` type.'
})
export class DateFilterInput extends AbstractFilterInput {
    @NullableDateField      eq!:  I.Nullable<Date>;
    @NullableDateField      neq!: I.Nullable<Date>;
    @NullableDateField      geq!: I.Nullable<Date>;
    @NullableDateField      leq!: I.Nullable<Date>;
    @NullableDateField      gt!:  I.Nullable<Date>;
    @NullableDateField      lt!:  I.Nullable<Date>;
    @NullableDateArrayField in!:  I.Nullable<Date[]>;
    @NullableDateArrayField nin!: I.Nullable<Date[]>;
}

const dateFilterInputTypeFn = () => DateFilterInput;

export const DateFilterInputField: I.GqlFieldDecorFactory<DateFilterInput> = (
    opts => Field(dateFilterInputTypeFn, opts)
);
