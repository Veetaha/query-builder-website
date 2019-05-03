import { InputType } from 'type-graphql';

import * as I from '@app/interfaces';
import { ISortInput     } from '@utils/gql/sorting/sort-input.interface';
import { SortInputField } from '@utils/gql/sorting/sort-input-field.decorator';
import { NullableOpt    } from '@utils/gql/opts';
import { SortInput      } from '@utils/gql/sorting/sort.input';

import { Rating } from '../rating.entity';


@InputType()
export class RatingSortInput implements ISortInput<Rating> {
    @SortInputField(NullableOpt) proposalId?: I.Nullable<SortInput>;
    @SortInputField(NullableOpt) raterLogin?: I.Nullable<SortInput>;
    @SortInputField(NullableOpt) liked?:      I.Nullable<SortInput>;
}