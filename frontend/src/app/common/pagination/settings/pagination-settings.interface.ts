import { Nullable } from 'ts-typedefs';

import { SortingOrder } from '@app/gql/generated';

export interface PaginationSettings {
    filter?: Nullable<{ 
        key:   string;
        value: string;
    }>;
    sort?: Nullable<{
        key:      string;
        ordering: SortingOrder;
    }>;
}