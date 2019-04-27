import { EntityRepository, Repository } from 'typeorm';

import { Proposal } from './proposal.entity';

@EntityRepository(Proposal)
export class ProposalRepo extends Repository<Proposal> {

}