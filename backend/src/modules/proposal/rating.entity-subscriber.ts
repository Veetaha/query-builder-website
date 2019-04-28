import _ from 'lodash';
import { 
    EntitySubscriberInterface, 
    Connection, 
    RemoveEvent, 
    UpdateEvent, 
    InsertEvent,
    EntityManager
} from 'typeorm';
import { Injectable       } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';

import { Rating } from '@modules/rating/rating.entity';


import { Proposal } from './proposal.entity';
import { ProposalRepo } from './proposal.repository';


@Injectable()
export class RatingEntitySubscriber implements EntitySubscriberInterface<Rating> {

    constructor(
        @InjectConnection() connection: Connection
    ) {
        connection.subscribers.push(this);
    }

    /**
     * @override implements `EntitySubscriberInterface<>`
     */
    listenTo() { return Rating; }

    /**
     * @override implements `EntitySubscriberInterface<>`
     */
    afterRemove(e: RemoveEvent<Rating>): Promise<any> | void {
        if (e.entity != null) {
            return this.decrement(
                e.manager, e.entityId.proposalId, this.getUpdColName(e.entity.liked)
            );
        }
    }

    /**
     * @override implements `EntitySubscriberInterface<>`
     */
    afterInsert({manager, entity}: InsertEvent<Rating>) {
        return this.increment(
            manager, entity.proposalId, this.getUpdColName(entity.liked)
        );  
    }



    /**
     * @override implements `EntitySubscriberInterface<>`
     */
    afterUpdate({entity, manager, updatedColumns}: UpdateEvent<Rating>): Promise<any> | void {
        if (entity != null && _.find(updatedColumns, ['propertyName', 'liked']) != null) {
            return manager
                .getCustomRepository(ProposalRepo)
                .switchLikes(entity.proposalId, entity.liked);
        } 
    }

   

    private getUpdColName(liked: boolean) {
        return liked ? 'likes' : 'dislikes';
    }

    private async decrement(manager: EntityManager, proposalId: number, prop: 'likes' | 'dislikes') {
        return manager.decrement(Proposal, { id: proposalId }, prop, 1);
    }

    private async increment(manager: EntityManager, proposalId: number, prop: 'likes' | 'dislikes') {
        return manager.increment(Proposal, { id: proposalId }, prop, 1);
    }
}