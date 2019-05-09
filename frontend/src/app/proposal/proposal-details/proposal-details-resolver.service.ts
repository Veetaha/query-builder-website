import * as Vts from 'vee-type-safe';
import { finalize   } from 'rxjs/operators';
import { Store      } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Warning      } from '@app/error/error.actions';
import { OpenHomePage } from '@app/app.actions';

import { FetchProposal } from './proposal-details.actions';
import { ProposalDetailsState } from './proposal-details.state';

@Injectable({ providedIn: 'root' })
export class ProposalDetailsResolverService implements Resolve<void> {
    constructor(private readonly store: Store) {}

    resolve(route: ActivatedRouteSnapshot) {
        const proposalId = parseInt(route.paramMap.get('id')!, 10);
        return !Vts.conforms(proposalId, Vts.isPositiveInteger)
            ? this.failWithWarning(`Invalid proposal id '${proposalId}'`)
            : this.store.dispatch(new FetchProposal(proposalId)).pipe(finalize(() => {
                if (!this.isProposalFetched()) {
                    this.failWithWarning(
                        `No proposal was found under id ${proposalId}`
                    );
                }
            }));        
    }

    private isProposalFetched() {
        return this.store.selectSnapshot(ProposalDetailsState.proposal) != null;
    }

    private failWithWarning(warningMessage: string) {
        this.store.dispatch(new Warning(warningMessage));
        this.store.dispatch(OpenHomePage);
    }
}
