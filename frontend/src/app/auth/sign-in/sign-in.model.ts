import { NgxsFormStateModel } from '@utils/ngxs/form.model';

export interface SignInFormControlsStateModel {
    login:    string;
    password: string;
}
export type SignInStateModel = NgxsFormStateModel<SignInFormControlsStateModel>;