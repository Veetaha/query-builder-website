import produce from 'immer';
import { AsyncFunc, Nullable } from 'ts-typedefs';
import { Mutex     } from 'async-mutex';
import { map, take } from 'rxjs/operators';
import { State, StateContext, Action, Store, Selector } from '@ngxs/store';

import { Warning   } from '@app/error/error.actions';
import { AuthState } from '@app/auth/auth.state';
import { UserRole  } from '@app/gql/generated';

import { ProposalService } from '../proposal.service';
import { ProposalDetailsModel as StateModel } from './proposal-details.model';
import { FetchProposal, RateProposal, UpdateProposal } from './proposal-details.actions';
import { EntireProposal } from '../interfaces';

type StateCtx = StateContext<StateModel>;

@State<StateModel>({
    name: 'viewProposal',
    defaults: {
        proposal: null
    }
})
export class ProposalDetailsState {

    private readonly stateMutex = new Mutex;

    constructor(
        private readonly store:     Store,
        private readonly proposals: ProposalService
    ) {}

    @Selector() static clientProposalRating(s: StateModel) {
        return s.proposal == null ? null : s.proposal.myRating;
    }
    @Selector() static proposal(s: StateModel) { return s.proposal; }

    @Action(FetchProposal)
    async fetchProposal(ctx: StateCtx, { proposalId }: FetchProposal) {
        await this.runExclusive(async () => ctx.patchState({
            proposal: await this.proposals.getProposalById(proposalId).toPromise()
        }));
    }   

    @Action(RateProposal)
    async rateProposal(ctx: StateCtx, { liked }: RateProposal) {
        await this.runExclusive(async () => {
            await this.ensureClientCanRateProposalOrFail(ctx);
            const { id, myRating } = ctx.getState().proposal!;

            if (myRating != null && myRating.liked === liked) {
                this.store.dispatch(new Warning(
                    `User already ${liked ? 'likes' : 'dislikes'} current proposal.`
                ));
                return;
            }

            await this.proposals.rateProposal({ proposalId: id, liked}).toPromise();

            this.setNewLikes(ctx, { liked });
            ctx.patchState({  
                proposal: { ...ctx.getState().proposal!, myRating: { liked } } 
            });
        });
    }

    private setNewLikes(
        ctx:       StateCtx,
        newRating: Nullable<EntireProposal['myRating']>
    ) {
        const prevRating = ctx.getState().proposal!.myRating;
        if (prevRating == null || newRating == null) {
            this.changeLikes(ctx, (prevRating || newRating)!.liked, prevRating == null);
        } else {
            this.swapLikeAndDislike(ctx, newRating.liked);
        }
    }

    private swapLikeAndDislike(ctx: StateCtx, shouldSetLike: boolean) {
        const state = ctx.getState();
        const incr  = shouldSetLike ? +1 : -1;
        ctx.setState(produce(state, draft => { 
            draft.proposal!.likes    += incr;
            draft.proposal!.dislikes -= incr;
        }));
    }

    private changeLikes(ctx: StateCtx, isLikes: boolean, shouldIncrement: boolean) {
        ctx.setState(produce(ctx.getState(), draft => {
            draft.proposal![isLikes ? 'likes' : 'dislikes'] += shouldIncrement ? +1 : -1;
        }));
    }

    @Action(UpdateProposal)
    async updateProposal(ctx: StateCtx, update: UpdateProposal) {
        await this.runExclusive(async () => {

            await this.ensureClientCanUpdateProposalOrFail(ctx);
            const updatedProposal = await this.proposals
                .updateProposal({ ...update, id: ctx.getState().proposal!.id })
                .toPromise();
            ctx.patchState({ proposal: updatedProposal });

        });
    }

    /**
     * True if client is owner of the proposal or admin.
     */
    private async ensureClientCanUpdateProposalOrFail(ctx: StateCtx) {
        this.ensureProposalNotNullOrFail(ctx);
        return AuthState.selectClient(this.store).pipe(take(1), map(client => {
            if (client == null || 
                client.login !== ctx.getState().proposal!.creator.login && 
                client.role  !== UserRole.Admin
            ) {
                throw new Error('You have no rights to update this proposal');
            }
        })).toPromise();
    }

    /**
     * True if client is authenticed.
     */
    private async ensureClientCanRateProposalOrFail(ctx: StateCtx) {
        this.ensureProposalNotNullOrFail(ctx);
        return AuthState.selectEnsureClientIsAuthorizedOrFail(this.store)
            .pipe(take(1)).toPromise();
    }
    
    private ensureProposalNotNullOrFail(ctx: StateCtx) {
        if (ctx.getState().proposal == null) {
            throw new Error('There is no proposal to rate');
        }
    }

    private async runExclusive(routine: AsyncFunc<[]>) {
        const releaseMutex = await this.stateMutex.acquire();
        try { 
            return await routine();
        } finally {
            releaseMutex();
        }
    }
}