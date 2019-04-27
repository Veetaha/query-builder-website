import { EntityRepository, Repository } from 'typeorm';

import * as I from '@app/interfaces';
import { CredentialsInput } from '@modules/auth/gql/credentials.input';
import { User             } from './user.entity';

export type HashedCredentials = I.RenameKey<CredentialsInput, 'password', 'passwordHash'>;


@EntityRepository(User)
export class UserRepo extends Repository<User> {

    async getByHashedCredentials(where: HashedCredentials) {

        return this.findOne({ where });
    }

    async getByLogin(login: string) {
        return this.findOne({ where: {login} });
    }

    async loginIsTaken(login: string) {
        return (await this.count({ where: {login} })) > 0;
    }
}