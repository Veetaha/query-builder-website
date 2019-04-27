import { InputType } from 'type-graphql';


import { PaginationInput     } from '@utils/gql/pagination/pagination.input';
import { Proposal            } from '../proposal.entity';
import { ProposalFilterInput } from './proposal-filter.input';
import { ProposalSortInput   } from './proposal-sort.input';

@InputType()
export class ProposalPaginationInput extends PaginationInput({
    entity: Proposal,
    filter: ProposalFilterInput,
    sort:   ProposalSortInput
}) {}