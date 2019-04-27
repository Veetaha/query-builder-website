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
import { Nullable        } from '@utils/gql/opts';
import { ArgsId          } from '@utils/gql/id/args-id.decorator';

import { Rating              } from './gql/rating.object';
import { LikeService         } from './like.service';
import { LikePage            } from './gql/like-page.object';
import { LikePaginationInput } from './gql/like-pagination.input';
import { SetLikeArgs         } from './gql/set-like.args';
import { Like                } from './like.entity';


@Resolver(Like)
export class LikeResolver {

    constructor(
        private readonly likes:     LikeService,
        private readonly users:     UserService,
        private readonly proposals: ProposalService
    ) {}

    @ResolveProperty('rater', _type => User)
    async rater(
        @DataLoader loader:       GraphQLDatabaseLoader,
        @Info()     info:         GraphQLResolveInfo,
        @Root()     {raterLogin}: Like
    ) {
        return this.users.loadByLogin(loader, info, raterLogin);
    }

    @ResolveProperty('proposal', _type => Proposal)
    async proposal(
        @DataLoader loader:       GraphQLDatabaseLoader,
        @Info()     info:         GraphQLResolveInfo,
        @Root()     {proposalId}: Like
    ) {
        return this.proposals.loadById(loader, info, proposalId);
    }

    @Query(_returns => Rating, Nullable)
    async getRatingOfProposal(@ArgsId proposalId: number) {
        return this.likes.getRatingOfProposal(proposalId);
    }

    @Query(_returns => LikePage)
    async getLikesPage(@Args('params') params: LikePaginationInput) {
        return this.likes.getPage(params);
    }

    @Auth()
    @Mutation(_returns => Like)
    async setLike(@Client {login}: User, @Args() {proposalId, liked}: SetLikeArgs) {
        // TODO if there is no such proposal, throw new Error();
        return this.likes.setLike(login, proposalId, liked);
    }   
}