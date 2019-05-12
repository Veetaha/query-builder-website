import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalDetailsMainPictureComponent } from './proposal-details-main-picture.component';

describe('ProposalDetailsMainPictureComponent', () => {
  let component: ProposalDetailsMainPictureComponent;
  let fixture: ComponentFixture<ProposalDetailsMainPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalDetailsMainPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalDetailsMainPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
