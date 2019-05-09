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
        private readonly getProposalsPageGQL: Gql.GetProposalsPageGQL,
        private readonly getProposalByIdGQL:  Gql.GetProposalByIdGQL,
        private readonly rateProposalGQL:     Gql.RateProposalGQL,
        private readonly updateProposalGQL:   Gql.UpdateProposalGQL
    ) {}

    getPage(params: Gql.ProposalPaginationInput) {
        return this.getProposalsPageGQL
            .fetch({params})
            .pipe(map(v => v.data.getProposalsPage));
    }

    getProposalById(id: number) {
        return this.getProposalByIdGQL
            .fetch({ id })
            .pipe(map(v => v.data.getProposalById));
    }

    rateProposal(params: Gql.RateProposalMutationVariables) {
        return this.rateProposalGQL
            .mutate(params)
            .pipe(map(v => v.data!.rateProposal));
    }

    updateProposal(params: Gql.ProposalUpdateInput) {
        return this.updateProposalGQL
            .mutate({ params })
            .pipe(map(v => v.data!.updateProposal));
    }
}