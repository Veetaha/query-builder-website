import { createPayloadedAction } from '@utils/ngxs/create-payloaded-action';

import { ProposalUpdateInput } from '@app/gql/generated';
import { RemoveKeys } from 'ts-typedefs';

export class FetchProposal {
    static readonly type = '[ProposalDetail] FetchProposal';
    constructor(readonly proposalId: number) {}
}

export class RateProposal  {
    static readonly type = '[ProposalDetail] RateProposal';
    constructor(readonly liked: boolean) {}
}

export const UpdateProposal = createPayloadedAction<RemoveKeys<ProposalUpdateInput, 'id'>>(
    '[ProposalDetail] UpdateProposal'
);
export type UpdateProposal = InstanceType<typeof UpdateProposal>;