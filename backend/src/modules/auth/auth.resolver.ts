import { Mutation, Args, Resolver } from '@nestjs/graphql';

import { AuthService      } from './auth.service';
import { UserAndToken     } from './gql/user-and-token.object';
import { SignUpInput      } from './gql/sign-up.input';
import { CredentialsInput } from './gql/credentials.input';

@Resolver()
export class AuthResolver {
    
    constructor(
        private readonly auth: AuthService
    ) {}

    @Mutation(_returns => UserAndToken, {
        nullable: true,
        description: "Returns `UserAndToken` for the client according to the given `credentials`."
    })
    async signIn(@Args('credentials') credentials: CredentialsInput) {
        return this.auth.signIn(credentials);
    }

    @Mutation(_returns => UserAndToken, {
        description: 
        "Registers the client in the database and returns its `UserAndToken`. " +
        "Throws if failed to register new client."
    })
    async signUp(@Args('data') data: SignUpInput) {
        return this.auth.signUpOrFail(data);
    }

}