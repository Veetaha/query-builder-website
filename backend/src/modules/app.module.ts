import { Module } from '@nestjs/common';

import { CommonModule   } from '@modules/common/common.module';
import { UserModule     } from '@modules/user/user.module';
import { AuthModule     } from '@modules/auth/auth.module';
import { ProposalModule } from '@modules/proposal/proposal.module';
import { RatingModule   } from '@modules/rating/rating.module';

@Module({
    imports: [
        CommonModule,
        UserModule,
        AuthModule,
        ProposalModule,
        RatingModule
    ]
})
export class AppModule {}
