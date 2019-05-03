import { Navigate } from '@ngxs/router-plugin';

export class CriticalError {
    static readonly type = "[Error] CriticalError";
    err: Error;
    constructor(err: unknown = 'some crical error') {
        this.err = err instanceof Error ? err : new Error(
            `Non-error object was thrown: ${err}`
        );
    }
}
export const OpenErrorPage = new Navigate(['/error']);