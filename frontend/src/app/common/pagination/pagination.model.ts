import { Nullable } from 'ts-typedefs';

import { NgxsFormStateModel } from '@utils/ngxs/form.model';

import { Page } from './pagination.interface';

export interface PaginationFilterFormStateModel {
    readonly key:   string;
    readonly value: string;
}

export interface PaginationSortFormStateModel {
    readonly key:              string;
    readonly isAscendingOrder: boolean;
}

export interface PaginationFormStateModel {
    readonly filter: Nullable<PaginationFilterFormStateModel>;
    readonly sort:   Nullable<PaginationSortFormStateModel>;
}

export interface PaginationStateModel<TItems> {
    readonly limit:        number;
    readonly offset:       number;
    readonly maxWait:      number;
    readonly debounceTime: number;
    readonly sortKeys?:    Nullable<string[]>;
    readonly filterKeys?:  Nullable<string[]>;
    readonly settingsForm: NgxsFormStateModel<PaginationFormStateModel>;
    readonly currentPage?: Nullable<Page<TItems>>;
}