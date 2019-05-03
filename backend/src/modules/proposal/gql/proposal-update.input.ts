import { InputType } from 'type-graphql';

import * as I from '@app/interfaces';
import { StringField, IntField } from '@utils/gql/decorators/explicit-type-field.decorator';
import { ValidateAs        } from '@utils/validation/validations.decorator';
import { NullableOpt       } from '@utils/gql/opts';
import { ValidateIfPresent } from '@utils/validation/validate-if-present.decorator';
import { Proposal          } from '../proposal.entity';
import { Min               } from 'class-validator';


@InputType()
export class ProposalUpdateInput implements I.NullableProps<Proposal> {
    
    @Min(1)
    @IntField()
    id!: number;

    @ValidateAs(Proposal, 'name')      
    @ValidateIfPresent 
    @StringField(NullableOpt) 
    name?: I.Nullable<string>;

    @ValidateAs(Proposal, 'introText') 
    @ValidateIfPresent 
    @StringField(NullableOpt) 
    introText?: I.Nullable<string>;

    @ValidateAs(Proposal, 'bodyText') 
    @ValidateIfPresent 
    @StringField(NullableOpt)
    bodyText?:  I.Nullable<string>;


    @ValidateAs(Proposal, 'mainPictureUrl')
    @StringField(NullableOpt)
    mainPictureUrl?: I.Nullable<string>;

}