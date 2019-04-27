import 'passport';
import * as Express from 'express';
import { GraphQLDatabaseLoader } from 'typeorm-loader';
import { getConnection } from 'typeorm';

export interface ResolveContext {
    req:        Express.Request;
    dataLoader: GraphQLDatabaseLoader;
}

export interface GetContextOpts {
    req: Express.Request;
    res: Express.Response;
}

export function getResolveContext({ req }: GetContextOpts): ResolveContext {
    return { 
        req, 
        dataLoader: 
        new GraphQLDatabaseLoader(getConnection()) 
    };
}