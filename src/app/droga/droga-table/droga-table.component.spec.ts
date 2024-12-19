import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrogaTableComponent } from './droga-table.component';

describe('DrogaTableComponent', () => {
  let component: DrogaTableComponent;
  let fixture: ComponentFixture<DrogaTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrogaTableComponent]
    });
    fixture = TestBed.createComponent(DrogaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
