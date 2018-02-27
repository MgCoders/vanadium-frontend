import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteHorasDelMesComponent } from './reporte-horas-del-mes.component';

describe('ReporteHorasDelMesComponent', () => {
  let component: ReporteHorasDelMesComponent;
  let fixture: ComponentFixture<ReporteHorasDelMesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteHorasDelMesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteHorasDelMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
