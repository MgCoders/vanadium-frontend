import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoHorasComponent } from './historico-horas.component';

describe('HistoricoHorasComponent', () => {
  let component: HistoricoHorasComponent;
  let fixture: ComponentFixture<HistoricoHorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoHorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
