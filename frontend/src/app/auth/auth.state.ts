import { tap, skip, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { State, Selector, StateContext, Action, NgxsOnInit, UpdateState, Store } from '@ngxs/store';


import { UserRole } from '@app/gql/generated';
import { Nullable } from '@app/interfaces';
import { Warning  } from '@app/error/error.actions';
import { Success, Info } from '@app/common/common.actions';

import { LoggingService } from '@utils/logging.service';

import { ClientAndToken, Client  } from './interfaces';
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
        private readonly store:     Store,
        private readonly auth:      AuthService,
        private readonly log:       LoggingService
    ) {}

    static selectEnsureClientIsAuthorizedOrFail(store: Store) {
        return this.selectClient(store).pipe(map(client => {
            if (client == null) {
                throw new Error('client is not authorized');
            }
        }));
    }

    static selectClientRole(store: Store) {
        return this.selectClient(store).pipe(map(
            client => client == null ? UserRole.Guest : client.role
        ));
    }

    static selectClient(store: Store) {
        return this.skipOneIfFetchingClient(store, store.select(this.clientSnap));
    }

    @Selector() static clientRoleSnap  (s: StateModel) { return this.getClientRole(s.client); } 
    @Selector() static token           (s: StateModel) { return s.token; }
    @Selector() static clientSnap      (s: StateModel) { return s.client; }
    @Selector() static isFetchingClient(s: StateModel) { return s.isFetchingClient; }

    private static skipOneIfFetchingClient<TValue>
    (store: Store, observable: Observable<TValue>) {
        return store.selectSnapshot(this.isFetchingClient) 
            ? observable.pipe(skip<TValue>(1))
            : observable;
    }

    private static getClientRole(client: Nullable<Client>) {
        return client == null ? UserRole.Guest : client.role;
    }

    ngxsOnInit() {
        this.log.info('ngxsOnInit() is now working!');
    }

    @Action(UpdateState)
    _ngxsOnInit({ getState, setState }: StateCtx): void | Observable<any> {
        
        this.log.warning('Using temporary workaround @Action(UpdateState) instead of ngxsOnInit()');

        const { token } = getState();
        if (token != null) {
            setState(new FetchingClientStateSnap(token));
            // you should subscribe to this observable when moving this code to ngxsOnInit()
            return this.auth.getMe().pipe(tap(
                client => setState(new AuthSnap({ token, client }))
            ));
        } else {
            setState(StableUnAuthSnap.instance);
        }
    }

    @Action(SignIn)
    signIn({getState, setState}: StateCtx, action: SignIn) {
        getState().ensureCanAuthOrFail();
        return this.fetchClient(setState, this.auth.signIn(action))
            .pipe(tap((res) => {
                if (res == null) {
                    this.store.dispatch(new Warning(
                        `Failed to sign in, probably invalid credentials.`
                    ));
                } else {
                    this.store.dispatch(new Success(
                        `Signed in under name '${res.client.name}'`,
                        'Successfully signed in'
                    ));
                }
            }));
    }

    @Action(SignUp)
    signUp({setState, getState}: StateCtx, action: SignUp) {
        getState().ensureCanAuthOrFail();
        return this.fetchClient(setState, this.auth.signUp(action))
            .pipe(tap((res) => {
                if (res == null) {
                    this.store.dispatch(new Warning(
                        `Failed to sign up, login '${action.credentials.login
                        }' is probably already taken.`
                    ));
                } else {
                    this.store.dispatch(new Success(
                        `Signed up under name '${res.client.name}'`,
                        'Successfully signed up'
                    ));
                }
            }));
    }

    @Action(SignOut)
    signOut({getState, setState}: StateCtx) {
        getState().ensureCanSignOutOrFail();
        setState(StableUnAuthSnap.instance);
        this.store.dispatch(new Info(
            `Sign in again to get access to your account.`, 
            'You are signed out'
        ));
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