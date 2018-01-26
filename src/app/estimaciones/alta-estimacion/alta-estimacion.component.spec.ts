import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEstimacionComponent } from './alta-estimacion.component';

describe('AltaEstimacionComponent', () => {
  let component: AltaEstimacionComponent;
  let fixture: ComponentFixture<AltaEstimacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaEstimacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEstimacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
