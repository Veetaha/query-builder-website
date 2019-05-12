import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalDetailsRatingComponent } from './proposal-details-rating.component';

describe('ProposalDetailsRatingComponent', () => {
  let component: ProposalDetailsRatingComponent;
  let fixture: ComponentFixture<ProposalDetailsRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalDetailsRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalDetailsRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
