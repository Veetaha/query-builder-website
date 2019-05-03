import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserRole } from '@app/gql/generated';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuard } from './auth.guard';

const canActivate = [AuthGuard];

const routes: Routes = [
    { 
        path:      'auth/sign-in', 
        component: SignInComponent,
        data: { deny: [ UserRole.Admin, UserRole.Regular ]},
        canActivate
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }