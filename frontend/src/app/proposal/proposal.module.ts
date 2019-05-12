import { NgModule   } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { CommonModule } from '@app/common/common.module';

import { ProposalRoutingModule      } from './proposal-routing.module';
import { ViewProposalsComponent     } from './view-proposals/view-proposals.component';
import { ProposalDetailsComponent   } from './proposal-details/proposal-details.component';
import { CreateProposalComponent    } from './create-proposal/create-proposal.component';

import { PaginatedProposalComponent } 
from './view-proposals/paginated-proposal/paginated-proposal.component';

import { ProposalDetailsHeaderComponent } 
from './proposal-details/proposal-details-header/proposal-details-header.component';

import { ProposalDetailsMainPictureComponent }
from './proposal-details/proposal-details-main-picture/proposal-details-main-picture.component';

import { ProposalDetailsIntroComponent }
from './proposal-details/proposal-details-intro/proposal-details-intro.component';

import { ProposalDetailsBodyTextComponent }
from './proposal-details/proposal-details-body-text/proposal-details-body-text.component';

import { ProposalDetailsRatingComponent }
from './proposal-details/proposal-details-rating/proposal-details-rating.component';

import { ViewProposalsState   } from './view-proposals/view-proposals.state';
import { ProposalDetailsState } from './proposal-details/proposal-details.state';
import { CreateProposalState  } from './create-proposal/create-proposal.state';




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
        CreateProposalComponent,
        ProposalDetailsHeaderComponent,
        ProposalDetailsMainPictureComponent,
        ProposalDetailsIntroComponent,
        ProposalDetailsBodyTextComponent,
        ProposalDetailsRatingComponent
    ]
})
export class ProposalModule {

}