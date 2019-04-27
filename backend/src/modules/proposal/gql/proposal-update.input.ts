import { InputType } from 'type-graphql';

import * as I from '@app/interfaces';
import { StringField, IntField       } from '@utils/gql/decorators/explicit-type-field.decorator';
import { ValidateAs        } from '@utils/validation/validations.decorator';
import { Nullable          } from '@utils/gql/opts';
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
    @StringField(Nullable) 
    name?: I.Nullable<string>;

    @ValidateAs(Proposal, 'introText') 
    @ValidateIfPresent 
    @StringField(Nullable) 
    introText?: I.Nullable<string>;

    @ValidateAs(Proposal, 'bodyText') 
    @ValidateIfPresent 
    @StringField(Nullable)
    bodyText?:  I.Nullable<string>;


    @ValidateAs(Proposal, 'mainPictureUrl')
    @StringField(Nullable)
    mainPictureUrl?: I.Nullable<string>;

}