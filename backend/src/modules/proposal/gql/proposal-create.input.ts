import { InputType } from 'type-graphql';

import * as I from '@app/interfaces';
import { StringField } from '@utils/gql/decorators/explicit-type-field.decorator';
import { ValidateAs  } from '@utils/validation/validations.decorator';
import { NullableOpt } from '@utils/gql/opts';
import { Proposal    } from '../proposal.entity';

@InputType()
export class ProposalCreateInput implements Partial<Proposal> {
    
    @ValidateAs(Proposal, 'name')      @StringField() name!:      string;
    @ValidateAs(Proposal, 'introText') @StringField() introText!: string;
    @ValidateAs(Proposal, 'bodyText')  @StringField() bodyText!:  string;

    @ValidateAs(Proposal, 'mainPictureUrl')
    @StringField(NullableOpt)
    mainPictureUrl?: I.Nullable<string>;

}