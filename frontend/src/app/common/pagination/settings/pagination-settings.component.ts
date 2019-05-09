import _ from 'lodash';
import { Nullable  } from 'ts-typedefs';
import { Store     } from '@ngxs/store';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { Disposable   } from '@utils/disposable';

import { SortingOrder } from '@app/gql/generated';

import { PaginationStateClass } from '../pagination.state';
import { PaginationSortInput, MetaPaginationFilterInput } from '../pagination.model';

interface ToggleButtonOption {
    label: string;
}

interface FormValue {
    filter: {
        key?:  Nullable<ToggleButtonOption>;
    };
    sort: {
        isAscendingOrder: boolean;
        key?: Nullable<ToggleButtonOption>;
    };
}

@Component({
    selector:    'app-pagination-settings',
    templateUrl: './pagination-settings.component.html',
    styleUrls:   ['./pagination-settings.component.scss']
})
export class PaginationSettingsComponent extends Disposable implements OnInit {

    constructor(private readonly store: Store) {
        super();
    }

    @Input() state!: PaginationStateClass;
    /** only for init */
    @Input() readonly filterKeys!: string[];
    @Input() readonly sortKeys!:   string[];
    

    @Input() readonly debounceTime = 300;   // milliseconds
    @Input() readonly maxWait      = 3000;  // milliseconds

    fetchPageDebounced!: PaginationSettingsComponent['fetchPage'];

    searchQuery = new FormControl('');

    sortOptions:   Nullable<ToggleButtonOption[]>;
    filterOptions: Nullable<ToggleButtonOption[]>;

    form!: FormGroup;

    private getSortInput(sort: FormValue['sort']): Nullable<PaginationSortInput> {
        return {
            [sort.key == null ? this.sortKeys[0] : sort.key.label]: {
                ordering: SortingOrder[sort.isAscendingOrder ? 'Asc' : 'Desc']
            }
        };
    }

    private getMetaFitlerInput(
        {key}:      FormValue['filter'], 
        searchQuery: string
    ): Nullable<MetaPaginationFilterInput> {
        return {
            props: {
                [key == null ? this.filterKeys[0] : key.label]: {
                    ilike: `%${searchQuery}%`
                }
            }
        };
    }

    // TODO prevent excessive queries
    private fetchPage({
        formValue   = this.form.value,
        searchQuery = this.searchQuery.value
    }: { formValue?: FormValue, searchQuery?: string } = {}) {
        this.store.dispatch(new this.state.actions.patchInput({
            sort:   this.getSortInput(formValue.sort),
            filter: this.getMetaFitlerInput(formValue.filter, searchQuery)
        }));
    }


    private initSubscriptions() {
        this.addHandle(this.form.valueChanges.subscribe(
            (formValue: FormValue) => this.fetchPage({ formValue })
        ));
        this.addHandle(this.searchQuery.valueChanges.subscribe(
            (searchQuery: string) => this.fetchPageDebounced({ searchQuery })
        ));
    }

    private initDebounceMethod() {
        this.fetchPageDebounced = _.debounce(
            this.fetchPage,
            this.debounceTime,
            { trailing: true, maxWait: this.maxWait }
        );
    }

    private initFormControlls() {
        this.form = new FormGroup({
            filter: new FormGroup({ key: new FormControl }),
            sort: new FormGroup({
                isAscendingOrder:  new FormControl(true),
                key:               new FormControl
            })
        });
        this.filterOptions = this.filterKeys.map(label => ({label}));
        this.sortOptions   = this.sortKeys.map(label => ({label}));
    }

    ngOnInit() {
        this.initDebounceMethod();
        this.initFormControlls();
        this.initSubscriptions();
    }
}