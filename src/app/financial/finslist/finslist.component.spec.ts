import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinslistComponent } from './finslist.component';

describe('FinslistComponent', () => {
  let component: FinslistComponent;
  let fixture: ComponentFixture<FinslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
