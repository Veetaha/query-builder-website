import { State, StateContext, Action, Selector } from '@ngxs/store';

import { OpenErrorPage, CriticalError  } from './error.actions';
import { ErrorStateModel as StateModel } from './error.model';


type StateCtx = StateContext<StateModel>;

@State<StateModel>({
    name: 'error',
    defaults: {
        message: null
    }
})
export class ErrorState {

    @Selector() static message({message}: StateModel) { return message; }


    @Action(CriticalError)
    raiseError({ dispatch, setState }: StateCtx, err: CriticalError) {
        setState(err);
        dispatch(OpenErrorPage);
    }

}