import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllpedidoComponent } from './allpedido.component';

describe('AllpedidoComponent', () => {
  let component: AllpedidoComponent;
  let fixture: ComponentFixture<AllpedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllpedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllpedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
