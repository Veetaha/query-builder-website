import { OnInit         } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store          } from '@ngxs/store';

import { Disposable     } from '@utils/disposable';

import { OpenHomePage } from '@app/app.actions';

import { AuthState     } from './auth.state';
import { UserRoleLimit } from './user-role-limit.obj';
import { Warning } from '@app/error/error.actions';

export abstract class AbstractRouteGuardedComponent extends Disposable implements OnInit {

    constructor(
        protected readonly route: ActivatedRoute,
        protected readonly store: Store
    ) {
        super();
    }

    ngOnInit() {
        const routeRoleLimit = this.route.snapshot.data;
        if (UserRoleLimit.isUserRoleLimit(routeRoleLimit)) {
            this.addHandle(AuthState.selectClientRole(this.store).subscribe(
                clientRole => { 
                    if (!UserRoleLimit.obeysLimit(routeRoleLimit, clientRole)) {
                        this.store.dispatch(new Warning(
                            `Current client role no longer permits staying at this page.`
                        ));
                        this.store.dispatch(OpenHomePage);
                    }
                }
            ));  
        }
    }
}