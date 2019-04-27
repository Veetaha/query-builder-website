import { InputType } from 'type-graphql';

import * as I from '@app/interfaces';
import { ISortInput     } from '@utils/gql/sorting/sort-input.interface';
import { SortInputField } from '@utils/gql/sorting/sort-input-field.decorator';
import { Nullable       } from '@utils/gql/opts';
import { SortInput      } from '@utils/gql/sorting/sort.input';
import { Like           } from '../like.entity';


@InputType()
export class LikeSortInput implements ISortInput<Like> {
    @SortInputField(Nullable) proposalId?: I.Nullable<SortInput>;
    @SortInputField(Nullable) raterLogin?: I.Nullable<SortInput>;
    @SortInputField(Nullable) liked?:      I.Nullable<SortInput>;
}