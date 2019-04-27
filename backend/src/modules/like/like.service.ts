import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as I from '@app/interfaces';
import { OrmUtilsService     } from '@utils/orm/orm-utils.service';
import { LikeRepo            } from './like.repository';
import { Like                } from './like.entity';
import { LikePaginationInput } from './gql/like-pagination.input';


@Injectable()
export class LikeService {

    constructor(
        @InjectRepository(Like)
        private readonly repo: LikeRepo,
        private readonly orm:  OrmUtilsService
    ) {}

    async getRatingOfProposal(proposalId: number) {
        return this.repo.getRatingOfProposal(proposalId);
    }

    async getPage(pageInput: LikePaginationInput) {
        return this.orm.getPage(this.repo, pageInput);
    }

    async create(like: I.CoreEntityData<Like>) {
        return this.repo.save(this.repo.create(like));
    }

    async setLike(raterLogin: string, proposalId: number, liked: boolean) {
        const like = this.repo.merge(this.repo.create({liked}), {raterLogin, proposalId});
        const res = await this.repo.save(like);
        return res;
    }
}