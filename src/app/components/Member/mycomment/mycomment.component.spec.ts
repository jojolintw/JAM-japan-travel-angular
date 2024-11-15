import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycommentComponent } from './mycomment.component';

describe('MycommentComponent', () => {
  let component: MycommentComponent;
  let fixture: ComponentFixture<MycommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MycommentComponent]
    });
    fixture = TestBed.createComponent(MycommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
