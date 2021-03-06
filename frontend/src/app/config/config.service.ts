import { Injectable      } from '@angular/core';
import { Message         } from 'primeng/api';
import { EditorOption    } from 'angular-markdown-editor';
import { MarkdownService } from 'ngx-markdown';

import { ApolloClientOptions } from 'apollo-client';
import { InMemoryCache       } from 'apollo-cache-inmemory';
import { HttpLink, HttpLinkHandler } from 'apollo-angular-link-http';

import { NgxsModule              } from '@ngxs/store';
import { NgxsDevtoolsOptions     } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginOptions } from '@ngxs/logger-plugin';
import { StorageOption, NgxsStoragePluginOptions } from '@ngxs/storage-plugin';

import { isDevelopmentMode   } from './environment';
// import introspectionQueryResultData from '@common/fragment-types.json';

type NgxsModuleOptions = NonNullable<Parameters<(typeof NgxsModule)['forRoot']>[1]>;

// @dynamic
@Injectable({ providedIn: 'root' })
// @dynamic
export class ConfigService {

    static readonly isDevelopmentMode = isDevelopmentMode;
    
    readonly uploadcarePublicApiKey = '93d19e223c7ee0f0581a';
    
    private readonly httpLinkHandler: HttpLinkHandler;
    
    readonly defaultToastOptions: Partial<Message> = {
        life: 4000
    };

    readonly markdownEditorOptions: EditorOption;
    

    constructor(
        httpLink: HttpLink, 
        markdown: MarkdownService
    ) {
        this.httpLinkHandler = httpLink.create({ uri: '/gql' });
        this.markdownEditorOptions = {
            parser: input => markdown.compile(input.trim())
        };
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
            cache: new InMemoryCache(
                // fragmentMatcher: new IntrospectionFragmentMatcher({
                //     introspectionQueryResultData
                // }),
            ), 
            defaultOptions: { query: { fetchPolicy: 'no-cache' } }
        };
    }
}