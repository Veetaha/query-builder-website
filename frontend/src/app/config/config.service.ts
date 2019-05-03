import { Injectable          } from '@angular/core';
import { ApolloClientOptions } from 'apollo-client';
import { InMemoryCache       } from 'apollo-cache-inmemory';
import { HttpLink, HttpLinkHandler } from 'apollo-angular-link-http';
import { StorageOption, NgxsStoragePluginOptions } from '@ngxs/storage-plugin';
import { ModuleOptions as NgxsModuleOptions } from '@ngxs/store/src/module';

import { isDevelopmentMode   } from './environment';
import { NgxsDevtoolsOptions } from '@ngxs/devtools-plugin';


@Injectable({ providedIn: 'root' })
export class ConfigService {
    
    static readonly isDevelopmentMode = isDevelopmentMode;
    
    private readonly httpLinkHandler: HttpLinkHandler;

    constructor(httpLink: HttpLink) {
        this.httpLinkHandler = httpLink.create({ uri: '/gql' });
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