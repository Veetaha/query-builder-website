import { InputType } from 'type-graphql';

import { EnumFilterInput } from '@utils/gql/filtering';
import { UserRole } from '../user-role.enum';

@InputType()
export class UserRoleFilterInput extends EnumFilterInput(UserRole, 'UserRole') {}