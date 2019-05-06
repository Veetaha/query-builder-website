import { Store      } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';

import { ProposalPaginationState } from '../proposal-pagination.state';
import { trackBy                 } from '../proposal.track-by';



@Component({
  selector:    'app-view-proposals',
  templateUrl: './view-proposals.component.html',
  styleUrls: ['./view-proposals.component.scss']
})
export class ViewProposalsComponent implements OnInit {
    readonly trackBy = trackBy;
    readonly paginationState = ProposalPaginationState;
    proposals$ = this.store.select(ProposalPaginationState.currentItems);
        
    constructor(private readonly store: Store) {}

    ngOnInit() {
        
    }

}
