import { InputType, Field } from "type-graphql";

import * as I from '@app/interfaces';
import { NullableOpt } from '@utils/gql/opts';
import { AbstractFilterInput } from './abstract-filter.input';


/**
 * Filter input parameters for `TEnum` type.
 * @param EnumObj Enum object that contains target enum values, often it is 
 *                an original TypeScript enum.
 */
export function EnumFilterInput<TEnum extends I.Obj<any>>(EnumObj: TEnum, enumName: string) {
    type TEnumValue = I.ValueOf<TEnum>;

    const NullableEnumField      = Field(_type => EnumObj,   NullableOpt);
    const NullableEnumArrayField = Field(_type => [EnumObj], NullableOpt);

    @InputType({
        isAbstract: true,
        description: `Filter input parameters for ${'`'}${enumName}${'`'} type.`
    })
    abstract class GenericEnumFilterInput extends AbstractFilterInput {
        @NullableEnumField      eq?:  I.Nullable<TEnumValue>;
        @NullableEnumField      neq?: I.Nullable<TEnumValue>;
        @NullableEnumArrayField in?:  I.Nullable<TEnumValue[]>;
        @NullableEnumArrayField nin?: I.Nullable<TEnumValue[]>;    
    }
    return GenericEnumFilterInput;
}

export type EnumFilterInput = I.InstanceType<ReturnType<typeof EnumFilterInput>>;