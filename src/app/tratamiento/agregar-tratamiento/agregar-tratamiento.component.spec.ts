import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTratamientoComponent } from './agregar-tratamiento.component';

describe('AgregarTratamientoComponent', () => {
  let component: AddTratamientoComponent;
  let fixture: ComponentFixture<AddTratamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTratamientoComponent]
    });
    fixture = TestBed.createComponent(AddTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
