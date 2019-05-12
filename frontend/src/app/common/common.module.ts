import { NgModule       } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import { MessageService } from 'primeng/api';

import { VeeModule     } from '@utils/vee/vee.module';
import { GraphQLModule } from '@app/gql/gql.module';

import { CommonMarkdownModule } from './common-markdown.module';
import { CommonNgxsModule     } from './common-ngxs.module';
import { CommonPrimeNgModule  } from './common-prime-ng.module';

import { PaginationComponent     } from './pagination/pagination.component';
import { UploadFileComponent     } from './upload-file/upload-file.component';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';

import { PaginationSettingsComponent } 
from './pagination/settings/pagination-settings.component';



const reexports = [
    VeeModule,
    BrowserModule, 
    GraphQLModule,
    CommonNgxsModule,   
    CommonPrimeNgModule,
    UcWidgetModule,
    CommonMarkdownModule
];

@NgModule({
    imports: [
        ...reexports
    ],
    declarations: [
        PaginationComponent,
        PaginationSettingsComponent,
        UploadFileComponent,
        MarkdownEditorComponent
    ],
    providers: [
        MessageService  
    ],
    exports: [
        ...reexports,
        PaginationComponent,
        PaginationSettingsComponent,
        UploadFileComponent,
        MarkdownEditorComponent
    ]
})
export class CommonModule { }