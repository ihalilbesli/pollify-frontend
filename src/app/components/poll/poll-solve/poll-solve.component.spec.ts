import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollSolveComponent } from './poll-solve.component';

describe('PollSolveComponent', () => {
  let component: PollSolveComponent;
  let fixture: ComponentFixture<PollSolveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollSolveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollSolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
