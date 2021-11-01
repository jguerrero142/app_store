import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaFacturaComponent } from './caja-factura.component';

describe('CajaFacturaComponent', () => {
  let component: CajaFacturaComponent;
  let fixture: ComponentFixture<CajaFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaFacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
