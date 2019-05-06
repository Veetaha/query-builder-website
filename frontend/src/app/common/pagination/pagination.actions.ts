import _ from 'lodash';
import { createPayloadedAction } from '@utils/ngxs/create-payloaded-action';
import { createSimpleAction    } from '@utils/ngxs/create-simple-action';

export interface UpdateLimitAndOffset {
    limit:  number;
    offset: number;
}

export function createPaginationActions(stateName: string) {
    const createType = (name: string) => `[${_.upperFirst(stateName)}Pagination] ${name}`;

    return {
        UpdateLimitAndOffset: createPayloadedAction<UpdateLimitAndOffset>(
            createType('UpdateLimitAndOffset')
        ),
        UpdateCurrentPage:    createSimpleAction(createType('UpdateCurrentPage'))
    };

}