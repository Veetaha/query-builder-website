import { NgModule                      } from '@angular/core';
import { BrowserModule                 } from '@angular/platform-browser';
import { NgxsModule                    } from '@ngxs/store';
import { NgxsFormPluginModule          } from '@ngxs/form-plugin';
import { NgxsRouterPluginModule        } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule       } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ConfigService } from '@app/config/config.service';
import { GraphQLModule } from '@app/gql/gql.module';



@NgModule({
    declarations: [],
    imports: [
        BrowserModule, 
        GraphQLModule,
        FormsModule,
        ReactiveFormsModule,
        NgxsModule
            .forRoot([], ConfigService.createNgxsOptions()),
        NgxsRouterPluginModule
            .forRoot(),
        NgxsFormPluginModule
            .forRoot(),
        NgxsStoragePluginModule
            .forRoot(ConfigService.createNgxsStoragePluginOptions()),
        NgxsReduxDevtoolsPluginModule
            .forRoot(ConfigService.createNgxsDevtoolsPluginOptions())
    ],
    exports: [
        BrowserModule, 
        FormsModule,
        ReactiveFormsModule,
        NgxsModule, 
        GraphQLModule,
        NgxsFormPluginModule
    ]
})
export class CommonModule { }