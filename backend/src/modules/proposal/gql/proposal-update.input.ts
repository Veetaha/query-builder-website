import { Nullable, NullableProps } from 'ts-typedefs';
import { InputType } from 'type-graphql';
import { Min       } from 'class-validator';

import { ValidateAs        } from '@utils/validation/validations.decorator';
import { NullableOpt       } from '@utils/gql/opts';
import { ValidateIfPresent } from '@utils/validation/validate-if-present.decorator';
import { StringField, IntField, BooleanField } 
from '@utils/gql/decorators/explicit-type-field.decorator';

import { Proposal } from '../proposal.entity';


@InputType()
export class ProposalUpdateInput implements NullableProps<Proposal> {
    
    @Min(1)
    @IntField()
    id!: number;

    @ValidateAs(Proposal, 'name')      
    @ValidateIfPresent 
    @StringField(NullableOpt) 
    name?: Nullable<string>;

    @ValidateAs(Proposal, 'introText') 
    @ValidateIfPresent 
    @StringField(NullableOpt) 
    introText?: Nullable<string>;

    @ValidateAs(Proposal, 'bodyText') 
    @ValidateIfPresent 
    @StringField(NullableOpt)
    bodyText?:  Nullable<string>;


    @ValidateAs(Proposal, 'mainPictureUrl')
    @ValidateIfPresent
    @StringField(NullableOpt)
    mainPictureUrl?: Nullable<string>;

    @BooleanField(NullableOpt)
    isOpenned?: Nullable<boolean>;
}