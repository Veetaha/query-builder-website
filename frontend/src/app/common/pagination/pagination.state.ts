import _ from 'lodash';
import { tap } from 'rxjs/operators';
import { State, StateContext, Selector, Action } from '@ngxs/store';

import { 
    PaginationStateModel
} from './pagination.model';
import { createPaginationActions, PatchInput } from './pagination.actions';
import { PaginationServiceClass, UnpackItemsFromService } from './pagination-service.interface';
import { Inject } from '@angular/core';

export interface CreatePaginationStateOpts
<TPaginationServiceClass extends PaginationServiceClass> 
{
    name:              string;
    defaultLimit?:     number;
    defaultOffset?:    number;
    paginationService: TPaginationServiceClass;
}

export function createPaginationState
<TPaginationServiceClass extends PaginationServiceClass> 
(opts: CreatePaginationStateOpts<TPaginationServiceClass>) {
    type TItems     = UnpackItemsFromService<TPaginationServiceClass>;
    type StateModel = PaginationStateModel<TItems>;
    type StateCtx   = StateContext<StateModel>;
    const name = `${opts.name}Pagination`;

    @State<StateModel>({
        name,
        defaults: {
            input: {
                limit:  _.defaultTo(opts.defaultLimit, 10),
                offset: _.defaultTo(opts.defaultOffset, 0),
                filter: null,
                sort:   null
            },
            page:   null
        }
    })
    class PaginationState {        
        static readonly stateName = name;
        static readonly actions = createPaginationActions(opts.name);
        
        @Selector() static input (s: StateModel) { return s.input; }
        @Selector() static limit (s: StateModel) { return s.input.limit; }
        @Selector() static offset(s: StateModel) { return s.input.offset; }
        @Selector() static items (s: StateModel) { 
            return s.page == null ? null : s.page.data; 
        }
        @Selector() static total(s: StateModel) { 
            return s.page == null ? null : s.page.total;
        }

        constructor(
            @Inject(opts.paginationService)
            private readonly pages: InstanceType<TPaginationServiceClass>
        ) {}
        
        @Action(PaginationState.actions.patchInput)
        updateLimitAndOffset(ctx: StateCtx, patch: PatchInput) {
            ctx.patchState({ 
                input: { 
                    ...ctx.getState().input, 
                    ...(patch as Partial<StateModel['input']>)
                }
            });
            return this.fetchPage(ctx);
        }

        /**
         * TODO inspect for concurrency issues
         */
        @Action(PaginationState.actions.fetchPage)
        private fetchPage(ctx: StateCtx) {
            return this.pages
                .getPage(ctx.getState().input)
                .pipe(tap(page => ctx.patchState({ page })));
        }
    }

    return PaginationState;
}   

export type PaginationStateClass = ReturnType<typeof createPaginationState>;