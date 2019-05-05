import { Injectable          } from '@angular/core';

import { ApolloClientOptions } from 'apollo-client';
import { InMemoryCache       } from 'apollo-cache-inmemory';
import { HttpLink, HttpLinkHandler } from 'apollo-angular-link-http';

import { NgxsModule              } from '@ngxs/store';
import { NgxsDevtoolsOptions     } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginOptions } from '@ngxs/logger-plugin';
import { StorageOption, NgxsStoragePluginOptions } from '@ngxs/storage-plugin';

import { isDevelopmentMode   } from './environment';


type NgxsModuleOptions = NonNullable<Parameters<(typeof NgxsModule)['forRoot']>[1]>;


@Injectable({ providedIn: 'root' })
export class ConfigService {
    
    static readonly isDevelopmentMode = isDevelopmentMode;
    
    private readonly httpLinkHandler: HttpLinkHandler;

    constructor(httpLink: HttpLink) {
        this.httpLinkHandler = httpLink.create({ uri: '/gql' });
    }

    static createNgxsLoggerPluginOptions(): NgxsLoggerPluginOptions {
        return {
            disabled: !this.isDevelopmentMode
        };
    }

    static createNgxsDevtoolsPluginOptions(): NgxsDevtoolsOptions {
        return {
            disabled: !this.isDevelopmentMode            
        };
    }

    static createNgxsStoragePluginOptions(): NgxsStoragePluginOptions {
        return { 
            key:     'auth.token',
            storage: StorageOption.LocalStorage
        };
    }

    static createNgxsOptions(): NgxsModuleOptions {
        return {
            developmentMode: this.isDevelopmentMode
        };
    }

    createApolloClientOptions(): ApolloClientOptions<any> {
        return {
            link:  this.httpLinkHandler,
            cache: new InMemoryCache,
            defaultOptions: { query: { fetchPolicy: 'no-cache' } }
        };
    }
}