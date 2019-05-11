import { NgModule       } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { UcWidgetModule } from 'ngx-uploadcare-widget';

import { VeeModule     } from '@utils/vee/vee.module';
import { GraphQLModule } from '@app/gql/gql.module';

import { CommonNgxsModule    } from './common-ngxs.module';
import { CommonPrimeNgModule } from './common-prime-ng.module';
import { PaginationComponent } from './pagination/pagination.component';
import { UploadFileComponent } from './upload-file/upload-file.component';

import { PaginationSettingsComponent } 
from './pagination/settings/pagination-settings.component';
import { MessageService } from 'primeng/api';


const reexports = [
    VeeModule,
    BrowserModule, 
    GraphQLModule,
    CommonNgxsModule,   
    CommonPrimeNgModule,
    UcWidgetModule
];

@NgModule({
    imports: [
        ...reexports,
        MarkdownModule.forRoot()
    ],
    declarations: [
        PaginationComponent,
        PaginationSettingsComponent,
        UploadFileComponent
    ],
    providers: [
        MessageService  
    ],
    exports: [
        ...reexports,
        MarkdownModule,
        PaginationComponent,
        PaginationSettingsComponent,
        UploadFileComponent
    ]
})
export class CommonModule { }