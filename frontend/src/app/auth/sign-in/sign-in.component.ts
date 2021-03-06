import { Component  } from '@angular/core';
import { Store      } from '@ngxs/store';
import { FormGroup  } from '@angular/forms';

import { limits       } from '@common/constants';
import { OpenHomePage } from '@app/app.actions';

import { SubmitSignInForm } from './sign-in.actions';
import { AuthState        } from '../auth.state';
import { AuthFormService  } from '../auth-form.service';




@Component({
  selector:    'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls:  ['./sign-in.component.scss']
})
export class SignInComponent {
    readonly isFetchingClient$ = this.store.select(AuthState.isFetchingClient);
    readonly limits = limits;
    readonly form: FormGroup;

    constructor(
        private readonly store: Store,
        authForms: AuthFormService
    ) { 
        this.form = new FormGroup({
            login:    authForms.createLoginFormControl(''),
            password: authForms.createPasswordFormControl('')
        });
    }

    submitForm() {
        this.store
            .dispatch(SubmitSignInForm.instance)
            .subscribe(() => {
                if (this.store.selectSnapshot(AuthState.clientSnap) != null) {
                    this.store.dispatch(OpenHomePage);
                }
            });
    }
}
