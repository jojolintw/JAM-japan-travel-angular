import { TestBed } from '@angular/core/testing';

import { MyareaService } from './myarea.service';

describe('MyareaService', () => {
  let service: MyareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
