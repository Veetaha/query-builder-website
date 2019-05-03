import { NgModule          } from '@angular/core';
import { NgxsModule        } from '@ngxs/store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CommonModule         } from '@app/common/common.module';
import { AuthRoutingModule    } from './auth-routing.module';
import { AuthState            } from './auth.state';
import { SignInState          } from './sign-in/sign-in.state';
import { SignInComponent      } from './sign-in/sign-in.component';
import { AuthTokenInterceptor } from './auth-token.interceptor';

@NgModule({
    imports: [ 
        CommonModule,
        NgxsModule.forFeature([SignInState, AuthState])
    ],
    exports: [
        AuthRoutingModule
    ],
    providers: [
        { 
            provide:  HTTP_INTERCEPTORS, 
            useClass: AuthTokenInterceptor, 
            multi:    true 
        },
    ],
    declarations: [SignInComponent]
})
export class AuthModule {}