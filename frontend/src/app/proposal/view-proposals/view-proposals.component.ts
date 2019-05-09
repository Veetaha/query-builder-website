import { Store      } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';

import { ViewProposalsState } from './view-proposals.state';
import { trackBy            } from '../proposal.track-by';



@Component({
    selector:    'app-view-proposals',
    templateUrl: './view-proposals.component.html',
    styleUrls: ['./view-proposals.component.scss']
})
export class ViewProposalsComponent implements OnInit {
    readonly trackBy = trackBy;
    readonly paginationState = ViewProposalsState;
    proposals$ = this.store.select(ViewProposalsState.items);
        
    constructor(private readonly store: Store) {}

    ngOnInit() {
        
    }

}
