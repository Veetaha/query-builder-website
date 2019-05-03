import { Navigate } from '@ngxs/router-plugin';

export class CriticalError {
    static readonly type = "[Error] CriticalError";
    err: Error;
    constructor(message = 'some crical error') {
        this.err = new Error(message);
    }
}
export const OpenErrorPage = new Navigate(['/error']);