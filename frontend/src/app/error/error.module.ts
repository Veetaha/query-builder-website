import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { GlobalErrorHandler } from './global-error.handler';
import { ErrorRoutingModule } from './error.routing.module';
import { NgxsModule } from '@ngxs/store';
import { ErrorState } from './store/error.state';

@NgModule({
    imports: [
        CommonModule,
        ErrorRoutingModule,
        NgxsModule.forFeature([ErrorState])
    ],
    providers: [
        {
            provide:  ErrorHandler, 
            useClass: GlobalErrorHandler
        }
    ],
    declarations: [ErrorComponent],
    exports:      [
        ErrorRoutingModule,
        ErrorComponent
    ]
})
export class ErrorModule {}