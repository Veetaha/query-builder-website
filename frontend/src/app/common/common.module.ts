import { NgModule      } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { VeeModule     } from '@utils/vee/vee.module';
import { GraphQLModule } from '@app/gql/gql.module';

import { CommonNgxsModule    } from './common-ngxs.module';
import { CommonPrimeNgModule } from './common-prime-ng.module';



@NgModule({
    exports: [
        VeeModule,
        BrowserModule, 
        GraphQLModule,
        CommonNgxsModule, 
        CommonPrimeNgModule
    ]
})
export class CommonModule { }