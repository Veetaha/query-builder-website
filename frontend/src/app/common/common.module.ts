import { NgModule       } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';

import { VeeModule     } from '@utils/vee/vee.module';
import { GraphQLModule } from '@app/gql/gql.module';

import { CommonNgxsModule    } from './common-ngxs.module';
import { CommonPrimeNgModule } from './common-prime-ng.module';
import { PaginationComponent } from './pagination/pagination.component';

import { PaginationSettingsComponent } 
from './pagination/settings/pagination-settings.component';
import { MessageService } from 'primeng/api';


const reexports = [
    VeeModule,
    BrowserModule, 
    GraphQLModule,
    CommonNgxsModule,   
    CommonPrimeNgModule
];

@NgModule({
    imports: [
        ...reexports,
        MarkdownModule.forRoot()
    ],
    declarations: [
        PaginationComponent,
        PaginationSettingsComponent
    ],
    providers: [
        MessageService  
    ],
    exports: [
        ...reexports,
        MarkdownModule,
        PaginationComponent,
        PaginationSettingsComponent
    ]
})
export class CommonModule { }