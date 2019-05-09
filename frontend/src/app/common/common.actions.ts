export class AwaitResponse {
    static readonly type = '[Common] AwaitResponse';
    constructor(readonly awaiting: boolean) {}
}
