import { InputType } from 'type-graphql';

import * as I from '@app/interfaces';
import { User } from '@modules/user';
import { StringField } from '@utils/gql/decorators/explicit-type-field.decorator';
import { StringLength } from '@utils/validation/string-length.decorator';
import { ValidateAs } from '@utils/validation/validations.decorator';

@InputType()
export class CredentialsInput {
    @ValidateAs(User, 'login')
    @StringField()
    login!: string;

    @StringField()
    @StringLength(User.limits.password)
    password!: string;
}


export type HashedCredentials = I.RenameKey<CredentialsInput, 'password', 'passwordHash'>;