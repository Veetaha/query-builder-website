import { Injectable       } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { OrmUtilsService } from '@utils/orm/orm-utils.service';

import { RatingRepo            } from './rating.repository';
import { Rating                } from './rating.entity';
import { RatingPaginationInput } from './gql/rating-pagination.input';



@Injectable()
export class RatingService {

    constructor(
        @InjectRepository(Rating)
        private readonly repo: RatingRepo,
        private readonly orm:  OrmUtilsService
    ) {}

    /**
     * Returns a page of likes.
     * 
     * @param pageInput Pagination parameters to use.
     */
    async getPage(pageInput: RatingPaginationInput) {
        return this.orm.getPage(this.repo, pageInput);
    }

    /**
     * Creates or updates like in the database.
     * Pre: user under `raterLogin` and proposal under `proposalId` already exist
     * in the database. 
     */
    async setRating(raterLogin: string, proposalId: number, liked: boolean) {
        return this.repo.save(this.repo.create({liked, raterLogin, proposalId}));   
    }


    /**
     * Deletes like from the database. Proposal likes/dislikes count gets
     * automatically updated.
     */
    async delete(raterLogin: string, proposalId: number) {
        return this.orm.removeOne(this.repo, { raterLogin, proposalId });
    }
}