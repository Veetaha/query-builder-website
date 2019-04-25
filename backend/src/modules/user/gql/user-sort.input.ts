import { InputType } from 'type-graphql';

import * as I from '@app/interfaces';
import { Nullable } from '@utils/gql/opts';
import { User } from '../user.entity';
import { ISortInput, SortInput, SortInputField } from '@utils/gql/sorting';


@InputType()
export class UserSortInput implements ISortInput<User> {
    @SortInputField(Nullable) avatarUrl?:      I.Nullable<SortInput>;
    @SortInputField(Nullable) login?:          I.Nullable<SortInput>;
    @SortInputField(Nullable) name?:           I.Nullable<SortInput>;
    @SortInputField(Nullable) creationDate?:   I.Nullable<SortInput>;
    @SortInputField(Nullable) lastUpdateDate?: I.Nullable<SortInput>;
    @SortInputField(Nullable) role?:           I.Nullable<SortInput>;
}