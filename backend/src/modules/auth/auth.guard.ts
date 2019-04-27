import { Reflector           } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext, Injectable   } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

import { User         } from '@modules/user/user.entity';
import { UserRole     } from '@modules/user/user-role.enum';
import { RolesMetaKey } from './roles-meta-key.constant';

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {

    constructor(private readonly reflector: Reflector) {
        super();
    }

    /**
     * @override
     */
    async canActivate(context: ExecutionContext) {
        const userFound = await super.canActivate(context);
        if (!userFound) {
            return false;
        }

        const allowedRoles = this.getAllowedRoles(context);
        return allowedRoles.length === 0 || allowedRoles.includes(this.getUserRole(context));
    }

    /**
     * @override
     */
    getRequest(context: ExecutionContext) {
        return GqlExecutionContext.create(context).getContext().req;
    }


    private getAllowedRoles(context: ExecutionContext) {
        return this.reflector.get<UserRole[]>(RolesMetaKey, context.getHandler());
    }

    private getUserRole(context: ExecutionContext) {
        return (this.getRequest(context).user as User).role;
    }
}