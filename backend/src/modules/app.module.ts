import { Module } from '@nestjs/common';

import { CommonModule } from '@modules/common';
import { UserModule   } from '@modules/user';
import { AuthModule   } from '@modules/auth';





@Module({
    imports: [
        CommonModule,
        UserModule,
        AuthModule
    ]
})
export class AppModule {}
