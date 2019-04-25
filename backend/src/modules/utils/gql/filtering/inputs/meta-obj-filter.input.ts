import _ from 'lodash';
import { InputType      } from 'type-graphql';
import { getRepository  } from 'typeorm';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

import * as I from '@app/interfaces';

import { NestedInputField    } from '@utils/gql/decorators/nested-input-field.decorator';
import { AbstractFilterInput } from './abstract-filter.input';
import { IFilterInput        } from './filter-input.interface';


export type FilterMetadata<TObj extends I.Obj> = I.MapValues<TObj, ColumnMetadata>;

export function MetaObjFilterInput<   
    TEntityClass extends I.Class, 
    TFilterClass extends I.Class<IFilterInput<InstanceType<TEntityClass>>>
>
(EntityClass: TEntityClass, FilterClass: TFilterClass) {

    type TEntity = InstanceType<TEntityClass>;
    type TMeta   = FilterMetadata<TEntity>;

    @InputType({ isAbstract: true })
    abstract class GenericMetaObjFilterInput extends AbstractFilterInput {
        @NestedInputField(_type => FilterClass)
        props!: InstanceType<TFilterClass>;

        private static columnsMetadata?: TMeta; // lazy initializtion
        
        private static initColumnsMetadata() {
            this.columnsMetadata = getRepository(EntityClass)
                .metadata
                .columns
                .reduce(
                    (acc, meta) => ((acc[meta.propertyName as keyof TEntity] = meta), acc), 
                    {} as TMeta
                );
        }

        getColumnsMetadata() {
            if (GenericMetaObjFilterInput.columnsMetadata == null) {
                GenericMetaObjFilterInput.initColumnsMetadata();
            }
            return GenericMetaObjFilterInput.columnsMetadata!;
        }
    }

    return GenericMetaObjFilterInput;
}

export type MetaObjFilterInput = I.InstanceType<ReturnType<typeof MetaObjFilterInput>>;