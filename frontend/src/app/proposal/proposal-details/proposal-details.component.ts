import { Nullable  } from 'ts-typedefs';
import { Store     } from '@ngxs/store';
import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { AuthState } from '@app/auth/auth.state';
import { Client    } from '@app/auth/interfaces';
import { Rating, UserRole } from '@app/gql/generated';

import { ProposalDetailsState } from './proposal-details.state';
import { RateProposal, DeleteProposal } from './proposal-details.actions';



@Component({
    selector:    'app-proposal-details',
    templateUrl: './proposal-details.component.html',
    styleUrls:  ['./proposal-details.component.scss']
})
export class ProposalDetailsComponent {

    readonly proposal$ = this.store.select(ProposalDetailsState.proposal);
    readonly client$   = AuthState.selectClient(this.store);
        
    constructor(
        private readonly store: Store,
        private readonly confirms: ConfirmationService
    ) {}

    tryDeleteProposal() {
        this.confirms.confirm({
            message: `Are you sure you want to delete this proposal?`,
            accept: () => this.store.dispatch(DeleteProposal.instance)
        });
    }

    rateProposal(liked: boolean) {
        const proposalRating = this.store.selectSnapshot(
            ProposalDetailsState.clientProposalRating
        );
        if (proposalRating == null || proposalRating.liked !== liked) {
            this.store.dispatch(new RateProposal(liked));
        }
    }

    getRatingButtonClasses(rating: Nullable<Rating>, isLikeButton: boolean){
        return `ui-button-rounded ui-button-${
            rating == null || rating.liked !== isLikeButton 
                ? 'secondary' 
                : 'primary'
        }`;
    }

    shouldDisableRatingButton(rating: Nullable<Rating>, isLikeButton: boolean) {
        return rating != null && rating.liked === isLikeButton;
    }

    canClientUpdateProposal(client: Nullable<Client>, proposalCreatorLogin: string) {
        return client != null && (
            client.login === proposalCreatorLogin || client.role === UserRole.Admin
        );
    }
}
