import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AuthState } from '@app/auth/auth.state';


@Component({
    selector:    'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls:  ['./dashboard.component.scss']
})
export class DashboardComponent {
    @Select(AuthState.isSignedIn) isSignedIn$!: Observable<boolean>;
}