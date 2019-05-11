import { State, StateContext, Action, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { CreateProposalStateModel as StateModel } from './create-proposal.model';
import { SubmitCreatedProposal   } from './create-proposal.actions';
import { ProposalService         } from '../proposal.service';
import { OpenProposalDetailsPage } from '../proposal-details/proposal-details.actions';


type StateCtx = StateContext<StateModel>;

@State<StateModel>({
    name: 'createProposal'
})
export class CreateProposalState {

    constructor(
        private readonly proposals: ProposalService,
        private readonly store: Store
    ) {}

    @Action(SubmitCreatedProposal)
    submitCreatedProposal(ctx: StateCtx) {
        return this.proposals
            .createProposal(ctx.getState().form.model)
            .pipe(tap(proposalId => this.store.dispatch(
                new OpenProposalDetailsPage(proposalId)
            )));
    }

}