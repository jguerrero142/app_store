import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaTitleComponent } from './caja-title.component';

describe('CajaTitleComponent', () => {
  let component: CajaTitleComponent;
  let fixture: ComponentFixture<CajaTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
