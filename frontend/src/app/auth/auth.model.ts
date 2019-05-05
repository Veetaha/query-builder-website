import { Nullable               } from '@app/interfaces';
import { AssignConstructable    } from '@common/utils/obj/assign-constructable';
import { Client, ClientAndToken } from './interfaces';

export type AuthStateModel = AuthSnap | UnAuthSnap;

export class AuthSnap 
extends    AssignConstructable<ClientAndToken> 
implements ClientAndToken 
{
    readonly token!:  string;
    readonly client!: Client;
    readonly isFetchingClient = false;
    ensureCanAuthOrFail = () => { 
        throw new Error('client is already signed in.');
    }
    
    ensureCanSignOutOrFail = () => {};
    
}

export abstract class UnAuthSnap {
    abstract readonly token?: Nullable<string>;
    readonly client?  = null;
    abstract readonly isFetchingClient: boolean;
    abstract ensureCanAuthOrFail: () => void;
    
    ensureCanSignOutOrFail = () => {
        throw new Error("client is not signed in.");
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
        throw new Error("can't sign in, previous request is not ready.");
    }
}