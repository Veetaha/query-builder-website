import { createPaginationState } from '@app/common/pagination/pagination.state';

import { ProposalService } from '../proposal.service';

export const ViewProposalsState = createPaginationState({
    name:              'proposal',
    paginationService: ProposalService
});