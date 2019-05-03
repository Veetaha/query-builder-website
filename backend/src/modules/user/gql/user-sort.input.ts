import { InputType } from 'type-graphql';

import * as I from '@app/interfaces';
import { NullableOpt    } from '@utils/gql/opts';
import { SortInput      } from '@utils/gql/sorting/sort.input';
import { ISortInput     } from '@utils/gql/sorting/sort-input.interface';
import { SortInputField } from '@utils/gql/sorting/sort-input-field.decorator';
import { User } from '../user.entity';



@InputType()
export class UserSortInput implements ISortInput<User> {
    @SortInputField(NullableOpt) avatarUrl?:      I.Nullable<SortInput>;
    @SortInputField(NullableOpt) login?:          I.Nullable<SortInput>;
    @SortInputField(NullableOpt) name?:           I.Nullable<SortInput>;
    @SortInputField(NullableOpt) creationDate?:   I.Nullable<SortInput>;
    @SortInputField(NullableOpt) lastUpdateDate?: I.Nullable<SortInput>;
    @SortInputField(NullableOpt) role?:           I.Nullable<SortInput>;
}