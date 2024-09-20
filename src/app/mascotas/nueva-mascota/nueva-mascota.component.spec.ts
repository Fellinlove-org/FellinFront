import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaMascotaComponent } from './nueva-mascota.component';

describe('NuevaMascotaComponent', () => {
  let component: NuevaMascotaComponent;
  let fixture: ComponentFixture<NuevaMascotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaMascotaComponent]
    });
    fixture = TestBed.createComponent(NuevaMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
