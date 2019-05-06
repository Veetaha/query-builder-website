import { Injectable } from '@angular/core';
import { map        } from 'rxjs/operators';

import * as Gql from '@app/gql/generated';
import { PaginationService } from '@app/common/pagination/pagination-service.interface';

import { PaginatedProposal } from './interfaces';

type ProposalPaginationService = PaginationService<
    Gql.ProposalPaginationInput, PaginatedProposal
>;

@Injectable({ providedIn: 'root' })
export class ProposalService implements ProposalPaginationService {
    constructor(
        private readonly getProposalsPageGQL: Gql.GetProposalsPageGQL
    ) {}

    getPage(params: Gql.ProposalPaginationInput) {
        return this.getProposalsPageGQL
            .fetch({params})
            .pipe(map(v => v.data.getProposalsPage));
    }

}