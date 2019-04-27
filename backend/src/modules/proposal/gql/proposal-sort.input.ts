import { InputType } from 'type-graphql';

import * as I from '@app/interfaces';
import { Nullable       } from '@utils/gql/opts';
import { SortInput      } from '@utils/gql/sorting/sort.input';
import { ISortInput     } from '@utils/gql/sorting/sort-input.interface';
import { SortInputField } from '@utils/gql/sorting/sort-input-field.decorator';
import { Proposal } from '../proposal.entity';

@InputType()
export class ProposalSortInput implements ISortInput<Proposal> {
    @SortInputField(Nullable) id?:             I.Nullable<SortInput>;
    @SortInputField(Nullable) creationDate?:   I.Nullable<SortInput>;
    @SortInputField(Nullable) lastUpdateDate?: I.Nullable<SortInput>;
    @SortInputField(Nullable) name?:           I.Nullable<SortInput>;           
    @SortInputField(Nullable) creatorLogin?:   I.Nullable<SortInput>;           
    @SortInputField(Nullable) introText?:      I.Nullable<SortInput>;           
}