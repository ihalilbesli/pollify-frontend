import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccesLogComponent } from './admin-acces-log.component';

describe('AdminAccesLogComponent', () => {
  let component: AdminAccesLogComponent;
  let fixture: ComponentFixture<AdminAccesLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAccesLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAccesLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
