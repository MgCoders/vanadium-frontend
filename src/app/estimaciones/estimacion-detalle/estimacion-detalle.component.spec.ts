import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimacionDetalleComponent } from './estimacion-detalle.component';

describe('EstimacionDetalleComponent', () => {
  let component: EstimacionDetalleComponent;
  let fixture: ComponentFixture<EstimacionDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimacionDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimacionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
