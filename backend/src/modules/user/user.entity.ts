import { ObjectType, Field } from 'type-graphql';
import { 
    Entity, CreateDateColumn, UpdateDateColumn, Column 
} from 'typeorm';

import { Nullable      } from '@app/interfaces';
import { limits        } from '@common/constants';
import { StringColumn  } from '@utils/orm/decorators/string-column.decorator';
import { UserRole      } from './user-role.enum';
import { StringField, DateField } from '@utils/gql/decorators/explicit-type-field.decorator';

@ObjectType()
@Entity()
export class User {

    @CreateDateColumn() 
    @DateField()
    creationDate!: Date;

    @UpdateDateColumn() 
    @DateField()
    lastUpdateDate!: Date;

    @Column({
        type:    'enum',
        enum:    UserRole,
        default: UserRole.Regular
    })
    @Field(_type => UserRole)
    role = UserRole.Regular;

    @StringColumn(limits.user.name)
    @StringField()        
    name!: string;

    @StringColumn(limits.user.login, { primary: true })
    @StringField()
    login!: string;
    
    @Column({ select: false })        
    passwordHash?: string;

    @StringColumn(limits.imageUrl, { nullable: true })
    @StringField({
        nullable: true,
        description: 'User avatar picture url, or null of was not set.'
    })
    avatarUrl?: Nullable<string>;

    isAdmin() {
        return this.role === UserRole.Admin;
    }
}