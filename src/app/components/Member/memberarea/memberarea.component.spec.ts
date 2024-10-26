import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberareaComponent } from './memberarea.component';

describe('MemberareaComponent', () => {
  let component: MemberareaComponent;
  let fixture: ComponentFixture<MemberareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberareaComponent]
    });
    fixture = TestBed.createComponent(MemberareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
