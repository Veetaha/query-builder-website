import { InputType } from 'type-graphql';

import { User             } from '@modules/user';
import { NestedInputField } from '@utils/gql/decorators/nested-input-field.decorator';
import { CredentialsInput } from './credentials.input';
import { StringField } from '@utils/gql/decorators/explicit-type-field.decorator';
import { ValidateAs } from '@utils/validation/validations.decorator';



@InputType()
export class SignUpInput {
    @NestedInputField(_type => CredentialsInput)
    credentials!: CredentialsInput;

    @ValidateAs(User, 'name')
    @StringField()
    name!: string;
}
