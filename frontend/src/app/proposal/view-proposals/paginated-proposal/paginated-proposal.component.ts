import { Component, OnInit, Input } from '@angular/core';
import { PaginatedProposal } from '@app/proposal/interfaces';

@Component({
  selector:    'app-paginated-proposal',
  templateUrl: './paginated-proposal.component.html',
  styleUrls:  ['./paginated-proposal.component.scss']
})
export class PaginatedProposalComponent implements OnInit {
    @Input() proposal!: PaginatedProposal;

    ngOnInit() {
    }

}
