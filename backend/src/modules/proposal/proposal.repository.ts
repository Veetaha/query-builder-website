import { EntityRepository, Repository } from 'typeorm';

import { Proposal } from './proposal.entity';

@EntityRepository(Proposal)
export class ProposalRepo extends Repository<Proposal> {

    async switchLikes(proposalId: number, liked: boolean) {
        return this
            .createQueryBuilder()
            .update()
            .set(liked ?
                { 
                    likes:    () => '"likes" + 1', 
                    dislikes: () => '"dislikes" - 1'
                } : {
                    likes:    () => '"likes" - 1', 
                    dislikes: () => '"dislikes" + 1'
                } 
             )
            .where({ id: proposalId })
            .execute();
    }
}