import { NgModule      } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { VeeModule     } from '@utils/vee/vee.module';
import { GraphQLModule } from '@app/gql/gql.module';

import { CommonNgxsModule    } from './common-ngxs.module';
import { CommonPrimeNgModule } from './common-prime-ng.module';
import { PaginationComponent } from './pagination/pagination.component';

import { PaginationSettingsComponent } 
from './pagination/settings/pagination-settings.component';


const reexports = [
    VeeModule,
    BrowserModule, 
    GraphQLModule,
    CommonNgxsModule, 
    CommonPrimeNgModule
];

@NgModule({
    imports: reexports,
    declarations: [
        PaginationComponent,
        PaginationSettingsComponent
    ],
    exports: [
        ...reexports,
        PaginationComponent,
        PaginationSettingsComponent
    ]
})
export class CommonModule { }