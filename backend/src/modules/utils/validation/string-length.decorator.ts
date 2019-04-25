import { IntegerRange } from '../math/integer-range.class';
import { Length } from 'class-validator';

export function StringLength({ min, max}: IntegerRange) {
    return Length(min, max - 1);
}