import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioAlmacenComponent } from './inventario-almacen.component';

describe('InventarioAlmacenComponent', () => {
  let component: InventarioAlmacenComponent;
  let fixture: ComponentFixture<InventarioAlmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioAlmacenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
