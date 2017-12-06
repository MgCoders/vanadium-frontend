import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectHoraDesdeComponent } from './select-hora-desde.component';

describe('SelectHoraDesdeComponent', () => {
  let component: SelectHoraDesdeComponent;
  let fixture: ComponentFixture<SelectHoraDesdeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectHoraDesdeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectHoraDesdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
