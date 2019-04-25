import { ObjectType, Field } from 'type-graphql';
import { 
    Entity, CreateDateColumn, UpdateDateColumn, Column, PrimaryColumn 
} from 'typeorm';

import * as I from '@app/interfaces';
import { UserRole          } from './user-role.enum';
import { IntegerRange      } from '@utils/math/integer-range.class';
import { StringLength      } from '@utils/validation/string-length.decorator';
import { Validations       } from '@utils/validation/validations.decorator';
import { ValidateIfPresent } from '@utils/validation/validate-if-present.decorator';
import { StringField, DateField } from '@utils/gql/decorators/explicit-type-field.decorator';
import { Nullable } from '@utils/gql/opts';


@ObjectType()
@Entity()
export class User {
    static readonly limits = {
        name:      new IntegerRange(3, 256),
        password:  new IntegerRange(5, 37),
        login:     new IntegerRange(2, 37),
        avatarUrl: new IntegerRange(0, 256)
    };

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

    @Validations(StringLength(User.limits.name))
    @Column({ length: User.limits.name.max })
    @StringField()        
    name!: string;

    @Validations(StringLength(User.limits.login))
    @PrimaryColumn({ length: User.limits.login.max }) 
    @StringField()
    login!: string;
    
    @Column({ select: false })        
    passwordHash?: string;

    @Validations(
        StringLength(User.limits.avatarUrl),
        ValidateIfPresent
    )
    @Column({ 
        type:    'varchar',
        length:   User.limits.avatarUrl.max, 
        nullable: true 
    })
    @StringField(Nullable)
    avatarUrl?: I.Nullable<string>;
}