import * as Joi from 'typesafe-joi';
import * as Crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { Injectable, ForbiddenException } from '@nestjs/common';

import * as I from '@app/interfaces';
import { ConfigService    } from '@modules/config';
import { UserService      } from '@modules/user';
import { CredentialsInput } from './gql/credentials.input';
import { UserAndToken     } from './gql/user-and-token.object';
import { SignUpInput      } from './gql/sign-up.input';


@Injectable()
export class AuthService {
    constructor(
        private readonly users:  UserService,
        private readonly jwt:    JwtService,
        private readonly config: ConfigService
    ) {}

    /**
     * Returns user its encoded jwt for the given `credentials`.
     * @param param0 Credentials that identify the target user.
     * 
     * @throws `Error` if failed to find user by credentials.
     */
    async signIn(credentials: CredentialsInput) {
        const user = await this.getUserByCredentials(credentials);
        if (user == null) {
            return null;
        }
        const payload: I.JwtPayload = { sub: user.login };
        return new UserAndToken({
            user,
            jwt: this.jwt.sign(payload)
        });
    }

    private async getUserByCredentials({ login, password }: CredentialsInput) {
        return this.users.getByHashedCredentials({ 
            login, 
            passwordHash: this.getPasswordHash(password) 
        });
    }

    private getPasswordHash(password: string) {
        const hash = Crypto.createHmac('sha512', this.config.passwordSalt);
        hash.update(password);
        return hash.digest('hex');
    }   



    /**
     * Returns `User` by jwt payload. Throws if payload is invalid, returns nullish value
     * if no user was found.
     * 
     * @param payload Deserialized jwt payload
     */
    async getUserByJwtPayloadOrFail(payload: unknown) {
        return this.users.getByLogin(
            Joi.attempt(
                payload, 
                I.JwtPayloadSchema, 
                new ForbiddenException('invlaid JWT bearer token')
            ).sub
        );
    }

    async signUpOrFail({ credentials: {login, password}, name }: SignUpInput) {
        if (await this.users.loginIsTaken(login)) {
            throw new ForbiddenException(`Login '${login}' is already taken.`);
        }
        const user = await this.users.createUser({
            login,
            name,
            passwordHash: this.getPasswordHash(password)
        });

        const jwtPayload: I.JwtPayload = { sub: user.login };
        return new UserAndToken({
            user,
            jwt: this.jwt.sign(jwtPayload)
        });
    }


}
