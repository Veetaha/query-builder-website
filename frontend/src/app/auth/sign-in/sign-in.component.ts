import { Component  } from '@angular/core';
import { Select     } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Nullable  } from '@app/interfaces';
import { AuthState } from '../auth.state';
import { Client    } from '../interfaces';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector:    'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls:  ['./sign-in.component.scss']
})
export class SignInComponent {
    @Select(AuthState.client) client$!: Observable<Nullable<Client>>;

    form = new FormGroup({
        login:    new FormControl(''),
        password: new FormControl('')
    });

    onSubmit() {

    }
}
