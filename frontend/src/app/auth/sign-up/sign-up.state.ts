import { State, Action, StateContext } from '@ngxs/store';

import { NgxsUtilsService } from '@utils/ngxs/ngxs-utils.service';
import { SignUp           } from '../auth.actions';
import { SubmitSignUpForm } from './sign-up.actions';
import { SignUpStateModel as StateModel } from './sign-up.model';

type StateCtx = StateContext<StateModel>;

@State<StateModel>({
    name: 'signUp'
})
export class SignUpState {

    constructor(
        private readonly ngxs: NgxsUtilsService
    ) {}

    @Action(SubmitSignUpForm)
    submitSignUpForm(ctx: StateCtx) {
        this.ensureCanSubmitOrFail(ctx);
        const { login, password, name } = ctx.getState().model;
        return ctx.dispatch(new SignUp({ credentials: { login, password }, name }));
    }

    private ensureCanSubmitOrFail(ctx: StateCtx) {
        if (!this.ngxs.isFormValid(ctx.getState())) {
            throw new Error('Cannot submit invalid form');
        }
    }
}