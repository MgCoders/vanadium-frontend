import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaTareaComponent } from './alta-tarea.component';

describe('AltaTareaComponent', () => {
  let component: AltaTareaComponent;
  let fixture: ComponentFixture<AltaTareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaTareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
