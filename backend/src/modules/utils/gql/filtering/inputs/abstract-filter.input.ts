import * as I from '@app/interfaces';
import { InputType, Field } from 'type-graphql';
import { FilterUnion      } from '../filter-union.enum';
import { FilterOperator   } from '../fitler-operator.enum';

@InputType({ isAbstract: true })
export abstract class AbstractFilterInput<TInputType = unknown> {

    @Field(_type => FilterUnion, {
        nullable: true,
        description: 
        "Defines the mode (logical operator) to unite all filter conditions " + 
        "(`And` by default)."
    })
    unionMode?: I.Nullable<FilterUnion>;

    [FilterOperator.Eq   ]?: I.Nullable<TInputType>;
    [FilterOperator.Neq  ]?: I.Nullable<TInputType>;
    [FilterOperator.Gt   ]?: I.Nullable<TInputType>;
    [FilterOperator.Geq  ]?: I.Nullable<TInputType>;
    [FilterOperator.Lt   ]?: I.Nullable<TInputType>;
    [FilterOperator.Leq  ]?: I.Nullable<TInputType>;
    [FilterOperator.Like ]?: I.Nullable<string>;
    [FilterOperator.Nlike]?: I.Nullable<string>;
    [FilterOperator.In   ]?: I.Nullable<TInputType[]>;
    [FilterOperator.Nin  ]?: I.Nullable<TInputType[]>;

}