import { Injectable } from '@angular/core';
import { Store      } from '@ngxs/store';
import { map  } from 'rxjs/operators';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';


import { AuthState } from './auth.state';
import { UserRole } from '@app/gql/generated';
import { Nullable } from '@app/interfaces';
import { CriticalError } from '@app/error/store/error.actions';



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private readonly store: Store
    ) {}

    canActivate(route: ActivatedRouteSnapshot) {
        const allowedRoles: Nullable<UserRole[] | UserRole> = route.data.allow;
        const deniedRoles:  Nullable<UserRole[] | UserRole> = route.data.deny;

        return this.store.select(AuthState.client).pipe(
            // skip(Number(this.store.selectSnapshot(AuthState.isFetchingClient))),
            map(user => this.tryGrantAccess(
                user ? user.role : UserRole.Guest, 
                allowedRoles,
                deniedRoles
            ))
        );
    }

    private tryGrantAccess(
        userRole:     UserRole, 
        allowedRoles: Nullable<UserRole[] | UserRole>,
        deniedRoles:  Nullable<UserRole[] | UserRole>
    ) {
        if (deniedRoles  != null && deniedRoles.includes(userRole) ||
            allowedRoles != null && !allowedRoles.includes(userRole))
        {
            this.store.dispatch(
                new CriticalError('You have no rights to access this route')
            );
            return false;
        }

        return true;
    }
}