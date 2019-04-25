import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import * as I from '@app/interfaces';
import { QueryAndParams } from '@utils/gql/filtering/filter-builder';

@Injectable()
export class OrmUtilsService {

    /**
     * Removes properties that are defined as required in `TypeOrm.Entity`, but
     * are `null | undefined` in `obj`. This method mutates `obj` and returns it.
     * 
     * @param repo Target entity repository.
     * @param obj  Target object to remove properties from. 
     */
    removeNilFromRequiredProps
    <TObj extends I.Obj>
    (repo: Repository<TObj>, obj: I.NullableProps<TObj>): Partial<TObj> {
        for (const {propertyName, isNullable} of repo.metadata.columns) {
            if (!isNullable && propertyName in obj && obj[propertyName] == null) {   
                delete obj[propertyName];
            }
        }
        return obj;
    }

    /**
     * Preforms an `UPDATE` query with the values from `upd` for the entity 
     * found according to `whereParams`. You must ensure that the entity exists
     * before using this method. All nil properties are removed from `upd` if they
     * are required in database schema, thus `upd` gets mutated. 
     * 
     * @param repo Entity repository to update object in.
     * @param upd  Partial entity that contains update values.
     *             Nils are removed if those properties cannot be nullable.
     * @param whereParams `WHERE` clause conditions to find the target entity to update.
     */
    async updateOne<TEntityRepo extends Repository<any>>(
        repo: TEntityRepo,
        upd:  I.NullableProps<ReturnType<TEntityRepo['create']>>, 
        ...whereParams: QueryAndParams
    ): Promise<I.CoreObjData<ReturnType<TEntityRepo['create']>>> {
        return (await repo
            .createQueryBuilder()
            .update(this.removeNilFromRequiredProps(repo, upd))
            .where(...whereParams)
            .returning('*')
            .execute()
            )   
            .raw[0];
    }


}