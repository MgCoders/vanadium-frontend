import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaColaboradorComponent } from './alta-colaborador.component';

describe('AltaColaboradorComponent', () => {
  let component: AltaColaboradorComponent;
  let fixture: ComponentFixture<AltaColaboradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaColaboradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
