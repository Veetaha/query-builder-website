import { AssignConstructable    } from '@common/utils/obj/assign-constructable';
import { Client, ClientAndToken } from './interfaces';
import { Injectable } from '@angular/core';
import { Nullable } from '@app/interfaces';

export type AuthStateModel = AuthSnap | UnAuthSnap;

export class AuthSnap 
extends    AssignConstructable<ClientAndToken> 
implements ClientAndToken 
{
    readonly token!:  string;
    readonly client!: Client;
    readonly isSignedIn       = true;
    readonly isFetchingClient = false;
    ensureCanAuthOrFail() { 
        throw new Error('client is already signed in.');
    }
    ensureCanSignOutOrFail() { }
    
}

export abstract class UnAuthSnap {
    abstract readonly token?: Nullable<string>;
    readonly client?    = null;
    readonly isSignedIn = false;
    abstract readonly isFetchingClient: boolean;
    abstract ensureCanAuthOrFail(): void;
    
    ensureCanSignOutOrFail() {
        throw new Error("client is not signed in.");
    }
} 

@Injectable({ providedIn: 'root' })
export class StableUnAuthSnap extends UnAuthSnap {
    readonly token            = null;
    readonly isFetchingClient = false;
    ensureCanAuthOrFail() { }
}

export class FetchingClientSnap extends UnAuthSnap {
    constructor(readonly token: Nullable<string> = null) { 
        super(); 
    }

    readonly isFetchingClient = true;
    ensureCanAuthOrFail() {
        throw new Error("can't sign in, previous request is not ready.");
    }
}