import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cart2Component } from './cart2.component';

describe('Cart2Component', () => {
  let component: Cart2Component;
  let fixture: ComponentFixture<Cart2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Cart2Component]
    });
    fixture = TestBed.createComponent(Cart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
