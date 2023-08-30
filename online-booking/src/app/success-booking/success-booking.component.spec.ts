import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessBookingComponent } from './success-booking.component';

describe('SuccessBookingComponent', () => {
  let component: SuccessBookingComponent;
  let fixture: ComponentFixture<SuccessBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessBookingComponent]
    });
    fixture = TestBed.createComponent(SuccessBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
