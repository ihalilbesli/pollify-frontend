import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionManageComponent } from './option-manage.component';

describe('OptionManageComponent', () => {
  let component: OptionManageComponent;
  let fixture: ComponentFixture<OptionManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
