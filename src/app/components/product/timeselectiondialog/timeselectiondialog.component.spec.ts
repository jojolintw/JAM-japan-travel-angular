import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeselectiondialogComponent } from './timeselectiondialog.component';

describe('TimeselectiondialogComponent', () => {
  let component: TimeselectiondialogComponent;
  let fixture: ComponentFixture<TimeselectiondialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeselectiondialogComponent]
    });
    fixture = TestBed.createComponent(TimeselectiondialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
