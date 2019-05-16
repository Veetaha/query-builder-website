import { NgModule        } from '@angular/core';
import { BrowserModule   } from '@angular/platform-browser';
import { UcWidgetModule  } from 'ngx-uploadcare-widget';
import { ClipboardModule } from 'ngx-clipboard';
import { MessageService, DialogService, ConfirmationService } from 'primeng/api';

import { VeeModule     } from '@utils/vee/vee.module';
import { GraphQLModule } from '@app/gql/gql.module';

import { CommonMarkdownModule } from './common-markdown.module';
import { CommonNgxsModule     } from './common-ngxs.module';
import { CommonPrimeNgModule  } from './common-prime-ng.module';

import { PaginationComponent     } from './pagination/pagination.component';
import { UploadImageComponent    } from './upload-image/upload-image.component';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';
import { PictureDialogComponent  } from './picture-dialog/picture-dialog.component';

import { PaginationSettingsComponent } 
from './pagination/settings/pagination-settings.component';



const reexports = [
    VeeModule,
    BrowserModule, 
    GraphQLModule,
    CommonNgxsModule,   
    CommonPrimeNgModule,
    UcWidgetModule,
    CommonMarkdownModule,
    ClipboardModule
];

@NgModule({
    imports: [
        ...reexports
    ],
    declarations: [
        PaginationComponent,
        PaginationSettingsComponent,
        UploadImageComponent,
        MarkdownEditorComponent,
        PictureDialogComponent
    ],
    providers: [
        MessageService,
        DialogService,
        ConfirmationService
    ],
    exports: [
        ...reexports,
        PaginationComponent,
        PaginationSettingsComponent,
        UploadImageComponent,
        MarkdownEditorComponent,
        PictureDialogComponent
    ],
    entryComponents: [
        PictureDialogComponent
    ]
})
export class CommonModule { }