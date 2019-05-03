import { Injectable } from '@angular/core';
import { map        } from 'rxjs/operators';


import * as Gql from '@app/gql/generated';
export * from '@app/gql/generated';

@Injectable({ providedIn: 'root' })
export class ProposalService {
    constructor(
        private readonly getProposalsPageGQL: Gql.GetProposalsPageGQL
    ) {}

    getProposalsPage(params: Gql.ProposalPaginationInput) {
        return this.getProposalsPageGQL
            .fetch({params})
            .pipe(map(v => v.data.getProposalsPage));
    }

}