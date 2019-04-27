import { Context } from '@nestjs/graphql';
import { GetClientPipe } from './get-client.pipe';

import * as I from '@app/interfaces';
import { User } from '@modules/user/user.entity';

/**
 * Injects user from context into the parameter.
 */
export const Client: I.ParameterDecorator<I.Nullable<User>> = Context(GetClientPipe);