import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RouteMap } from '@app/common/route-map.class';

import { ViewProposalsComponent         } from './view-proposals/view-proposals.component';
import { ProposalDetailsComponent       } from './proposal-details/proposal-details.component';
import { ProposalDetailsResolverService } 
from './proposal-details/proposal-details-resolver.service';

const { routeMap, routes } = RouteMap.create([
    {
        path:      'proposals/:id',
        component: ProposalDetailsComponent,
        resolve:   {
            proposal: ProposalDetailsResolverService
        }
    },
    {
        path:      'proposals',
        component:  ViewProposalsComponent
    }
]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProposalRoutingModule { 
    static readonly routeMap = routeMap;
}