import _ from 'lodash';
import { tap } from 'rxjs/operators';
import { Nullable } from 'ts-typedefs';
import { State, StateContext, Selector, Action } from '@ngxs/store';

import { SortingOrder } from '@app/gql/generated';

import { 
    PaginationStateModel, 
    PaginationFilterFormStateModel, 
    PaginationSortFormStateModel 
} from './pagination.model';
import { createPaginationActions, UpdateLimitAndOffset } from './pagination.actions';
import { LoggingService } from '@utils/logging.service';
import { PaginationServiceClass, UnpackItemsFromService } from './pagination-service.interface';
import { Inject } from '@angular/core';
import { NgxsFormValidityState } from '@utils/ngxs/form.model';

export interface CreatePaginationStateOpts
<TPaginationServiceClass extends PaginationServiceClass> 
{
    name:              string;
    defaultLimit?:     number;
    defaultOffset?:    number;
    debounceTime?:     number;
    maxWait?:          number;
    filterKeys?:       Nullable<string[]>; // initial values
    sortKeys?:         Nullable<string[]>; // initial values
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
            limit:        _.defaultTo(opts.defaultLimit, 10),
            offset:       _.defaultTo(opts.defaultOffset, 0),
            debounceTime: _.defaultTo(opts.debounceTime, 300),
            maxWait:      _.defaultTo(opts.maxWait, 2000),
            sortKeys:   opts.sortKeys,
            filterKeys: opts.filterKeys,
            currentPage: null,
            settingsForm: {
                dirty: false,
                status: NgxsFormValidityState.Valid,
                model: {}
            }
        } as StateModel
    })
    class PaginationState {        
        static readonly stateName = name;
        static readonly actions = createPaginationActions(opts.name);
        
        @Selector() static limit       (s: StateModel) { return s.limit; }
        @Selector() static offset      (s: StateModel) { return s.offset; }
        @Selector() static maxWait     (s: StateModel) { return s.maxWait; }
        @Selector() static debounceTime(s: StateModel) { return s.debounceTime; }
        @Selector() static filterKeys  (s: StateModel) { return s.filterKeys; } 
        @Selector() static sortKeys    (s: StateModel) { return s.sortKeys; } 
        @Selector() static currentPage (s: StateModel) { return s.currentPage; }
        @Selector() static currentItems(s: StateModel) { 
            return s.currentPage == null ? null : s.currentPage.data;
        }
        @Selector() static currentTotal(s: StateModel) { 
            return s.currentPage == null ? null : s.currentPage.total;
        }

        @Selector() static paginationInput({ limit, offset, settingsForm }: StateModel) {
            return {
                filter: this.getFilterInputFromForm(settingsForm.model.filter),
                sort:   this.getSortInputFromForm(settingsForm.model.sort),
                limit, 
                offset
            };
        }
        

        private static getFilterInputFromForm(form: Nullable<PaginationFilterFormStateModel>) {
            return form == null ? null : { props: { [form.key]: { ilike: form.value } } }; 
        }

        private static getSortInputFromForm(form: Nullable<PaginationSortFormStateModel>) {
            return form == null ? null : { 
                [form.key]: { 
                    ordering: form.isAscendingOrder 
                        ? SortingOrder.Asc 
                        : SortingOrder.Desc 
                } 
            };
        }

        constructor(
            @Inject(opts.paginationService)
            private readonly pageService: InstanceType<TPaginationServiceClass>,
            private readonly log: LoggingService
        ) {}
        
        @Action(PaginationState.actions.UpdateLimitAndOffset)
        updateLimitAndOffset(ctx: StateCtx, {limit, offset}: UpdateLimitAndOffset) {
            const state = ctx.getState();
            if (state.limit === limit && state.offset === offset) { // skip if nothing changes
                this.log.warning(
                    "Received UpdateLimitAndOffset action, though no update is needed"
                );
                return;
            }
            ctx.patchState({limit, offset});
            return this.updateCurrentPage(ctx);
        }

        /**
         * Removes current page and fetches new one.
         * TODO inspect for concurrency issues
         */
        @Action(PaginationState.actions.UpdateCurrentPage)
        updateCurrentPage(ctx: StateCtx) {
            
            ctx.patchState({ currentPage: null }); 

            return this.pageService
                .getPage(PaginationState.paginationInput(ctx.getState()))
                .pipe(tap(page => ctx.patchState({ currentPage: page })));
        }
    }

    return PaginationState;
}   

export type PaginationStateClass = ReturnType<typeof createPaginationState>;