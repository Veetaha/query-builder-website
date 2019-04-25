import { Resolver, Query, ResolveProperty, Args, Root, Mutation } from '@nestjs/graphql';


import { Nullable            } from '@utils/gql/opts';
import { ConfigService       } from '@modules/config';
import { Auth, Client        } from '@modules/auth';
import { UserPage            } from './gql/user-page.object';
import { UserPaginationInput } from './gql/user-pagination.input';
import { UserUpdateInput     } from './gql/user-update.input';
import { UserRole            } from './user-role.enum';
import { User                } from './user.entity';
import { UserService         } from './user.service';
import { AdminUserUpdateInput } from './gql/admin-user-update.input';





@Resolver(User)
export class UserResolver {
    constructor(
        private readonly config: ConfigService,
        private readonly users:  UserService
    ) {}

    @ResolveProperty()
    avatarUrlOrDefault(@Root() user: User): string {
        return user.avatarUrl || this.config.defaultUserAvatarUrl;
    }
    
    @Query(_returns => User, Nullable)
    async getUserByLogin(@Args('login') login: string) {
        return this.users.getByLogin(login);
    }

    @Query(_returns => UserPage)
    async getUsersPage(@Args('params') params: UserPaginationInput) {
        return this.users.getPage(params);
    }

    @Auth()
    @Query(_returns => User)
    getMe(@Client client: User) {
        return client;
    }

    @Auth()
    @Mutation(_returns => User)
    async updateMe(@Client client: User, @Args('params') params: UserUpdateInput) {
        return this.users.update(client.login, params);
    }

    @Auth(UserRole.Admin)
    @Mutation(_returns => User)
    async updateUser(@Args('params') params: AdminUserUpdateInput) {
        return this.users.update(params.login, params);
    }
}