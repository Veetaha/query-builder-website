import { Nullable } from 'ts-typedefs';
import { Store    } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';

import { Rating    } from '@app/gql/generated';
import { AuthState } from '@app/auth/auth.state';

import { ProposalDetailsState } from './proposal-details.state';
import { RateProposal } from './proposal-details.actions';



@Component({
    selector:    'app-proposal-details',
    templateUrl: './proposal-details.component.html',
    styleUrls:  ['./proposal-details.component.scss']
})
export class ProposalDetailsComponent implements OnInit {

    readonly proposal$ = this.store.select(ProposalDetailsState.proposal);
    readonly client$   = AuthState.selectClient(this.store);
        
    constructor(private readonly store: Store) {}

    ngOnInit() {
        
    }

    rateProposal(liked: boolean) {
        this.store.dispatch(new RateProposal(liked));
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

}
