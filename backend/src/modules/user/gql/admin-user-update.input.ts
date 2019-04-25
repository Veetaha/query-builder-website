import { InputType, Field } from 'type-graphql';

import * as I from '@app/interfaces';
import { Nullable        } from '@utils/gql/opts';
import { ValidateAs      } from '@utils/validation/validations.decorator';
import { StringField     } from '@utils/gql/decorators/explicit-type-field.decorator';
import { UserRole        } from '../user-role.enum';
import { UserUpdateInput } from './user-update.input';
import { User            } from '../user.entity';




@InputType()
export class AdminUserUpdateInput extends UserUpdateInput {
    @ValidateAs(User, 'login')
    @StringField({ description: 'Defines the login of the user to update' })
    login!: string;

    @Field(_type => UserRole, Nullable)
    role?: I.Nullable<UserRole>;
}