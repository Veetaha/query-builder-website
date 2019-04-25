import * as I from '@app/interfaces';
import { composeDecorators } from '@utils/meta';

const ValidationsMetaKey = 'app:constraints';

/**
 * Defines and stores validations for the given property of target class.
 * @param validations `'class-validator'` decorators to store and reuse.
 */
export function Validations
(...validations: I.PropertyDecorator<unknown, string>[]): I.PropertyDecorator<unknown, string> {
    return (proto, key) => {
        const composedValidations = composeDecorators(...validations);

        Reflect.defineMetadata(ValidationsMetaKey, composedValidations, proto.constructor, key);

        return composedValidations(proto, key);
    }; 
}

/**
 * Finds and defines the same validations as for the given `key` of `SrcClass`
 * @param SrcClass Class to get stored validations from. 
 * @param key      Defines the property from `SrcClass` to get validations from.
 */
export function ValidateAs
<TSrcClass extends I.Class>
(SrcClass: TSrcClass, key: keyof InstanceType<TSrcClass>): I.PropertyDecorator {
    const validations = Reflect.getOwnMetadata(ValidationsMetaKey, SrcClass, key as any);
    if (validations == null) {
        throw new Error(`No validation were previously defined for ${SrcClass.name}['${key}']`);
    }
    return validations;
}