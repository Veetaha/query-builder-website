import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { OrderByCondition } from 'typeorm';

import * as I from '@app/interfaces';
import { FilterBuilder, QueryAndParams } from './filtering/filter-builder';
import { MetaObjFilterInput            } from './filtering';
import { ISortInput, SortInput         } from './sorting';


@Injectable()
export class GqlUtilsService {

    getFilterParams(
        filterInput:    I.Nullable<MetaObjFilterInput>, 
        tableNameAlias: string, 
        paramsPrefix?:  string
    ): QueryAndParams {
        return filterInput == null 
            ? ['', {}] 
            : FilterBuilder.createFilterParams(filterInput, tableNameAlias, paramsPrefix);
    }

    getOrderByCondition<TObj extends I.Obj>(
        sortInput:      I.Nullable<ISortInput<TObj>>,
        tableNameAlias: string
    ) {
        return sortInput == null ? {} : _.transform(
            sortInput, 
            (acc, value, key) => this.addOrderingCondition(acc, value, key, tableNameAlias),
            {} as OrderByCondition
        );
    }

    private addOrderingCondition(
        conditions:     OrderByCondition, 
        value:          I.Nullable<SortInput>, 
        key:            string,
        tableNameAlias: string
    ) {
        if (value != null) {
            conditions[`"${tableNameAlias}"."${key}"`] = value.getOrderingCondition();
        }
        return conditions;
    }
}