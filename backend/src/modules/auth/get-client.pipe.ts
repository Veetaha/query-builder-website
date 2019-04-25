import { Injectable, PipeTransform } from '@nestjs/common';

import * as I from '@app/interfaces';
import { ResolveContext } from '@modules/common';
import { User           } from '@modules/user';

@Injectable()
export class GetClientPipe implements PipeTransform {
    transform(value: ResolveContext) {
        return value.req.user as I.Nullable<User>;
    }
}