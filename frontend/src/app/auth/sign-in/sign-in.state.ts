import { State } from '@ngxs/store';
import { SignInStateModel as StateModel } from './sign-in.model';

// type StateCtx = StateContext<StateModel>;

@State<StateModel>({
    name: 'signIn'
})
export class SignInState {



}