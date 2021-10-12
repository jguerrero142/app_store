import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaFacturaComponent } from './reserva-factura.component';

describe('ReservaFacturaComponent', () => {
  let component: ReservaFacturaComponent;
  let fixture: ComponentFixture<ReservaFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaFacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
