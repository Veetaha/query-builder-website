import { InputType } from 'type-graphql';

import { User          } from '@modules/user/user.entity';
import { ConfigService } from '@modules/config/config.service';
import { StringField   } from '@utils/gql/decorators/explicit-type-field.decorator';
import { StringLength  } from '@utils/validation/string-length.decorator';
import { ValidateAs    } from '@utils/validation/validations.decorator';


@InputType()
export class CredentialsInput {
    @ValidateAs(User, 'login')
    @StringField()
    login!: string;

    @StringField()
    @StringLength(ConfigService.limits.user.password)
    password!: string;
}