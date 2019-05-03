import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store      } from '@ngxs/store';

import { AuthState } from './auth.state';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

    constructor(private readonly store: Store) {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler) {
        const token = this.store.selectSnapshot(AuthState.token);
        return next.handle(token != null
            ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
            : req
        );
    }
}