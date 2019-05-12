import { State, Action, StateContext } from '@ngxs/store';

import { NgxsUtilsService } from '@utils/ngxs/ngxs-utils.service';
import { SignIn           } from '../auth.actions';
import { SubmitSignInForm } from './sign-in.actions';
import { SignInStateModel as StateModel } from './sign-in.model';

type StateCtx = StateContext<StateModel>;

@State<StateModel>({
    name: 'signIn'
})
export class SignInState {

    constructor(
        private readonly ngxs: NgxsUtilsService
    ) {}

    @Action(SubmitSignInForm)
    submitSignInForm(ctx: StateCtx) {
        this.ensureCanSubmitOrFail(ctx);
        return ctx.dispatch(new SignIn(ctx.getState().model));
    }

    private ensureCanSubmitOrFail({getState}: StateCtx) {
        if (!this.ngxs.isFormValid(getState())) {
            throw new Error('Cannot submit invalid form');
        }
    }
}