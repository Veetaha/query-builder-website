import { InputType } from 'type-graphql';

import * as I from '@app/interfaces';
import { Nullable       } from '@utils/gql/opts';
import { SortInput      } from '@utils/gql/sorting/sort.input';
import { ISortInput     } from '@utils/gql/sorting/sort-input.interface';
import { SortInputField } from '@utils/gql/sorting/sort-input-field.decorator';
import { User } from '../user.entity';



@InputType()
export class UserSortInput implements ISortInput<User> {
    @SortInputField(Nullable) avatarUrl?:      I.Nullable<SortInput>;
    @SortInputField(Nullable) login?:          I.Nullable<SortInput>;
    @SortInputField(Nullable) name?:           I.Nullable<SortInput>;
    @SortInputField(Nullable) creationDate?:   I.Nullable<SortInput>;
    @SortInputField(Nullable) lastUpdateDate?: I.Nullable<SortInput>;
    @SortInputField(Nullable) role?:           I.Nullable<SortInput>;
}