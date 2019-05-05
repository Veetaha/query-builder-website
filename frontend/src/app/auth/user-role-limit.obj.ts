import { UserRole } from '@app/gql/generated';
import _ from 'lodash';

export interface UserRoleLimit {
    readonly roles:      UserRole[];
    readonly areAllowed: boolean;
}

export function obeysLimit(self: UserRoleLimit, suspect: UserRole) {
    return self.roles.includes(suspect) === self.areAllowed;
}

export const allow = (...roles: UserRole[]) => ({ roles, areAllowed: true});
export const deny  = (...roles: UserRole[]) => ({ roles, areAllowed: false});
