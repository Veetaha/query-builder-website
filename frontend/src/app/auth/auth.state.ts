import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { State, Selector, StateContext, Action, NgxsOnInit } from '@ngxs/store';

import { Nullable                } from '@app/interfaces';
import { ClientAndToken          } from './interfaces';
import { SignInState             } from './sign-in/sign-in.state';
import { SignIn, SignUp, SignOut } from './auth.actions';
import { AuthService             } from './auth.service';
import { 
    AuthStateModel as StateModel, 
    FetchingClientSnap as FetchingClientStateSnap,
    StableUnAuthSnap,
    AuthSnap,
    FetchingClientSnap
} from './auth.model';

type StateCtx = StateContext<StateModel>;

@State<StateModel>({
    name: 'auth',
    children: [SignInState]
})
export class AuthState implements NgxsOnInit {

    constructor(
        private readonly auth:             AuthService,
        private readonly stableUnAuthSnap: StableUnAuthSnap
    ) {}

    @Selector() static client({client}: StateModel) { 
        console.log('Retreived client');
        return client;
    }

    @Selector() static token ({token}:  StateModel) { return token; }
    @Selector() static isFetchingClient(state: StateModel) { 
        return state.isFetchingClient; 
    }

    ngxsOnInit({ getState, setState }: StateCtx): void | any {
        const { token } = getState();
        if (token != null) {
            setState(new FetchingClientStateSnap(token));
            return this.auth.getMe().pipe(tap(client => setState(
                new AuthSnap({ token, client })
            )));
        } else {
            setState(this.stableUnAuthSnap);
        }
    }

    @Action(SignIn)
    signIn({getState, setState}: StateCtx, action: SignIn) {
        getState().ensureCanAuthOrFail();
        return this.fetchClient(setState, this.auth.signIn(action));
    }

    @Action(SignUp)
    signUp({setState, getState}: StateCtx, action: SignUp) {
        getState().ensureCanAuthOrFail();
        return this.fetchClient(setState, this.auth.signUp(action));
    }

    @Action(SignOut)
    signOut({getState, setState}: StateCtx) {
        getState().ensureCanSignOutOrFail();
        setState(this.stableUnAuthSnap);
    }

    private fetchClient(
        setState:    StateCtx['setState'], 
        userAndToken$: Observable<Nullable<ClientAndToken>>
    ) {
        setState(new FetchingClientSnap);
        return userAndToken$.pipe(tap(res => setState(
            res == null ? this.stableUnAuthSnap : new AuthSnap(res)
        )));
    }

}