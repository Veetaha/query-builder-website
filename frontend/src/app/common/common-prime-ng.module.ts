import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ToolbarModule         } from 'primeng/toolbar';
import { ButtonModule          } from 'primeng/button';
import { DropdownModule        } from 'primeng/dropdown';
import { PasswordModule        } from 'primeng/password';
import { PaginatorModule       } from 'primeng/paginator';
import { ToggleButtonModule    } from 'primeng/togglebutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule     } from 'primeng/progressbar';
import { PanelModule           } from 'primeng/panel';
import { ToastModule           } from 'primeng/toast';
import { CardModule            } from 'primeng/card';
import { InputTextModule       } from 'primeng/inputtext';
import { InputTextareaModule   } from 'primeng/inputtextarea';
import { InputSwitchModule     } from 'primeng/inputswitch';

@NgModule({
    exports: [
        BrowserAnimationsModule,
        ToolbarModule,
        ButtonModule,
        DropdownModule,
        PasswordModule,
        PaginatorModule,
        ToggleButtonModule,
        ProgressSpinnerModule,
        ProgressBarModule,
        PanelModule,
        ToastModule,
        CardModule,
        InputTextModule,
        InputTextareaModule,
        InputSwitchModule
    ]
})
export class CommonPrimeNgModule { }