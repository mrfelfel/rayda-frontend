import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerrorComponent } from './payerror.component';

describe('PayerrorComponent', () => {
  let component: PayerrorComponent;
  let fixture: ComponentFixture<PayerrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayerrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
