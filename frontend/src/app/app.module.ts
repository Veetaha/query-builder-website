import { NgModule } from '@angular/core';

import { AppRoutingModule   } from './app-routing.module';
import { CommonModule       } from './common/common.module';
import { ErrorModule        } from './error/error.module';
import { AuthModule         } from './auth/auth.module';
import { AppComponent       } from './app.component';
import { HomeComponent      } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProposalModule     } from './proposal/proposal.module';

@NgModule({
    imports: [   
        CommonModule,
        ProposalModule,
        AuthModule,
        ErrorModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        HomeComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
