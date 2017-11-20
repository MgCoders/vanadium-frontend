import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCargosComponent } from './lista-cargos.component';

describe('ListaCargosComponent', () => {
  let component: ListaCargosComponent;
  let fixture: ComponentFixture<ListaCargosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCargosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCargosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
