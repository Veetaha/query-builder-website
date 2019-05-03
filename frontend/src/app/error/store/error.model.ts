import { Nullable } from '@app/interfaces';

export interface ErrorStateModel {
    readonly err?: Nullable<Error>;
}