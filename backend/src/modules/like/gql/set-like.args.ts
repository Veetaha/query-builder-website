import { ArgsType } from 'type-graphql';

import { IntField, BooleanField } from '@utils/gql/decorators/explicit-type-field.decorator';

@ArgsType()
export class SetLikeArgs {
    @IntField()
    proposalId!: number;

    @BooleanField()
    liked!: boolean;
}