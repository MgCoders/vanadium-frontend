import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisHorasComponent } from './mis-horas.component';

describe('MisHorasComponent', () => {
  let component: MisHorasComponent;
  let fixture: ComponentFixture<MisHorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisHorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
