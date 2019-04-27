import { InputType } from 'type-graphql';

import { PaginationInput } from '@utils/gql/pagination/pagination.input';
import { Like            } from '../like.entity';
import { LikeFilterInput } from './like-filter.input';
import { LikeSortInput   } from './like-sort.input';

@InputType()
export class LikePaginationInput extends PaginationInput({
    entity: Like,
    filter: LikeFilterInput,
    sort:   LikeSortInput
}) {}