import { Nullable    } from 'ts-typedefs';
import { Store       } from '@ngxs/store';
import { FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

import { ProposalFormService } from '@app/proposal/proposal-form.service';

import { UpdateProposal } from '../proposal-details.actions';

@Component({
    selector:    'app-proposal-details-body-text',
    templateUrl: './proposal-details-body-text.component.html',
    styleUrls:  ['./proposal-details-body-text.component.scss']
})
export class ProposalDetailsBodyTextComponent {

    @Input() proposalBodyText!: string;
    @Input() isUpdateEnabled!: boolean;
    
    bodyTextFC?: Nullable<FormControl>;

    constructor(
        private readonly proposalForms: ProposalFormService,
        private readonly store:         Store
    ) { }

    setEditState() {
        this.bodyTextFC = this.proposalForms
            .createBodyTextFormControl(this.proposalBodyText);
    }
    isEditState() {
        return this.bodyTextFC != null;
    }
    cancelUpdate() {
        this.bodyTextFC = null;
    }
    submitUpdate() {
        this.store.dispatch(new UpdateProposal({
            bodyText: this.bodyTextFC!.value
        }));
        this.bodyTextFC = null;
    }


}
