import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletCoreComponent } from './outlet-core.component';

describe('OutletCoreComponent', () => {
  let component: OutletCoreComponent;
  let fixture: ComponentFixture<OutletCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutletCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
