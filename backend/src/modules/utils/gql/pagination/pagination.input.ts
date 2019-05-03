import { InputType } from 'type-graphql';
import { Min, Max } from 'class-validator';

import * as I from '@app/interfaces';
import { IntField           } from '@utils/gql/decorators/explicit-type-field.decorator';
import { NestedInputField   } from '@utils/gql/decorators/nested-input-field.decorator';
import { ISortInput         } from '@utils/gql/sorting/sort-input.interface';
import { IFilterInput       } from '@utils/gql/filtering/inputs/filter-input.interface';
import { MetaObjFilterInput } from '@utils/gql/filtering/inputs/meta-obj-filter.input';



export interface PaginationInputOpts<
    TEntityClass extends I.Class,
    TFilterClass extends I.Class<IFilterInput<InstanceType<TEntityClass>>>, 
    TSortClass   extends I.Class<ISortInput  <InstanceType<TEntityClass>>>
> {
    minLimit?: number;
    maxLimit?: number;
    filter:    TFilterClass;
    entity:    TEntityClass;
    sort:      TSortClass;
}

export function PaginationInput<
    TEntityClass extends I.Class,
    TFilterClass extends I.Class<IFilterInput<InstanceType<TEntityClass>>>, 
    TSortClass   extends I.Class<ISortInput  <InstanceType<TEntityClass>>>
>({
    minLimit = 0,
    maxLimit = 500,
    filter: FilterClass,
    entity: EntityClass,
    sort:   SortClass
}: PaginationInputOpts<TEntityClass, TFilterClass, TSortClass>) {

    @InputType(`Meta${FilterClass.name}`)
    class MetaEntityFilterInput extends MetaObjFilterInput(EntityClass, FilterClass) {}

    @InputType({ isAbstract: true })
    abstract class GenericPaginationInput {

        @Max(maxLimit)
        @Min(minLimit)
        @IntField({
            description: 
            `Maximum amount of items to return for page. It must be an integer ` +
            `within the range [${minLimit}, ${maxLimit}]`
        })
        limit!: number;

        @Min(0)
        @IntField({
            description:
            `Offset that defines an index of the beginning of the page of items. ` +
            `It must be an integer that is >= 0.`
        })
        offset!: number;

        @NestedInputField(_type => MetaEntityFilterInput, {
            nullable: true,
            description: `Defines limitations for the items of the returned page.`
        })
        filter?: I.Nullable<MetaEntityFilterInput>;

        @NestedInputField(_type => SortClass, {
            nullable: true,
            description: `Defines sorting order for the items according to their property values.`
        })
        sort?: I.Nullable<InstanceType<TSortClass>>;
    }

    return GenericPaginationInput;
}


export type PaginationInput = I.InstanceType<ReturnType<typeof PaginationInput>>;