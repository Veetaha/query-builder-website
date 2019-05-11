import { Nullable   } from 'ts-typedefs';
import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { limits } from '@common/constants';

@Injectable({ providedIn: 'root' })
export class ProposalFormService {

    createNameFormControl(initialValue: string) {
        return this.createTextFormControl(initialValue, 'name');
    }
    createIntroTextFormControl(initialValue: string) {
        return this.createTextFormControl(initialValue, 'introText');
    }
    createBodyTextFormControl(initialValue: string) {
        return this.createTextFormControl(initialValue, 'bodyText');
    }
    createIsOpennedFormControl(initialValue: boolean) {
        return new FormControl(initialValue, [Validators.required]);
    }
    createMainPictureUrlFormControl(initialValue?: Nullable<string>) {
        return new FormControl(initialValue);
    }

    private createTextFormControl(initialValue: string, key: keyof typeof limits['proposal']) {
        return new FormControl(initialValue, [
            Validators.min(limits.proposal[key].min),
            Validators.max(limits.proposal[key].max),
            Validators.required
        ]);
    }
}