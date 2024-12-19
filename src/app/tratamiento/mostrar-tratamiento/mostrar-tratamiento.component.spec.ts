import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarTratamientoComponent } from './mostrar-tratamiento.component';

describe('MostrarTratamientoComponent', () => {
  let component: MostrarTratamientoComponent;
  let fixture: ComponentFixture<MostrarTratamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarTratamientoComponent]
    });
    fixture = TestBed.createComponent(MostrarTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
