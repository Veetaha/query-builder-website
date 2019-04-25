import { InputType, Field } from 'type-graphql';

import * as I from '@app/interfaces';
import { Nullable } from '@utils/gql/opts';
import { User } from '../user.entity';
import { UserRoleFilterInput } from './user-role-filter.input';
import { 
    IFilterInput, 
    StringFilterInput, 
    StringFilterInputField, 
    DateFilterInput, 
    DateFilterInputField
} from '@utils/gql/filtering';

@InputType()
export class UserFilterInput implements IFilterInput<User> {
    @StringFilterInputField(Nullable) avatarUrl?:      I.Nullable<StringFilterInput>;
    @DateFilterInputField  (Nullable) creationDate?:   I.Nullable<DateFilterInput>;
    @DateFilterInputField  (Nullable) lastUpdateDate?: I.Nullable<DateFilterInput>; 
    @StringFilterInputField(Nullable) login?:          I.Nullable<StringFilterInput>;
    @StringFilterInputField(Nullable) name?:           I.Nullable<StringFilterInput>;
    @Field(() => UserRoleFilterInput, Nullable) role?: I.Nullable<UserRoleFilterInput>;
}