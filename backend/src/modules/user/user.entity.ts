import { ObjectType, Field } from 'type-graphql';
import { 
    Entity, CreateDateColumn, UpdateDateColumn, Column 
} from 'typeorm';

import * as I from '@app/interfaces';
import { ConfigService } from '@modules/config/config.service';
import { Nullable      } from '@utils/gql/opts';
import { StringColumn  } from '@utils/orm/decorators/string-column.decorator';
import { UserRole      } from './user-role.enum';
import { StringField, DateField } from '@utils/gql/decorators/explicit-type-field.decorator';


const { limits } = ConfigService;

@ObjectType()
@Entity()
export class User {

    @CreateDateColumn() 
    @DateField()
    creationDate!: Date;

    @UpdateDateColumn() 
    @DateField()
    lastUpdateDate!: Date;

    // @OneToMany(_type => Proposal, proposal => proposal.creator)
    // proposals!: Promise<Proposal[]>;

    // @OneToMany(_type => Like, like => like.rater)
    // likes!: Promise<Like[]>;

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

    @StringColumn(limits.imageUrl, Nullable)
    @StringField(Nullable)
    avatarUrl?: I.Nullable<string>;

    isAdmin() {
        return this.role === UserRole.Admin;
    }
}