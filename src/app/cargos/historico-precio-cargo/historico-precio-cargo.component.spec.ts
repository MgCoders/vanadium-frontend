import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoPrecioCargoComponent } from './historico-precio-cargo.component';

describe('HistoricoPrecioCargoComponent', () => {
  let component: HistoricoPrecioCargoComponent;
  let fixture: ComponentFixture<HistoricoPrecioCargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoPrecioCargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoPrecioCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
