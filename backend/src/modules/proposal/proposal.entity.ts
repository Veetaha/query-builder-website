import { ObjectType } from 'type-graphql';
import { 
    Entity, 
    CreateDateColumn, 
    UpdateDateColumn, 
    PrimaryGeneratedColumn, 
    JoinColumn, 
    ManyToOne, 
    Column
} from 'typeorm';

import * as I from '@app/interfaces';
import { User          } from '@modules/user/user.entity';
import { NullableOpt   } from '@utils/gql/opts';
import { StringColumn  } from '@utils/orm/decorators/string-column.decorator';
import { 
    StringField, DateField, IntField, BooleanField 
} from '@utils/gql/decorators/explicit-type-field.decorator';

import { limits } from '@common/constants';

@ObjectType()
@Entity()
export class Proposal {    
    @PrimaryGeneratedColumn()
    @IntField()
    id!: number;

    @CreateDateColumn() 
    @DateField()
    creationDate!: Date;

    @UpdateDateColumn() 
    @DateField()
    lastUpdateDate!: Date;

    @ManyToOne(_type => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'creatorLogin' })
    creator!: Promise<User>;

    @StringField() 
    @Column()
    creatorLogin!: string;

    @StringField() @StringColumn(limits.proposal.name)      name!:      string;
    @StringField() @StringColumn(limits.proposal.introText) introText!: string;
    @StringField() @StringColumn(limits.proposal.bodyText)  bodyText!:  string;
    
        
    @StringColumn(limits.imageUrl, NullableOpt)
    @StringField(NullableOpt)
    mainPictureUrl?: I.Nullable<string>;

    @Column({ default: 0 })
    @IntField({ 
        description: "Returns the total number of likes for this proposal."
    })
    likes!: number;

    @Column({ default: 0 })
    @IntField({
        description: "Returns the total number of dislikes for this proposal."
    })
    dislikes!: number;

    @Column({ default: true })
    @BooleanField({
        description: 
        "Defines whether the author of this proposal is ready to accept requests for it."
    })
    isOpenned!: boolean;
}