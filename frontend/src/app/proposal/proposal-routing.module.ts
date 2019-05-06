import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// import { UserRole } from '@app/gql/generated';
import { RouteMap } from '@app/common/route-map.class';

import { ViewProposalsComponent } from './view-proposals/view-proposals.component';
// const canActivate = [AuthGuard];

const { routeMap, routes } = RouteMap.create([
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