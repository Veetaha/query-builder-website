import { Nullable               } from '@app/interfaces';
import { Client, ClientAndToken } from './interfaces';

export type AuthStateModel = AuthSnap | UnAuthSnap;

export class AuthSnap implements ClientAndToken {
    readonly token!:  string;
    readonly client!: Client;
    readonly isFetchingClient = false;
    
    constructor({client, token}: Readonly<ClientAndToken>) {
        this.client = client;
        this.token = token;
    }

    ensureCanAuthOrFail = () => { 
        throw new Error('Client is already signed in.');
    }
    
    ensureCanSignOutOrFail = () => {};

    
}

export abstract class UnAuthSnap {
    abstract readonly token?: Nullable<string>;
    readonly client?  = null;
    abstract readonly isFetchingClient: boolean;
    abstract ensureCanAuthOrFail: () => void;
    
    ensureCanSignOutOrFail = () => {
        throw new Error("Client is not signed in.");
    }
} 


export class StableUnAuthSnap extends UnAuthSnap {
    static readonly instance = new StableUnAuthSnap;

    readonly token            = null;
    readonly isFetchingClient = false;
    ensureCanAuthOrFail = () => {};

    private constructor() { super(); }
}

export class FetchingClientSnap extends UnAuthSnap {
    constructor(readonly token: Nullable<string> = null) { 
        super(); 
    }

    readonly isFetchingClient = true;
    ensureCanAuthOrFail = () => {
        throw new Error("Can't sign in, previous request is not ready.");
    }
}