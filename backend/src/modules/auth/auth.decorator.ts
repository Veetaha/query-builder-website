import { UseGuards, SetMetadata } from '@nestjs/common';

import * as I from '@app/interfaces';
import { UserRole          } from '@modules/user/user-role.enum';
import { composeDecorators } from '@utils/meta';
import { AuthGuard         } from './auth.guard';
import { RolesMetaKey, OptionalAuthMetaKey } from './constants';

export const Auth = (...roles: UserRole[]) => composeDecorators<I.MethodDecorator>(
    SetMetadata(RolesMetaKey, roles),
    UseGuards(AuthGuard) as I.MethodDecorator
);

export const OptionalAuth = composeDecorators<I.MethodDecorator>(
    SetMetadata(OptionalAuthMetaKey, true),
    UseGuards(AuthGuard) as I.MethodDecorator
);