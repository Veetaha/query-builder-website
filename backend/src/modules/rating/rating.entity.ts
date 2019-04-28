import { ObjectType } from 'type-graphql';
import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';


import { User     } from '@modules/user/user.entity';
import { Proposal } from '@modules/proposal/proposal.entity';
import { 
    StringField, 
    IntField, 
    BooleanField 
} from '@utils/gql/decorators/explicit-type-field.decorator';


/**
 * Join table for propsals and viewer users, also represent the rating users 
 * define for proposals.
 */
@ObjectType({
    description: "Represents a [dis]like instance that the users put to proposals."
})
@Entity()
export class Rating {

    @ManyToOne(_type => User,     { primary: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'raterLogin' })
    rater!: Promise<User>;

    @ManyToOne(_type => Proposal, { primary: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'proposalId' })
    proposal!: Promise<Proposal>;
    
    @PrimaryColumn()    
    @StringField({ description: 'Login of the user that rated the proposal.' })
    raterLogin!: string;

    @PrimaryColumn()
    @IntField({ description: 'Id of the proposal that the user rated.' })
    proposalId!: number;

    @Column()
    @BooleanField({ description: 'Defines whether the user liked the proposal or not.' })
    liked!: boolean;
}