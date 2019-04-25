import { InputType } from 'type-graphql';

import { PaginationInput } from '@utils/gql/pagination/pagination.input';
import { UserFilterInput } from './user-filter.input';
import { UserSortInput } from './user-sort.input';
import { User } from '../user.entity';

@InputType()
export class UserPaginationInput extends PaginationInput({ 
    filter: UserFilterInput,
    sort:   UserSortInput,
    entity: User 
}) {}