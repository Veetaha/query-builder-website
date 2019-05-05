import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserRole } from '@app/gql/generated';

import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuard       } from './auth.guard';
import { allow           } from './user-role-limit.obj';

const canActivate = [AuthGuard];

const routes: Routes = [
    { 
        path:      'sign-in', 
        component: SignInComponent,
        data:      allow(UserRole.Guest),
        canActivate
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }