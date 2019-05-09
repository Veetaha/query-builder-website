import { NgModule   } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { CommonModule } from '@app/common/common.module';

import { ProposalRoutingModule      } from './proposal-routing.module';
import { ViewProposalsComponent     } from './view-proposals/view-proposals.component';
import { ProposalDetailsComponent   } from './proposal-details/proposal-details.component';
import { ViewProposalsState         } from './view-proposals/view-proposals.state';
import { ProposalDetailsState       } from './proposal-details/proposal-details.state';
import { PaginatedProposalComponent } 
from './view-proposals/paginated-proposal/paginated-proposal.component';



@NgModule({
    imports: [
        CommonModule,
        NgxsModule.forFeature([ViewProposalsState, ProposalDetailsState]),
        ProposalRoutingModule
    ],
    exports: [
        ProposalRoutingModule
    ],
    declarations: [
        ViewProposalsComponent,
        PaginatedProposalComponent,
        ProposalDetailsComponent
    ]
})
export class ProposalModule {

}