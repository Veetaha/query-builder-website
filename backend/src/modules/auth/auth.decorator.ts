import { UseGuards, SetMetadata } from '@nestjs/common';

import * as I from '@app/interfaces';
import { UserRole     } from '@modules/user';
import { AuthGuard    } from './auth.guard';
import { RolesMetaKey } from './roles-meta-key.constant';
import { composeDecorators } from '@utils/meta';

export const Auth = (...roles: UserRole[]) => composeDecorators<I.MethodDecorator>(
    SetMetadata(RolesMetaKey, roles),
    UseGuards(AuthGuard) as I.MethodDecorator
);
