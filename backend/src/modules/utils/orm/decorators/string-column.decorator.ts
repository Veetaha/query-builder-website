import { ColumnOptions } from 'typeorm';
import { Column } from 'typeorm';

import * as I from '@app/interfaces';
import { composeDecorators } from '@utils/meta';
import { StringLength } from '@utils/validation/string-length.decorator';
import { IntegerRange } from '@utils/math/integer-range.class';
import { Validations, PropDecor } from '@utils/validation/validations.decorator';
import { ValidateIfPresent } from '@utils/validation/validate-if-present.decorator';

/**
 * Defines a `@Column({ type: 'varchar', length: range.max })` column
 * and adds `@Validations` constraints for `class-validator` for the decorated property.
 */
export function StringColumn(
    range: IntegerRange,  
    opts?: I.RemoveKeys<ColumnOptions, 'length'>
) {
    return composeDecorators(

        opts == null || !opts.nullable 
            ? Validations(StringLength(range)) 
            : Validations(StringLength(range), ValidateIfPresent),

        Column({ type: 'varchar', ...opts, length: range.max - 1 }) as PropDecor
    );
}