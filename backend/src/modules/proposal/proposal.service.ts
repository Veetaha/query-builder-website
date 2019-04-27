import { InjectRepository      } from '@nestjs/typeorm';
import { GraphQLDatabaseLoader } from 'typeorm-loader';
import { GraphQLResolveInfo    } from 'graphql';
import { Injectable, ForbiddenException } from '@nestjs/common';

import { User                    } from '@modules/user/user.entity';
import { OrmUtilsService         } from '@utils/orm/orm-utils.service';
import { ProposalRepo            } from './proposal.repository';
import { ProposalPaginationInput } from './gql/proposal-pagination.input';
import { ProposalUpdateInput     } from './gql/proposal-update.input';
import { ProposalCreateInput     } from './gql/proposal-create.input';
import { Proposal                } from './proposal.entity';




@Injectable()
export class ProposalService {
    constructor(
        @InjectRepository(ProposalRepo)
        private readonly repo: ProposalRepo,
        private readonly orm: OrmUtilsService
    ) {}

    async getPage(pageInput: ProposalPaginationInput) {
        return this.orm.getPage(this.repo, pageInput);
    }

    async getById(id: number) {
        return this.repo.findOne({ where: {id} });
    }

    async loadById(
        loader: GraphQLDatabaseLoader,
        info:   GraphQLResolveInfo,
        id:     number
    ) {
        return loader.loadOne(Proposal, { id }, info);
    }

    async update({ id, ...upd}: ProposalUpdateInput) {
        return this.orm.updateOne(this.repo, upd, 'id = :id', {id});
    }       

    async create(creatorLogin: string, data: ProposalCreateInput) {
        return this.repo.save(this.repo.merge(this.repo.create(data), {creatorLogin}));
    }

    async delete(id: number) {
        return (await this.repo.delete({id})).affected! > 0;
    }

    async isCreatedByUser(creatorLogin: string, proposalId: number) {
        return (await this.repo.count({ where: { creatorLogin, id: proposalId } })) > 0;
    }

    async ensureUserCanMutateProposalOrFail(user: User, proposalId: number) {
        if (!user.isAdmin() && !await this.isCreatedByUser(user.login, proposalId)) {
            throw new ForbiddenException(`You have no rights to mutate proposal #${proposalId}`);
        }
    }
}
