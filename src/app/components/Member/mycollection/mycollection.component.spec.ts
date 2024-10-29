import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycollectionComponent } from './mycollection.component';

describe('MycollectionComponent', () => {
  let component: MycollectionComponent;
  let fixture: ComponentFixture<MycollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MycollectionComponent]
    });
    fixture = TestBed.createComponent(MycollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
