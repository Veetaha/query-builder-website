import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule  } from 'primeng/button';

@NgModule({
    exports: [
        BrowserAnimationsModule,
        ButtonModule,
        ToolbarModule
    ]
})
export class CommonPrimeNgModule { }