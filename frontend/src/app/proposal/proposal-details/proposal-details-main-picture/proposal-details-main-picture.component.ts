import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';

import { PictureDialogService } from '@app/common/picture-dialog/picture-dialog.service';
import { ProposalFormService  } from '@app/proposal/proposal-form.service';

import { UpdateProposal } from '../proposal-details.actions';

@Component({
    selector: 'app-proposal-details-main-picture',
    templateUrl: './proposal-details-main-picture.component.html',
    styleUrls: ['./proposal-details-main-picture.component.scss']
})
export class ProposalDetailsMainPictureComponent {

    @Input() proposalMainPictureUrl!: string;
    @Input() isUpdateEnabled!: boolean;

    constructor(
        private readonly pictureDialogs: PictureDialogService,
        private readonly proposalForms:  ProposalFormService,
        private readonly store:          Store,
    ) {}


    openPictureDialog() {
        const formControl = this.isUpdateEnabled 
            ? this.proposalForms.createMainPictureUrlFormControl(this.proposalMainPictureUrl)
            : null;

        this.pictureDialogs.openDialog({
            data: { pictureUrl: this.proposalMainPictureUrl, formControl },
        }).onClose.subscribe(() => {
            if (formControl != null && formControl.value !== this.proposalMainPictureUrl) {
                this.store.dispatch(new UpdateProposal({ 
                    mainPictureUrl: formControl.value
                }));
            }
        });
    }
}
