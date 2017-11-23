import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectColaboradorComponent } from './select-colaborador.component';

describe('SelectColaboradorComponent', () => {
  let component: SelectColaboradorComponent;
  let fixture: ComponentFixture<SelectColaboradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectColaboradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
