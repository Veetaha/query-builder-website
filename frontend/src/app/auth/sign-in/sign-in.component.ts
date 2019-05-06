import { Component             } from '@angular/core';
import { Store                  } from '@ngxs/store';
import { FormGroup, FormControl } from '@angular/forms';

import { limits } from '@common/constants';

import { SubmitSignInForm } from './sign-in.actions';
import { AbstractRouteGuardedComponent } from '../abstract-route-guarded.component';
import { LoggingService } from '@utils/logging.service';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector:    'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls:  ['./sign-in.component.scss']
})
export class SignInComponent extends AbstractRouteGuardedComponent {
    constructor(
        log:   LoggingService,
        store: Store,
        route: ActivatedRoute
    ) { 
        super(route, store, log); 
    }

    readonly limits = limits;
    readonly form = new FormGroup({
        login:    new FormControl(''),
        password: new FormControl('')
    });

    submitForm() {
        this.store.dispatch(SubmitSignInForm.instance);
    }
}
