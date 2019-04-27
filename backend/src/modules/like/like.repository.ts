import { 
    EntityRepository, 
    Repository
} from 'typeorm';

import { Like } from './like.entity';
import { Rating } from './gql/rating.object';

@EntityRepository(Like)
export class LikeRepo extends Repository<Like> {

    async getRatingOfProposal(proposalId: number) {
        const [likes, total] = await this.manager.transaction(
            async transMgr => Promise.all([
                transMgr.count(Like, { where: { proposalId, liked: true }}),
                transMgr.count(Like, { where: { proposalId } })
            ])
        );
        return total === 0 ? null : new Rating({ likes, dislikes: total - likes });
    }
}