import { Component  } from '@angular/core';
import { Select     } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Nullable   } from '@app/interfaces';
import { ErrorState } from './store/error.state';

@Component({
    selector:    'app-error',
    templateUrl: './error.component.html',
    styleUrls:  ['./error.component.scss']
})
export class ErrorComponent {
    @Select(ErrorState.message) readonly errMessage$!: Observable<Nullable<string>>;
}