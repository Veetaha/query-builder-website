import { InputType } from 'type-graphql';

import * as I from '@app/interfaces';
import { NullableOpt  } from '@utils/gql/opts';
import { IFilterInput } from '@utils/gql/filtering/inputs/filter-input.interface';
import { IntFilterInputField,    IntFilterInput    } from '@utils/gql/filtering/inputs/int.input';
import { StringFilterInputField, StringFilterInput } from '@utils/gql/filtering/inputs/string.input';
import { DateFilterInputField,   DateFilterInput   } from '@utils/gql/filtering/inputs/date.input';
import { Proposal } from '../proposal.entity';

@InputType()
export class ProposalFilterInput implements IFilterInput<Proposal> {
    @IntFilterInputField(NullableOpt)    id?:             I.Nullable<IntFilterInput>;
    @StringFilterInputField(NullableOpt) name?:           I.Nullable<StringFilterInput>;
    @StringFilterInputField(NullableOpt) introText?:      I.Nullable<StringFilterInput>;
    @StringFilterInputField(NullableOpt) creatorLogin?:   I.Nullable<StringFilterInput>;
    @DateFilterInputField(NullableOpt)   creationDate?:   I.Nullable<DateFilterInput>;
    @DateFilterInputField(NullableOpt)   lastUpdateDate?: I.Nullable<DateFilterInput>;
}