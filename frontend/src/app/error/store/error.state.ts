import { State, StateContext, Action, Selector } from '@ngxs/store';

import { OpenErrorPage, CriticalError  } from './error.actions';
import { ErrorStateModel as StateModel } from './error.model';


type StateCtx = StateContext<StateModel>;

@State<StateModel>({
    name: 'error',
    defaults: {
        err: null
    }
})
export class ErrorState {

    @Selector() static err({err}: StateModel) { return err; }


    @Action(CriticalError)
    raiseError({ dispatch, setState }: StateCtx, { err }: CriticalError) {
        setState({err});
        dispatch(OpenErrorPage);
    }

}