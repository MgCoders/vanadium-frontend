import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaProyectoComponent } from './alta-proyecto.component';

describe('AltaProyectoComponent', () => {
  let component: AltaProyectoComponent;
  let fixture: ComponentFixture<AltaProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
