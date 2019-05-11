import _ from 'lodash';
import { Nullable   } from 'ts-typedefs';
import { Observable } from 'rxjs';
import { Store      } from '@ngxs/store';
import { Component, OnInit, Input } from '@angular/core';


import { PaginationStateClass } from './pagination.state';



@Component({
    selector:    'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls:   ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    limit$!:  Observable<number>;
    offset$!: Observable<number>;
    total$!:  Observable<Nullable<number>>;

    @Input() state!: PaginationStateClass;
    @Input() filterKeys!: string[];
    @Input() sortKeys!:   string[];


    constructor(private readonly store: Store) {

    }

    updateLimitAndOffset(limit: number, offset: number) {
        this.store.dispatch(new this.state.actions.patchInput({
            limit,
            offset
        }));
    }

    ngOnInit() {
        this.limit$  = this.store.select(this.state.limit);
        this.offset$ = this.store.select(this.state.offset);
        this.total$  = this.store.select(this.state.total);
    }

}