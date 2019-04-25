import 'passport';
import * as Express from 'express';

export interface ResolveContext {
    req: Express.Request;
}

export interface GetContextOpts {
    req: Express.Request;
    res: Express.Response;
}

export function getResolveContext({ req }: GetContextOpts): ResolveContext {
    return { req };
}