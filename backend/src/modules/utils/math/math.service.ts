import { Injectable } from '@nestjs/common';
import { IntegerRange } from './integer-range.class';

@Injectable()
export class MathService  {

    makeIntegerRange(...args: ConstructorParameters<typeof IntegerRange>) {
        return new IntegerRange(...args);
    }

}
