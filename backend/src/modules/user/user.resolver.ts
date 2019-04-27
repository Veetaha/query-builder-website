import _ from 'lodash';
import { Resolver, Query, ResolveProperty, Args, Root, Mutation } from '@nestjs/graphql';


import { ConfigService        } from '@modules/config/config.service';
import { Auth                 } from '@modules/auth/auth.decorator';
import { Client               } from '@modules/auth/client.decorator';

import { UserPage             } from './gql/user-page.object';
import { UserPaginationInput  } from './gql/user-pagination.input';
import { UserUpdateInput      } from './gql/user-update.input';
import { UserRole             } from './user-role.enum';
import { User                 } from './user.entity';
import { UserService          } from './user.service';
import { AdminUserUpdateInput } from './gql/admin-user-update.input';





@Resolver(User)
export class UserResolver {
    constructor(
        private readonly config: ConfigService,
        private readonly users:  UserService
    ) {}

    @ResolveProperty('avatarUrlOrDefault', _type => String, {
        description: "Returns existing `avatarUrl` or default one if former was not set."
    })
    avatarUrlOrDefault(@Root() {avatarUrl}: User) {
        return avatarUrl == null 
            ? this.config.default.user.avatarUrl
            : avatarUrl;
    }
    
    @Query(_returns => User, {
        nullable: true,
        description: "Returns user by login, or `null` if nothing was found."
    })
    async getUserByLogin(@Args('login') login: string) {
        return this.users.getByLogin(login);
    }

    @Query(_returns => UserPage, {
        description: "Paginates all users."
    })
    async getUsersPage(@Args('params') params: UserPaginationInput) {
        return this.users.getPage(params);
    }

    @Auth()
    @Query(_returns => User, {
        description: "Requires auth. Returns `User` that represents the current client."
    })
    getMe(@Client client: User) {
        return client;
    }

    @Auth()
    @Mutation(_returns => User, {
        description: "Requires auth. Updates current client data and returns it."
    })
    async updateMe(@Client client: User, @Args('params') params: UserUpdateInput){
        return this.users.update(client.login, params);
    }

    @Auth(UserRole.Admin)
    @Mutation(_returns => User, {
        nullable: true,
        description: 
        "Requires 'Admin' rights. Updates user by the given login and returns it, " +
        "but retuns `null` if there nothing was found for the given login."
    })
    async updateUser(@Args('params') {login, ...upd}: AdminUserUpdateInput) {
        return this.users.update(login, upd);
    }
}