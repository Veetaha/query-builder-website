import { ObjectType } from 'type-graphql';

import { Page } from '@utils/gql/pagination/page.object';

import { Rating } from '../rating.entity';

@ObjectType()
export class RatingPage extends Page(Rating) {}