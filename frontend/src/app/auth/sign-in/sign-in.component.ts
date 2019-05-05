import { Component, OnInit      } from '@angular/core';
import { Store                  } from '@ngxs/store';
import { FormGroup, FormControl } from '@angular/forms';

import { limits           } from '@common/constants';
import { Disposable       } from '@utils/disposable';
import { SubmitSignInForm } from './sign-in.actions';
import { AuthState        } from '../auth.state';
import { OpenHomePage } from '@app/store/app.actions';
import { UserRole } from '@app/gql/generated';




@Component({
  selector:    'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls:  ['./sign-in.component.scss']
})
export class SignInComponent extends Disposable implements OnInit {
    constructor(private readonly store: Store) { super(); }

    readonly limits = limits;
    readonly form = new FormGroup({
        login:    new FormControl(''),
        password: new FormControl('')
    });

    ngOnInit() {
        this.addHandle(AuthState.selectClientRole(this.store).subscribe(
            role => { if (role !== UserRole.Guest) this.store.dispatch(OpenHomePage); }
        ));
    }

    submitForm() {
        this.store.dispatch(SubmitSignInForm.instance);
    }


}
