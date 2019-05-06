import _ from 'lodash';
import * as Vts from 'vee-type-safe';

import { UserRole } from '@app/gql/generated';


export interface UserRoleLimit {
    readonly roles:      UserRole[];
    readonly areAllowed: boolean;
}

export namespace UserRoleLimit {
    export function obeysLimit(self: UserRoleLimit, suspect: UserRole) {
        return self.roles.includes(suspect) === self.areAllowed;
    }
    const schema = Vts.td({
        roles:       [],       // any array, just for performance
        areAllowed: 'boolean'
    });
    export function isUserRoleLimit(suspect: unknown): suspect is UserRoleLimit {
        return Vts.conforms(suspect, schema);
    }
}

export const allow = (...roles: UserRole[]) => ({ roles, areAllowed: true});
export const deny  = (...roles: UserRole[]) => ({ roles, areAllowed: false});
