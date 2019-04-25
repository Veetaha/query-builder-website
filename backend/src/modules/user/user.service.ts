import { Injectable       } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { HashedCredentials   } from '@modules/auth';
import { GqlUtilsService     } from '@utils/gql/gql-utils.service';
import { OrmUtilsService     } from '@utils/orm/orm-utils.service';
import { UserRepo            } from './user.repository';
import { UserUpdateInput     } from './gql/user-update.input';
import { User                } from './user.entity';
import { UserPaginationInput } from './gql/user-pagination.input';
import { UserPage            } from './gql/user-page.object';



@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepo)
        private readonly repo: UserRepo,
        private readonly gql: GqlUtilsService,
        private readonly orm: OrmUtilsService
    ) {}

    /**
     * Returns `User` that has the given `login` if it exists.
     * @param login Target user unique login.
     */
    async getByLogin(login: string) { 
        return this.repo.getByLogin(login);
    }

    async getByHashedCredentials(credentials: HashedCredentials) {
        return this.repo.getByHashedCredentials(credentials);
    }

    async loginIsTaken(login: string) {
        return this.repo.loginIsTaken(login);
    }

    async createUser(user: Partial<User>) {
        return this.repo.save(user);
    }

    async getPage({ limit, offset, filter, sort }: UserPaginationInput) {
        const tableAlias = 'user';
        const [data, total] = await this
            .repo
            .createQueryBuilder(tableAlias)
            .where(...this.gql.getFilterParams(filter, tableAlias))
            .orderBy(this.gql.getOrderByCondition(sort, tableAlias))
            .skip(offset)
            .take(limit)
            .getManyAndCount();     
            
        return new UserPage({ data, total });
    }

    async update(login: string, upd: UserUpdateInput) {
        return this.orm.updateOne(this.repo, upd, 'login = :login', {login});
    }       

}
