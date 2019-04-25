import { InputType, Field } from 'type-graphql';

import * as I from '@app/interfaces';
import { Nullable                    } from '@utils/gql/opts';
import { StringField, StringArrField } from '@utils/gql/decorators/explicit-type-field.decorator';
import { AbstractFilterInput         } from './abstract-filter.input';



const NullableStringField      = StringField(Nullable);
const NullableStringArrayField = StringArrField(Nullable);

@InputType({ 
    description: 'Filter input parameters for `String` type' 
})
export class StringFilterInput extends AbstractFilterInput {
    @NullableStringField      eq?:    I.Nullable<string>;
    @NullableStringField      neq?:   I.Nullable<string>;
    @NullableStringField      like?:  I.Nullable<string>;
    @NullableStringField      nlike?: I.Nullable<string>;
    @NullableStringArrayField in?:    I.Nullable<string[]>;
    @NullableStringArrayField nin?:   I.Nullable<string[]>;
}

const stringFilterInputTypeFn = () => StringFilterInput;

export const StringFilterInputField: I.GqlFieldDecorFactory<StringFilterInput> = (
    opts => Field(stringFilterInputTypeFn, opts)
);
