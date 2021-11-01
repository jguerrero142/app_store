import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaHomeComponent } from './caja-home.component';

describe('CajaHomeComponent', () => {
  let component: CajaHomeComponent;
  let fixture: ComponentFixture<CajaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
