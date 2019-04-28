import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from '@modules/common/common.module';
import { UserModule   } from '@modules/user/user.module';
import { AuthModule   } from '@modules/auth/auth.module';

import { ProposalService        } from './proposal.service';
import { ProposalRepo           } from './proposal.repository';
import { Proposal               } from './proposal.entity';
import { ProposalResolver       } from './proposal.resolver';
import { RatingEntitySubscriber } from './rating.entity-subscriber';




@Module({
    imports: [
        CommonModule,
        UserModule,
        AuthModule,
        TypeOrmModule.forFeature([Proposal, ProposalRepo])
    ],
    providers: [ProposalService, ProposalResolver, RatingEntitySubscriber],
    exports:   [ProposalService]
})
export class ProposalModule {}
