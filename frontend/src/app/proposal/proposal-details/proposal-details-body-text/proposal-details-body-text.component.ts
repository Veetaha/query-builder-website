import { Store       } from '@ngxs/store';
import { Component, Input } from '@angular/core';

import { ProposalFormService } from '@app/proposal/proposal-form.service';

import { UpdateProposal } from '../proposal-details.actions';
import { AbstractViewAndEdit } from '@app/common/abstract-view-and-edit.class';

@Component({
    selector:    'app-proposal-details-body-text',
    templateUrl: './proposal-details-body-text.component.html',
    styleUrls:  ['./proposal-details-body-text.component.scss']
})
export class ProposalDetailsBodyTextComponent extends AbstractViewAndEdit<string> {

    @Input() proposalBodyText!: string;
    @Input() isUpdateEnabled!: boolean;
    
    constructor(
        private readonly proposalForms: ProposalFormService,
        private readonly store:         Store
    ) {
        super();
    }

    protected createFormControl() {
        return this.proposalForms.createBodyTextFormControl(this.proposalBodyText);
    }
    protected submitEditsImpl(bodyText: string) {
        this.store.dispatch(new UpdateProposal({ bodyText }));
    }
}
