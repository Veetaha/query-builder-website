import _ from 'lodash';
import { Nullable  } from 'ts-typedefs';
import { Store     } from '@ngxs/store';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { Disposable } from '@utils/disposable';

import { PaginationStateClass } from '../pagination.state';

@Component({
    selector:    'app-pagination-settings',
    templateUrl: './pagination-settings.component.html',
    styleUrls:   ['./pagination-settings.component.scss']
})
export class PaginationSettingsComponent extends Disposable implements OnInit {

    constructor(private readonly store: Store) {
        super();
    }

    @Input('state') PaginationState!: PaginationStateClass;

    sortOptions:   Nullable<{ label: string }[]>;
    filterOptions: Nullable<{ label: string }[]>;

    form = new FormGroup({});
    updateCurrentPageDebounced!: PaginationSettingsComponent['updateCurrentPageImmediate'];

    getNgxsFormName() {
        return `${this.PaginationState.stateName}.settingsForm`;
    }

    updateCurrentPageImmediate() {
        this.store.dispatch(this.PaginationState.actions.UpdateCurrentPage.instance);
    }


    private initDebounceMethod(debounceTime: number, maxWait: number) {
        this.updateCurrentPageDebounced = _.debounce(
            this.updateCurrentPageImmediate,
            debounceTime,
            { trailing: true, maxWait }
        );
    }
    private initFormControlls() {
        this.addHandle(this.store.select(this.PaginationState.filterKeys).subscribe(
            filterKeys => {
                console.log('updating filter keys'); // TODO remove
                if (filterKeys == null) {
                    return this.form.removeControl('filter');
                }
                this.form.setControl('filter', new FormGroup({
                    value: new FormControl(''),
                    key:   new FormControl(filterKeys[0])
                }));
                this.filterOptions = this.createOptions(filterKeys);
            }
        ));
        this.addHandle(this.store.select(this.PaginationState.sortKeys).subscribe(
            sortKeys => {
                if (sortKeys == null) {
                    return this.form.removeControl('sort');
                }
                this.form.setControl('sort', new FormGroup({
                    isAscendingOrder:  new FormControl(true),
                    key:               new FormControl(sortKeys[0]),
                }));
                this.sortOptions = this.createOptions(sortKeys);
            }
        ));
    }

    private createOptions(options: string[]) {
        return options.map(option => ({ label: option }));
    }


    ngOnInit() {
        this.initDebounceMethod(
            this.store.selectSnapshot(this.PaginationState.debounceTime),
            this.store.selectSnapshot(this.PaginationState.maxWait)
        );
        this.initFormControlls();
    }
}