import { InputType, Field } from "type-graphql";

import * as I from '@app/interfaces';
import { NullableOpt            } from '@utils/gql/opts';
import { BooleanField        } from '@utils/gql/decorators/explicit-type-field.decorator';
import { AbstractFilterInput } from './abstract-filter.input';




const NullableBooleanField = BooleanField(NullableOpt);

@InputType({
    description: 'Filter input parameters for `Boolean` type.'
})
export class BooleanFilterInput extends AbstractFilterInput<boolean> {
    @NullableBooleanField eq?:  I.Nullable<boolean>;
    @NullableBooleanField neq?: I.Nullable<boolean>;
}

const booleanFilterInputTypeFn = () => BooleanFilterInput;

export const BooleanFilterInputField: I.GqlFieldDecorFactory<BooleanFilterInput> = (
    opts => Field(booleanFilterInputTypeFn, opts)
);
