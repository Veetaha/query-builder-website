import { Component      } from '@angular/core';
import { Store          } from '@ngxs/store';
import { FormGroup, FormControl } from '@angular/forms';

import { limits } from '@common/constants';
import { OpenHomePage } from '@app/app.actions';

import { SubmitSignInForm } from './sign-in.actions';
import { AuthState } from '../auth.state';




@Component({
  selector:    'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls:  ['./sign-in.component.scss']
})
export class SignInComponent {
    constructor(private readonly store: Store) { }

    readonly limits = limits;
    readonly form = new FormGroup({
        login:    new FormControl(''),
        password: new FormControl('')
    });

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
