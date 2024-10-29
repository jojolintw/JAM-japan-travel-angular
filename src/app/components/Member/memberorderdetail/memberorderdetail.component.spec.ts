import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberorderdetailComponent } from './memberorderdetail.component';

describe('MemberorderdetailComponent', () => {
  let component: MemberorderdetailComponent;
  let fixture: ComponentFixture<MemberorderdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberorderdetailComponent]
    });
    fixture = TestBed.createComponent(MemberorderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
