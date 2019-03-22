import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BazzarComponent } from './bazzar.component';

describe('BazzarComponent', () => {
  let component: BazzarComponent;
  let fixture: ComponentFixture<BazzarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BazzarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BazzarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
