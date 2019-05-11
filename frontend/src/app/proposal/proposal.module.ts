import { NgModule   } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { CommonModule } from '@app/common/common.module';

import { ProposalRoutingModule      } from './proposal-routing.module';
import { ViewProposalsComponent     } from './view-proposals/view-proposals.component';
import { ProposalDetailsComponent   } from './proposal-details/proposal-details.component';
import { ViewProposalsState         } from './view-proposals/view-proposals.state';
import { ProposalDetailsState       } from './proposal-details/proposal-details.state';
import { CreateProposalState        } from './create-proposal/create-proposal.state';
import { PaginatedProposalComponent } 
from './view-proposals/paginated-proposal/paginated-proposal.component';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';




@NgModule({
    imports: [
        CommonModule,
        NgxsModule.forFeature([
            ViewProposalsState, 
            ProposalDetailsState,
            CreateProposalState
        ]),
        ProposalRoutingModule
    ],
    exports: [
        ProposalRoutingModule
    ],
    declarations: [
        ViewProposalsComponent,
        PaginatedProposalComponent,
        ProposalDetailsComponent,
        CreateProposalComponent
    ]
})
export class ProposalModule {

}