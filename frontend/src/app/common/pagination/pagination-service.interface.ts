import { Class      } from 'ts-typedefs';
import { Observable } from 'rxjs';

import { PaginationInput, Page } from './pagination.model';


export interface PaginationService
<TPaginationInput extends PaginationInput, TItems = any> 
{
    getPage(input: TPaginationInput): Observable<Page<TItems>>;
}

export type PaginationServiceClass<
    TPaginationInput extends PaginationInput = PaginationInput,
    TItems = any
>  = Class<PaginationService<TPaginationInput, TItems>>;

export type UnpackItemsFromService<TService> = (
    TService extends PaginationServiceClass<any, infer TItems> ? TItems : never
);