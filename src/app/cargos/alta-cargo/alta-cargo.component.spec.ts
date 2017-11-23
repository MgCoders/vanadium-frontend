import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaCargoComponent } from './alta-cargo.component';

describe('AltaCargoComponent', () => {
  let component: AltaCargoComponent;
  let fixture: ComponentFixture<AltaCargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaCargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
