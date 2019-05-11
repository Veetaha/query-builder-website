import { MapValues } from 'ts-typedefs';
import { FormControl } from '@angular/forms';

import { NgxsFormStateModel } from '@utils/ngxs/form.model';


export interface CreateProposalControlsModel {
    readonly name:           string;
    readonly introText:      string;
    readonly bodyText:       string;
    readonly mainPictureUrl: string;
    readonly isOpenned:      boolean;
}

export type CreateProposalFormControls = MapValues<CreateProposalControlsModel, FormControl>;

export interface CreateProposalStateModel {
    readonly form: NgxsFormStateModel<CreateProposalControlsModel>;
}