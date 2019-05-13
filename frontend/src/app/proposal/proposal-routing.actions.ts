import { Navigate } from '@ngxs/router-plugin';

export const OpenViewProposalsPage = new Navigate(['proposals']);

export class OpenProposalDetailsPage extends Navigate {
    constructor(proposalId: number) {
        super([`proposals`, proposalId]);
    }
}