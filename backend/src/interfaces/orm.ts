import * as I from '@common/interfaces';
import { Repository } from 'typeorm';

export type CoreEntityData<TEntity extends I.Obj> = I.CoreObjData<
    I.RemoveKeys<TEntity, 'id' | 'creationDate' | 'lastUpdateDate'>
>;

export type EntityFromRepo<TRepo extends Repository<any>> = ReturnType<TRepo['create']>;