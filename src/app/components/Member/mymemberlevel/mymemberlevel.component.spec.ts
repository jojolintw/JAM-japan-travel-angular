import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MymemberlevelComponent } from './mymemberlevel.component';

describe('MymemberlevelComponent', () => {
  let component: MymemberlevelComponent;
  let fixture: ComponentFixture<MymemberlevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MymemberlevelComponent]
    });
    fixture = TestBed.createComponent(MymemberlevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
