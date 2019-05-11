import { Component      } from '@angular/core';
import { FormGroup      } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store          } from '@ngxs/store';

import { AbstractRouteGuardedComponent } from '@app/auth/abstract-route-guarded.component';

import { ProposalFormService } from '../proposal-form.service';
import { CreateProposalFormControls } from './create-proposal.model';
import { SubmitCreatedProposal } from './create-proposal.actions';



@Component({
    selector:    'app-create-proposal',
    templateUrl: './create-proposal.component.html',
    styleUrls:  ['./create-proposal.component.scss']
})
export class CreateProposalComponent extends AbstractRouteGuardedComponent {
    form: FormGroup;

    constructor(
        route:         ActivatedRoute,
        store:         Store,
        proposalForms: ProposalFormService
    ) {
        super(route, store);
        const controls: CreateProposalFormControls = {
            name:           proposalForms.createNameFormControl(''),
            bodyText:       proposalForms.createBodyTextFormControl(''),
            introText:      proposalForms.createIntroTextFormControl(''),
            mainPictureUrl: proposalForms.createMainPictureUrlFormControl(),
            isOpenned:      proposalForms.createIsOpennedFormControl(true)
        };
        this.form = new FormGroup(controls);
    }


    submitForm() {
        this.store.dispatch(SubmitCreatedProposal.instance);
    }

}
