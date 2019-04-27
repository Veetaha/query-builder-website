import { Module        } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule   } from '@modules/common/common.module';
import { ProposalModule } from '@modules/proposal/proposal.module';
import { UserModule     } from '@modules/user/user.module';
import { Like           } from './like.entity';
import { LikeRepo       } from './like.repository';
import { LikeService    } from './like.service';
import { LikeResolver   } from './like.resolver';



@Module({
    imports: [
        CommonModule,
        UserModule,
        ProposalModule,
        TypeOrmModule.forFeature([Like, LikeRepo])
    ],
    providers: [LikeService, LikeResolver],
    exports:   [LikeService]
})
export class LikeModule {}