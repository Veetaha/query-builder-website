import { GraphQLDatabaseLoader } from 'typeorm-loader';
import { GraphQLResolveInfo    } from 'graphql';
import { Root, Resolver, Query, Args, Mutation, ResolveProperty, Info } from '@nestjs/graphql';

import { Auth            } from '@modules/auth/auth.decorator';
import { User            } from '@modules/user/user.entity';
import { Client          } from '@modules/auth/client.decorator';
import { ProposalService } from '@modules/proposal/proposal.service';
import { UserService     } from '@modules/user/user.service';
import { DataLoader      } from '@modules/common/data-loader.decorator';
import { Proposal        } from '@modules/proposal/proposal.entity';

import { RatingService         } from './rating.service';
import { RatingPage            } from './gql/rating-page.object';
import { RatingPaginationInput } from './gql/rating-pagination.input';
import { RateProposalArgs      } from './gql/rate-proposal.args';
import { Rating                } from './rating.entity';


@Resolver(Rating)
export class RatingResolver {

    constructor(
        private readonly ratings:   RatingService,
        private readonly users:     UserService,
        private readonly proposals: ProposalService
    ) {}

    @ResolveProperty('rater', _type => User, {
        description: 'Returns the user that rated the given `proposal`.'
    })
    async rater(
        @DataLoader loader:       GraphQLDatabaseLoader,
        @Info()     info:         GraphQLResolveInfo,
        @Root()     {raterLogin}: Rating
    ) {
        return this.users.loadByLogin(loader, info, raterLogin);
    }

    @ResolveProperty('proposal', _type => Proposal, {
        description: 'Returns proposal that was rated by the given `rater`.'
    })
    async proposal(
        @DataLoader loader:       GraphQLDatabaseLoader,
        @Info()     info:         GraphQLResolveInfo,
        @Root()     {proposalId}: Rating
    ) {
        return this.proposals.loadById(loader, info, proposalId);
    }

    @Query(_returns => RatingPage, {
        description: 'Paginates all ratings.'
    })
    async getLikesPage(@Args('params') params: RatingPaginationInput) {
        return this.ratings.getPage(params);
    }

    @Auth()
    @Mutation(_returns => Rating, {
        description: 
        "Requires auth. Creates or updates existing rating the client gave to the proposal."
    })
    async rateProposal(@Client {login}: User, @Args() {proposalId, liked}: RateProposalArgs) {
        await  this.proposals.ensureProposalExistsOrFail(proposalId);
        return this.ratings.setRating(login, proposalId, liked);
    }   

    @Auth()
    @Mutation(_returns => Boolean, {
        description:
        "Requires auth. Deletes rating instance on behalf of the client. " +
        "Returns `true` if deletion was successful."
    })
    async deleteRating(@Client {login}: User, @Args('proposalId') proposalId: number) {
        return this.ratings.delete(login, proposalId);
    }
}