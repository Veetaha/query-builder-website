import { ObjectType } from 'type-graphql';

import { Page } from '@utils/gql/pagination/page.object';
import { Like } from '../like.entity';

@ObjectType()
export class LikePage extends Page(Like) {}