import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsDropdownComponentApplications } from './widgets-dropdown-applications.component';

describe('WidgetsDropdownApplicationsComponent', () => {
  let component: WidgetsDropdownComponentApplications;
  let fixture: ComponentFixture<WidgetsDropdownComponentApplications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetsDropdownComponentApplications]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WidgetsDropdownComponentApplications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
