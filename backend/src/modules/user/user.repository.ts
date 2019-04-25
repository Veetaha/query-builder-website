import { EntityRepository, Repository } from 'typeorm';

import { User } from './user.entity';
import { HashedCredentials } from '@modules/auth/gql/credentials.input';

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