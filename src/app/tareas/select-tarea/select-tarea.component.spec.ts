import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTareaComponent } from './select-tarea.component';

describe('SelectTareaComponent', () => {
  let component: SelectTareaComponent;
  let fixture: ComponentFixture<SelectTareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
