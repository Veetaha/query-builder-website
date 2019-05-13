import { Injectable } from '@angular/core';
import { FormControl, Validators, ValidatorFn } from '@angular/forms';

import { IntRange } from '@common/utils/math/int-range';


@Injectable({ providedIn: 'root' })
export class FormService {

    createRequiredTextFromControl(
        initialValue: string, 
        limits: IntRange, 
        ...additionalValidators: ValidatorFn[]
    ) {
        return new FormControl(initialValue,[
            Validators.max(limits.max - 1),
            Validators.min(limits.min),
            Validators.required,
            ...additionalValidators
        ]);
    }

}