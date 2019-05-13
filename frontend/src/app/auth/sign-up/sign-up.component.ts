import _ from 'lodash';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store     } from '@ngxs/store';

import { OpenHomePage } from '@app/app.actions';
import { limits       } from '@common/constants';

import { AuthState        } from '../auth.state';
import { AuthFormService  } from '../auth-form.service';
import { SubmitSignUpForm } from './sign-up.actions';


@Component({
    selector:    'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls:  ['./sign-up.component.scss']
})
export class SignUpComponent {
    readonly isFetchingClient$ = this.store.select(AuthState.isFetchingClient);
    readonly limits = limits;
    readonly form: FormGroup;

    constructor(
        private readonly store: Store,
        authForms: AuthFormService
    ) { 
        this.form = new FormGroup({
            login:    authForms.createLoginFormControl(''),
            password: authForms.createPasswordFormControl(''),
            name:     authForms.createNameFormControl('')
        });
    }

    submitForm() {
        this.store
            .dispatch(SubmitSignUpForm.instance)
            .subscribe(() => {
                if (this.store.selectSnapshot(AuthState.clientSnap) != null) {
                    this.store.dispatch(OpenHomePage);
                }   
            }, _.noop);
    }

}
