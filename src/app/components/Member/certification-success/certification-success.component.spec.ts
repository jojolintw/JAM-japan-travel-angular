import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationSuccessComponent } from './certification-success.component';

describe('CertificationSuccessComponent', () => {
  let component: CertificationSuccessComponent;
  let fixture: ComponentFixture<CertificationSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificationSuccessComponent]
    });
    fixture = TestBed.createComponent(CertificationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
