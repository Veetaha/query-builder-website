import { NgModule                    } from '@angular/core';
import { MarkdownModule,             } from 'ngx-markdown';
import { AngularMarkdownEditorModule } from 'angular-markdown-editor';


@NgModule({
    imports: [ 
        AngularMarkdownEditorModule.forRoot({ iconlibrary: 'fa' }),
        MarkdownModule.forRoot(),
    ],
    exports: [
        AngularMarkdownEditorModule,
        MarkdownModule
    ]
})
export class CommonMarkdownModule { }