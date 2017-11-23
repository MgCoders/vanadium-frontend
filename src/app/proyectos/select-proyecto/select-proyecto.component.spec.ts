import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProyectoComponent } from './select-proyecto.component';

describe('SelectProyectoComponent', () => {
  let component: SelectProyectoComponent;
  let fixture: ComponentFixture<SelectProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
