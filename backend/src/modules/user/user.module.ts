import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from '@modules/common';
import { AuthModule   } from '@modules/auth';
import { UserService  } from './user.service';
import { UserResolver } from './user.resolver';
import { UserRepo     } from './user.repository';
import { User         } from './user.entity';



@Module({
    imports: [
        CommonModule,
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([User, UserRepo])
    ],
    providers: [UserService, UserResolver],
    exports:   [UserService]
})
export class UserModule {}
