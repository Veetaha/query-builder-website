import { ObjectType } from 'type-graphql';


import { Page     } from '@utils/gql/pagination/page.object';
import { Proposal } from '../proposal.entity';

@ObjectType()
export class ProposalPage extends Page(Proposal) {}