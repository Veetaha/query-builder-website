import { InputType } from 'type-graphql';

import * as I from '@app/interfaces';
import { IFilterInput } from '@utils/gql/filtering/inputs/filter-input.interface';
import { Nullable     } from '@utils/gql/opts';
import { IntFilterInputField,     IntFilterInput     } from '@utils/gql/filtering/inputs/int.input';
import { StringFilterInputField,  StringFilterInput  } from '@utils/gql/filtering/inputs/string.input';
import { BooleanFilterInputField, BooleanFilterInput } from '@utils/gql/filtering/inputs/boolean.input';
import { Like } from '../like.entity';

@InputType()
export class LikeFilterInput implements IFilterInput<Like> {
    @IntFilterInputField(Nullable)     proposalId?: I.Nullable<IntFilterInput>;
    @StringFilterInputField(Nullable)  raterLogin?: I.Nullable<StringFilterInput>;
    @BooleanFilterInputField(Nullable) liked?:      I.Nullable<BooleanFilterInput>;
}