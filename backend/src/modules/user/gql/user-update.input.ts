import { InputType } from 'type-graphql';

import * as I from '@app/interfaces';
import { Nullable          } from '@utils/gql/opts';
import { User              } from '@modules/user/user.entity';
import { ValidateIfPresent } from '@utils/validation/validate-if-present.decorator';
import { StringField       } from '@utils/gql/decorators/explicit-type-field.decorator';
import { ValidateAs } from '@utils/validation/validations.decorator';


@InputType()
export class UserUpdateInput implements I.NullableProps<User> {
    @ValidateAs(User, 'name')
    @ValidateIfPresent
    @StringField(Nullable)
    name?: I.Nullable<string>;

    @ValidateAs(User, 'avatarUrl')
    @ValidateIfPresent
    @StringField(Nullable)
    avatarUrl?: I.Nullable<string>;
}
