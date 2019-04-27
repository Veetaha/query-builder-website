import { InputType, Field } from 'type-graphql';

import * as I from '@app/interfaces';
import { Nullable     } from '@utils/gql/opts';
import { IFilterInput } from '@utils/gql/filtering/inputs/filter-input.interface';
import { StringFilterInputField, StringFilterInput } from '@utils/gql/filtering/inputs/string.input';
import { DateFilterInputField,   DateFilterInput   } from '@utils/gql/filtering/inputs/date.input';
import { User                } from '../user.entity';
import { UserRoleFilterInput } from './user-role-filter.input';


@InputType()
export class UserFilterInput implements IFilterInput<User> {
    @StringFilterInputField(Nullable) avatarUrl?:      I.Nullable<StringFilterInput>;
    @DateFilterInputField  (Nullable) creationDate?:   I.Nullable<DateFilterInput>;
    @DateFilterInputField  (Nullable) lastUpdateDate?: I.Nullable<DateFilterInput>; 
    @StringFilterInputField(Nullable) login?:          I.Nullable<StringFilterInput>;
    @StringFilterInputField(Nullable) name?:           I.Nullable<StringFilterInput>;
    @Field(() => UserRoleFilterInput, Nullable) role?: I.Nullable<UserRoleFilterInput>;
}