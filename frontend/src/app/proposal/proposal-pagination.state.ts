import { createPaginationState } from '@app/common/pagination/pagination.state';

import { ProposalService } from './proposal.service';

export const ProposalPaginationState = createPaginationState({
    name:              'proposal',
    paginationService: ProposalService,
    filterKeys: [
        'name',

    ],
    sortKeys: [
        'name'
    ]
});