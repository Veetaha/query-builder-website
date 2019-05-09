import { State, StateContext, Action, Selector } from '@ngxs/store';

import { CommonStateModel as StateModel } from './common.model';
import { AwaitResponse } from './common.actions';

type StateCtx = StateContext<StateModel>;

@State<StateModel>({
    name: 'common',
    defaults: {
        awaitedResponses: 0
    }
})
export class CommonState {
    @Selector() static isAwaitingResponses(s: StateModel) { 
        return s.awaitedResponses > 0; 
    }


    @Action(AwaitResponse)
    awaitResponse({patchState, getState}: StateCtx, {awaiting}: AwaitResponse) {
        patchState({
            awaitedResponses: getState().awaitedResponses + (awaiting ? +1 : -1)
        });
    }

}