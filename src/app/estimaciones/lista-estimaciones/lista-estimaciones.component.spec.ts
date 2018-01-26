import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEstimacionesComponent } from './lista-estimaciones.component';

describe('ListaEstimacionesComponent', () => {
  let component: ListaEstimacionesComponent;
  let fixture: ComponentFixture<ListaEstimacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEstimacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEstimacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
