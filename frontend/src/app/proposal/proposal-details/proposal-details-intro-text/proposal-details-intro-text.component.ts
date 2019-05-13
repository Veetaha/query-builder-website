import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProposalFormService } from '@app/proposal/proposal-form.service';
import { Store } from '@ngxs/store';

import { UpdateProposal } from '../proposal-details.actions';
import { AbstractViewAndEdit } from '@app/common/abstract-view-and-edit.class';

@Component({
    selector:    'app-proposal-details-intro-text',
    templateUrl: './proposal-details-intro-text.component.html',
    styleUrls: ['./proposal-details-intro-text.component.scss']
})
export class ProposalDetailsIntroTextComponent extends AbstractViewAndEdit<string> {

    @Input() proposalIntroText!: string;
    @Input() isUpdateEnabled!:  boolean;

    constructor(
        private readonly proposalForms: ProposalFormService,
        private readonly store:         Store
    ) { 
        super(); 
    }

    protected createFormControl(): FormControl {
        return this.proposalForms.createIntroTextFormControl(this.proposalIntroText);
    }
    protected submitEditsImpl(introText: string): void {
        this.store.dispatch(new UpdateProposal({ introText }));
    }
    

}
