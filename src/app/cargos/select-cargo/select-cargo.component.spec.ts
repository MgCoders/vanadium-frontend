import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCargoComponent } from './select-cargo.component';

describe('SelectCargoComponent', () => {
  let component: SelectCargoComponent;
  let fixture: ComponentFixture<SelectCargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
