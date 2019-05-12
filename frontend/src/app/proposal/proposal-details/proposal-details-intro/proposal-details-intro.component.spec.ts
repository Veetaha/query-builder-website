import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalDetailsIntroComponent } from './proposal-details-intro.component';

describe('ProposalDetailsIntroComponent', () => {
  let component: ProposalDetailsIntroComponent;
  let fixture: ComponentFixture<ProposalDetailsIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalDetailsIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalDetailsIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
