import { NgModule   } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { CommonModule } from '@app/common/common.module';

import { ProposalRoutingModule   } from './proposal-routing.module';
import { ViewProposalsComponent  } from './view-proposals/view-proposals.component';
import { ProposalPaginationState } from './proposal-pagination.state';


@NgModule({
    imports: [
        CommonModule,
        NgxsModule.forFeature([ProposalPaginationState])
    ],
    exports: [
        ProposalRoutingModule
    ],
    declarations: [ViewProposalsComponent]
})
export class ProposalModule {

}