import { NgxsFormStateModel } from '@utils/ngxs/form.model';

export interface SignUpFormControlsStateModel {
    login:    string;
    password: string;
    name:     string;
}
export type SignUpStateModel = NgxsFormStateModel<SignUpFormControlsStateModel>;