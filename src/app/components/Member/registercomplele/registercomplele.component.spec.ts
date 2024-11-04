import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistercompleleComponent } from './registercomplele.component';

describe('RegistercompleleComponent', () => {
  let component: RegistercompleleComponent;
  let fixture: ComponentFixture<RegistercompleleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistercompleleComponent]
    });
    fixture = TestBed.createComponent(RegistercompleleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
