import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioHomeComponent } from './inventario-home.component';

describe('InventarioHomeComponent', () => {
  let component: InventarioHomeComponent;
  let fixture: ComponentFixture<InventarioHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
