import { Mutation, Args, Resolver } from '@nestjs/graphql';

import { Nullable         } from '@utils/gql/opts';
import { AuthService      } from './auth.service';
import { UserAndToken     } from './gql/user-and-token.object';
import { SignUpInput      } from './gql/sign-up.input';
import { CredentialsInput } from './gql/credentials.input';

@Resolver()
export class AuthResolver {
    
    constructor(
        private readonly auth: AuthService
    ) {}

    @Mutation(_returns => UserAndToken, Nullable)
    async signIn(@Args('credentials') credentials: CredentialsInput) {
        return this.auth.signIn(credentials);
    }

    @Mutation(_returns => UserAndToken)
    async signUp(@Args('data') data: SignUpInput) {
        return this.auth.signUpOrFail(data);
    }

}