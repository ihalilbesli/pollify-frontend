import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollJoinedComponent } from './poll-joined.component';

describe('PollJoinedComponent', () => {
  let component: PollJoinedComponent;
  let fixture: ComponentFixture<PollJoinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollJoinedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollJoinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
