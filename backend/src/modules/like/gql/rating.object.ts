import { ObjectType } from 'type-graphql';

import { AssignConstructable } from '@utils/objects/assign-constructable';
import { IntField } from '@utils/gql/decorators/explicit-type-field.decorator';

@ObjectType()
export class Rating extends AssignConstructable<Rating> {
    @IntField({ description: 'Total amount of likes.' })
    likes!: number;

    @IntField({ description: 'Total amount of dislikes.' })
    dislikes!: number;
}