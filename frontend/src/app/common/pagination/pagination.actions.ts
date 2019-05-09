import _ from 'lodash';
import { createPayloadedAction } from '@utils/ngxs/create-payloaded-action';
import { PaginationInput } from './pagination.model';
import { createSimpleAction } from '@utils/ngxs/create-simple-action';

export function createPaginationActions(stateName: string) {
    const createType = (name: string) => `[${_.upperFirst(stateName)}Pagination] ${name}`;

    return {
        fetchPage:  createSimpleAction(createType('FetchPage')),
        patchInput: createPayloadedAction<Partial<PaginationInput>>(
            createType('UpdateLimitAndOffset')
        ),
    };
}

export type PatchInput = InstanceType<
    ReturnType<typeof createPaginationActions>['patchInput']
>;