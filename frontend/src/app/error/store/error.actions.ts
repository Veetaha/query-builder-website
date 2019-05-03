import { Navigate } from '@ngxs/router-plugin';
import { isDevelopment } from 'apollo-utilities';

export class CriticalError {
    static readonly type = "[Error] CriticalError";
    readonly message: string;
    constructor(err: unknown = 'some critical error') {
        this.message = typeof err === 'string' ? 
            err                            :
            err instanceof Error           ? 
            this.getErrMessage(err)        :
            `Non-error object was thrown: ${err}`;
    }

    private getErrMessage(err: Error) {
        return !isDevelopment || err.stack == null ? err.message : err.stack;
    }
}
export const OpenErrorPage = new Navigate(['/error']);