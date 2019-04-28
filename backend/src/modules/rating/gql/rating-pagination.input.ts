import { InputType } from 'type-graphql';

import { PaginationInput } from '@utils/gql/pagination/pagination.input';

import { Rating            } from '../rating.entity';
import { RatingFilterInput } from './rating-filter.input';
import { RatingSortInput   } from './rating-sort.input';

@InputType()
export class RatingPaginationInput extends PaginationInput({
    entity: Rating,
    filter: RatingFilterInput,
    sort:   RatingSortInput
}) {}