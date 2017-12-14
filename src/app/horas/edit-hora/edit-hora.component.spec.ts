import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHoraComponent } from './edit-hora.component';

describe('EditHoraComponent', () => {
  let component: EditHoraComponent;
  let fixture: ComponentFixture<EditHoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
