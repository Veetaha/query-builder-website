import { Obj, Nullable } from 'ts-typedefs';

import { 
    SortingOrder, 
    StringFilterInput, 
    IntFilterInput,
    BooleanFilterInput,
    DateFilterInput
} from '@app/gql/generated';

export type FilterInput = (
    | StringFilterInput
    | IntFilterInput
    | BooleanFilterInput
    | DateFilterInput
);

export interface SortInput {
    ordering?: Nullable<SortingOrder>;
}

export type PaginationSortInput<TKeys extends string = string> = (
    Obj<Nullable<SortInput>, TKeys>
);

export type PaginationFilterInput<TKeys extends string = string> = (
    Obj<Nullable<FilterInput>, TKeys>
);

export interface MetaPaginationFilterInput
<TPaginationFilterInput extends PaginationFilterInput = PaginationFilterInput>{
    props: TPaginationFilterInput;
}
export interface PaginationInput<
    TFilterInput extends PaginationFilterInput = PaginationFilterInput,
    TSortInput   extends PaginationSortInput   = PaginationSortInput   
> {
    limit:   number;
    offset:  number;
    filter?: Nullable<MetaPaginationFilterInput<TFilterInput>>;
    sort?:   Nullable<TSortInput>;
}

export interface PaginationStateModel<
    TItems,
    TPaginationInput extends PaginationInput = PaginationInput
> {
    input:   TPaginationInput;
    page?:   Nullable<Page<TItems>>;
}

export interface Page<TItems> {
    data:  TItems[];
    total: number;
}