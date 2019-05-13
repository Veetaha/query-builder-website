import { Nullable   } from 'ts-typedefs';
import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { limits } from '@common/constants';
import { FormService } from '@utils/form.service';

@Injectable({ providedIn: 'root' })
export class ProposalFormService {

    constructor(private readonly forms: FormService) {}

    createNameFormControl(initialValue: string) {
        return this.forms.createRequiredTextFromControl(
            initialValue, limits.proposal.name
        );
    }
    createIntroTextFormControl(initialValue: string) {
        return this.forms.createRequiredTextFromControl(
            initialValue, limits.proposal.introText
        );
    }
    createBodyTextFormControl(initialValue: string) {
        return this.forms.createRequiredTextFromControl(
            initialValue, limits.proposal.bodyText
        );
    }
    createIsOpennedFormControl(initialValue: boolean) {
        return new FormControl(initialValue, [Validators.required]);
    }
    createMainPictureUrlFormControl(initialValue?: Nullable<string>) {
        return new FormControl(initialValue);
    }


}