import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { State, Selector, StateContext, Action, NgxsOnInit, UpdateState } from '@ngxs/store';

import { Nullable                } from '@app/interfaces';
import { ClientAndToken          } from './interfaces';
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
    name: 'auth'
})
export class AuthState implements NgxsOnInit {

    constructor(
        private readonly auth: AuthService
    ) {}

    @Selector() static client    ({client}:     StateModel) { return client; }
    @Selector() static isSignedIn({isSignedIn}: StateModel) { return isSignedIn; }
    @Selector() static token     ({token}:      StateModel) { return token; }
    @Selector() static isFetchingClient(state: StateModel) { 
        return state.isFetchingClient; 
    }

    ngxsOnInit() {
        console.log('ngxsOnInit() is now working!');
    }

    @Action(UpdateState)
    _ngxsOnInit({ getState, setState }: StateCtx) {
        console.log('Using temporary workaround @Action(UpdateState) instead of ngxsOnInit()');
        const { token } = getState();
        if (token != null) {
            setState(new FetchingClientStateSnap(token));
            this.auth
                .getMe()
                .subscribe(client => setState(new AuthSnap({ token, client })));
        } else {
            setState(StableUnAuthSnap.instance);
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
        setState(StableUnAuthSnap.instance);
    }

    private fetchClient(
        setState:    StateCtx['setState'], 
        userAndToken$: Observable<Nullable<ClientAndToken>>
    ) {
        setState(new FetchingClientSnap);
        return userAndToken$.pipe(tap(res => setState(
            res == null ? StableUnAuthSnap.instance : new AuthSnap(res)
        )));
    }

}