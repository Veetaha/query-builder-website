import { Module } from '@nestjs/common';
import { CommonModule       } from '@modules/common/common.module';
import { FrontendController } from './frontend.controller';

@Module({
    imports:     [CommonModule],
    controllers: [FrontendController]
})
export class FrontendModule {}