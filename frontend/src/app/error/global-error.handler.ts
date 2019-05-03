import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Store } from '@ngxs/store';
import { CriticalError } from './store/error.actions';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private readonly injector: Injector) { }

    handleError(err: unknown) {
        this.injector
            .get<Store>(Store)
            .dispatch(new CriticalError(err));
            
        throw err;
    }
}