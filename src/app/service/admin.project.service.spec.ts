import { TestBed } from '@angular/core/testing';

import { ProjectServiceAdmin } from './admin.project.service';

describe('ProjectServiceAdmin', () => {
  let service: ProjectServiceAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectServiceAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


