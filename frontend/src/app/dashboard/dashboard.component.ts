import { Component  } from '@angular/core';
import { Store } from '@ngxs/store';

import { AuthState } from '@app/auth/auth.state';
import { SignOut   } from '@app/auth/auth.actions';
import { AuthRoutingModule } from '@app/auth/auth-routing.module';
import { CommonState } from '@app/common/common.state';
import { ProposalRoutingModule } from '@app/proposal/proposal-routing.module';

@Component({
    selector:    'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls:  ['./dashboard.component.scss']
})
export class DashboardComponent {
    readonly authRouteMap         = AuthRoutingModule.routeMap;
    readonly proposalsRouteMap    = ProposalRoutingModule.routeMap;
    readonly client$              = AuthState.selectClient(this.store);
    readonly isAwaitingResponses$ = this.store.select(CommonState.isAwaitingResponses);

    constructor(private readonly store: Store) {}
    
    signOut() {
        this.store.dispatch(SignOut.instance);
    }
}