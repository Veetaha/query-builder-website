import { InputType } from 'type-graphql';

import * as I from '@app/interfaces';
import { NullableOpt       } from '@utils/gql/opts';
import { SortInput      } from '@utils/gql/sorting/sort.input';
import { ISortInput     } from '@utils/gql/sorting/sort-input.interface';
import { SortInputField } from '@utils/gql/sorting/sort-input-field.decorator';
import { Proposal } from '../proposal.entity';

@InputType()
export class ProposalSortInput implements ISortInput<Proposal> {
    @SortInputField(NullableOpt) id?:             I.Nullable<SortInput>;
    @SortInputField(NullableOpt) creationDate?:   I.Nullable<SortInput>;
    @SortInputField(NullableOpt) lastUpdateDate?: I.Nullable<SortInput>;
    @SortInputField(NullableOpt) name?:           I.Nullable<SortInput>;           
    @SortInputField(NullableOpt) creatorLogin?:   I.Nullable<SortInput>;           
    @SortInputField(NullableOpt) introText?:      I.Nullable<SortInput>;           
}