import { Module } from '@nestjs/common';

import { CommonModule   } from './common/common.module';
import { UserModule     } from './user/user.module';
import { AuthModule     } from './auth/auth.module';
import { ProposalModule } from './proposal/proposal.module';
import { RatingModule   } from './rating/rating.module';
import { FrontendModule } from './frontend/frontend.module';

@Module({
    imports: [
        CommonModule,
        UserModule,
        AuthModule,
        ProposalModule,
        RatingModule,
        FrontendModule
    ]
})
export class AppModule {}
