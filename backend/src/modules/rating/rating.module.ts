import { Module        } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule   } from '@modules/common/common.module';
import { ProposalModule } from '@modules/proposal/proposal.module';
import { UserModule     } from '@modules/user/user.module';

import { Rating         } from './rating.entity';
import { RatingRepo     } from './rating.repository';
import { RatingService  } from './rating.service';
import { RatingResolver } from './rating.resolver';



@Module({
    imports: [
        CommonModule,
        UserModule,
        ProposalModule,
        TypeOrmModule.forFeature([Rating, RatingRepo])
    ],
    providers: [RatingService, RatingResolver],
    exports:   [RatingService]
})
export class RatingModule {}