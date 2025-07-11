import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPoolsComponent } from './my-pools.component';

describe('MyPoolsComponent', () => {
  let component: MyPoolsComponent;
  let fixture: ComponentFixture<MyPoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPoolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
