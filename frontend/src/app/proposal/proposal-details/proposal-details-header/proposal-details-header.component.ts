import { Nullable    } from 'ts-typedefs';
import { FormControl } from '@angular/forms';
import { Store       } from '@ngxs/store';
import { Component, Input } from '@angular/core';

import { ProposalFormService } from '@app/proposal/proposal-form.service';

import { UpdateProposal } from '../proposal-details.actions';

@Component({
    selector: 'app-proposal-details-header',
    templateUrl: './proposal-details-header.component.html',
    styleUrls: ['./proposal-details-header.component.scss']
})
export class ProposalDetailsHeaderComponent {

    @Input() proposalName!: string;
    @Input() isUpdateEnabled!: boolean;

    nameFC?: Nullable<FormControl>;

    constructor(
        private readonly store:         Store,
        private readonly proposalForms: ProposalFormService
    ) { }

    setEditState() {
        this.nameFC = this.proposalForms.createNameFormControl(this.proposalName);
    }
    isEditState() {
        return this.nameFC != null;
    }
    cancelUpdate() {
        this.nameFC = null;
    }
    submitUpdate() {
        this.store.dispatch(new UpdateProposal({
            name: this.nameFC!.value
        }));
        this.nameFC = null;
    }

}
