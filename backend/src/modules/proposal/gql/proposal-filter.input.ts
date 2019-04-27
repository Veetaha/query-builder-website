import { InputType } from 'type-graphql';

import * as I from '@app/interfaces';
import { Nullable     } from '@utils/gql/opts';
import { IFilterInput } from '@utils/gql/filtering/inputs/filter-input.interface';
import { IntFilterInputField,    IntFilterInput    } from '@utils/gql/filtering/inputs/int.input';
import { StringFilterInputField, StringFilterInput } from '@utils/gql/filtering/inputs/string.input';
import { DateFilterInputField,   DateFilterInput   } from '@utils/gql/filtering/inputs/date.input';
import { Proposal } from '../proposal.entity';

@InputType()
export class ProposalFilterInput implements IFilterInput<Proposal> {
    @IntFilterInputField(Nullable)    id?:             I.Nullable<IntFilterInput>;
    @StringFilterInputField(Nullable) name?:           I.Nullable<StringFilterInput>;
    @StringFilterInputField(Nullable) introText?:      I.Nullable<StringFilterInput>;
    @StringFilterInputField(Nullable) creatorLogin?:   I.Nullable<StringFilterInput>;
    @DateFilterInputField(Nullable)   creationDate?:   I.Nullable<DateFilterInput>;
    @DateFilterInputField(Nullable)   lastUpdateDate?: I.Nullable<DateFilterInput>;
}