import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectHoraHastaComponent } from './select-hora-hasta.component';

describe('SelectHoraHastaComponent', () => {
  let component: SelectHoraHastaComponent;
  let fixture: ComponentFixture<SelectHoraHastaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectHoraHastaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectHoraHastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
