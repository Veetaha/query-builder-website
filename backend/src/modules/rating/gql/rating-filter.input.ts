import { InputType } from 'type-graphql';

import * as I from '@app/interfaces';
import { IFilterInput } from '@utils/gql/filtering/inputs/filter-input.interface';
import { NullableOpt  } from '@utils/gql/opts';
import { IntFilterInputField,     IntFilterInput     } from '@utils/gql/filtering/inputs/int.input';
import { StringFilterInputField,  StringFilterInput  } from '@utils/gql/filtering/inputs/string.input';
import { BooleanFilterInputField, BooleanFilterInput } from '@utils/gql/filtering/inputs/boolean.input';

import { Rating } from '../rating.entity';

@InputType()
export class RatingFilterInput implements IFilterInput<Rating> {
    @IntFilterInputField(NullableOpt)     proposalId?: I.Nullable<IntFilterInput>;
    @StringFilterInputField(NullableOpt)  raterLogin?: I.Nullable<StringFilterInput>;
    @BooleanFilterInputField(NullableOpt) liked?:      I.Nullable<BooleanFilterInput>;
}