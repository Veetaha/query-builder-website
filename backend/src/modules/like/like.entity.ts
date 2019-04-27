import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ObjectType } from 'type-graphql';

import { User     } from '@modules/user/user.entity';
import { Proposal } from '@modules/proposal/proposal.entity';
import { StringField, IntField, BooleanField } from '@utils/gql/decorators/explicit-type-field.decorator';



@ObjectType()
@Entity()
export class Like {

    @ManyToOne(_type => User, { primary: true, cascade: ['remove'] })
    @JoinColumn({ name: 'raterLogin' })
    rater!: Promise<User>;

    @ManyToOne(_type => Proposal, { primary: true, cascade: ['remove'] })
    @JoinColumn({ name: 'proposalId' })
    proposal!: Promise<Proposal>;
    
    @PrimaryColumn()    
    @StringField({ description: 'Login of the user that set the like.' })
    raterLogin!: string;

    @PrimaryColumn()
    @IntField({ description: 'Id of the proposal that the user rated.' })
    proposalId!: number;

    @Column()
    @BooleanField({ description: 'Defines whether the user liked the proposal or not.' })
    liked!: boolean;
}