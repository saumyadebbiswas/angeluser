import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpnextpartComponent } from './otpnextpart.component';

describe('OtpnextpartComponent', () => {
  let component: OtpnextpartComponent;
  let fixture: ComponentFixture<OtpnextpartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpnextpartComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpnextpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
