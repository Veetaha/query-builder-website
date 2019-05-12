import { Nullable /*, NullableProps */ } from 'ts-typedefs';

import { EntireProposal } from '../interfaces';
// import { NgxsFormStateModel } from '@utils/ngxs/form.model';
// import { CreateProposalControlsModel } from '../create-proposal/create-proposal.model';

// export type UpdateProposalControlsModel = NullableProps<CreateProposalControlsModel>;

export interface ProposalDetailsModel {
    proposal: Nullable<EntireProposal>;
    // updateForm: NgxsFormStateModel<UpdateProposalControlsModel>;
}