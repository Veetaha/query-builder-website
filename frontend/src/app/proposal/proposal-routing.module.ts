import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RouteMap  } from '@app/common/route-map.class';
import { AuthGuard } from '@app/auth/auth.guard';
import { UserRole  } from '@app/gql/generated';
import { deny      } from '@app/auth/user-role-limit.obj';

import { CreateProposalComponent        } from './create-proposal/create-proposal.component';
import { ViewProposalsComponent         } from './view-proposals/view-proposals.component';
import { ProposalDetailsComponent       } from './proposal-details/proposal-details.component';
import { ProposalDetailsResolverService } 
from './proposal-details/proposal-details-resolver.service';


const canActivate = [AuthGuard];

const { routeMap, routes } = RouteMap.create([
    {
        path:      'proposals/create',
        component:  CreateProposalComponent,
        data:       deny(UserRole.Guest),
        canActivate
    },
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