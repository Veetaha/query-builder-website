import { ObjectType, Field } from 'type-graphql';
 
import { User } from '@modules/user';
import { StringField         } from '@utils/gql/decorators/explicit-type-field.decorator';
import { AssignConstructable } from '@utils/objects/assign-constructable';


@ObjectType()
export class UserAndToken extends AssignConstructable<UserAndToken> {
    @Field()
    user!: User;

    @StringField()
    jwt!: string;
}