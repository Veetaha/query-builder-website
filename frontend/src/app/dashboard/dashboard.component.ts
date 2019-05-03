import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AuthState } from '@app/auth/auth.state';
import { Client } from '@app/auth/interfaces';


@Component({
    selector:    'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls:  ['./dashboard.component.scss']
})
export class DashboardComponent {
    @Select(AuthState.client) client$!: Observable<Client>;
}