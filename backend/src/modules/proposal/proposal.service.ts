import { InjectRepository      } from '@nestjs/typeorm';
import { GraphQLDatabaseLoader } from 'typeorm-loader';
import { GraphQLResolveInfo    } from 'graphql';

import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';

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
    

    /**
     * Returns a page of proposals.
     * 
     * @param pageInput Pagination parameters to use.
     */
    async getPage(pageInput: ProposalPaginationInput) {
        return this.orm.getPage(this.repo, pageInput);
    }

    /**
     * Returns proposal by its unique identifier.
     * 
     * @param id Identifier of the target proposal to retrieve.
     */
    async getById(id: number) {
        return this.repo.findOne({ where: {id} });
    }

    /**
     * Loads proposal by `id` using the given `loader` and graphql `info`.
     * 
     * @param loader Data loader to use for queries.
     * @param info   Grahpql resolve info to use for selection.
     * @param id     Target proposal unique identifier.
     */
    async loadById(
        loader: GraphQLDatabaseLoader,
        info:   GraphQLResolveInfo,
        id:     number
    ) {
        return loader.loadOne(Proposal, { id }, info);
    }

    /**
     * Updates proposal data under the given `id`. Returns updated proposal.
     * Returns `null` if no proposal was found to update.
     * 
     * @param param0 Parameteres for update.
     */
    async update({ id, ...upd}: ProposalUpdateInput) {
        return this.orm.updateOne(this.repo, upd, 'id = :id', {id});
    }       

    /**
     * Creates proposal on behalf of the user with login `creatorLogin`.
     * 
     * @param creatorLogin User id who creates the proposal.
     * @param data         Intial data to be assigned to the created proposal.
     */
    async create(creatorLogin: string, data: ProposalCreateInput) {
        return this.repo.save(this.repo.merge(this.repo.create(data), {creatorLogin}));
    }

    /**
     * Does nothing if proposal with `id` already exists in the database.
     * Otherwise throws `NotFoundException`.
     * 
     * @param id Unique identifier of the propsal to query existence for.
     */
    async ensureProposalExistsOrFail(id: number) {
        if (0 === await this.repo.count({ where: {id} })) {
            throw new NotFoundException(`no proposal was found under id #${id}`);
        }
    }

    /**
     * Deletes proposal by `id` and returns `true` if proposal was deleted indeed.
     * Returns `false` if there was no proposal to delete.
     * 
     * @param id Identifier of the proposal to delete.
     */
    async delete(id: number) {
        return (await this.repo.delete({id})).affected! > 0;
    }

    /**
     * Returns `true` if proposal with `proposalId` was created by user with
     * `creatorLogin`.
     * 
     * @param creatorLogin Login of the user to compare with.
     * @param proposalId   Identifier of the proposal to check.
     */
    async isCreatedByUser(creatorLogin: string, proposalId: number) {
        return 0 < await this.repo.count({ where: { creatorLogin, id: proposalId } });
    }

    /**
     * Does nothing if `user` has rights to mutate the proposal with `proposalId`.
     * Otherwise throws `ForbiddenException`.
     * 
     * @param user       User who is check to have mutation rights.
     * @param proposalId Target proposal id.
     */
    async ensureUserCanMutateProposalOrFail(user: User, proposalId: number) {
        if (!user.isAdmin() && !await this.isCreatedByUser(user.login, proposalId)) {
            throw new ForbiddenException(`you have no rights to mutate proposal #${proposalId}`);
        }
    }
}
