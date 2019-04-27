import { Root, Resolver, Query, Args, Mutation, ResolveProperty, Info } from "@nestjs/graphql";
import { GraphQLDatabaseLoader } from 'typeorm-loader';
import { GraphQLResolveInfo    } from 'graphql';

import { UserService             } from '@modules/user/user.service';
import { ConfigService           } from '@modules/config/config.service';
import { Auth                    } from '@modules/auth/auth.decorator';
import { Client                  } from '@modules/auth/client.decorator';
import { User                    } from '@modules/user/user.entity';
import { DataLoader              } from '@modules/common/data-loader.decorator';
import { ArgsId                  } from '@utils/gql/id/args-id.decorator';

import { Proposal                } from './proposal.entity';
import { ProposalService         } from './proposal.service';
import { ProposalPaginationInput } from './gql/proposal-pagination.input';
import { ProposalPage            } from './gql/proposal-page.object';
import { ProposalCreateInput     } from './gql/proposal-create.input';
import { ProposalUpdateInput     } from './gql/proposal-update.input';


@Resolver(Proposal)
export class ProposalResolver {

    constructor(
        private readonly proposals: ProposalService,
        private readonly users:     UserService,
        private readonly config:    ConfigService
    ) {}

    @ResolveProperty('mainPictureUrlOrDefault', _type => String, {
        description: "Returns existing `mainPictureUrl` or default one if former was not set."
    })
    mainPictureUrlOrDefault(@Root() {mainPictureUrl}: Proposal) {
        return mainPictureUrl == null 
            ? this.config.default.proposal.mainPictureUrl
            : mainPictureUrl;
    }

    @ResolveProperty('creator', _returns => User, {
        description: "Returns the user that created this proposal."
    })
    async creator(
        @Root() {creatorLogin}: Proposal, 
        @Info() info: GraphQLResolveInfo,
        @DataLoader loader: GraphQLDatabaseLoader
    ) {
        return this.users.loadByLogin(loader, info, creatorLogin);
    }

    @Query(_returns => ProposalPage, {
        description: "Paginates all proposals."
    })
    async getProposalsPage(@Args('params') params: ProposalPaginationInput) {
        return this.proposals.getPage(params);
    }

    @Query(_returns => Proposal, {
        nullable: true,
        description: "Returns proposal by id, or `null` if nothing was found."
    })
    async getProposalById(@ArgsId id: number) {
        return this.proposals.getById(id);
    }

    @Auth()
    @Mutation(_returns => Proposal, {
        description: 
        "Requires auth. Creates a proposal on behalf of the client and returns it."
    })
    async createProposal(@Client {login}: User, @Args('params') params: ProposalCreateInput) {
        return this.proposals.create(login, params);
    }

    @Auth()
    @Mutation(_returns => Proposal, {
        description: 
        "Requires auth. Updates proposal and returns it, but throws if propsal " +
        "doesn't exist or client has no rights to mutate the proposal."
    })
    async updateProposal(@Client client: User, @Args('params') params: ProposalUpdateInput) {
        await  this.proposals.ensureUserCanMutateProposalOrFail(client, params.id);
        return this.proposals.update(params);
    }


    @Auth()
    @Mutation(_returns => Boolean, {
        description: 
        "Requires auth. Deletes the proposal by id and returns `true`, but throws " +
        " if propsal doesn't exist or client has no rights to mutate the proposal."
    })
    async deleteProposal(@Client client: User, @Args('id') proposalId: number) {
        await  this.proposals.ensureUserCanMutateProposalOrFail(client, proposalId);
        return this.proposals.delete(proposalId);
    }
    
}