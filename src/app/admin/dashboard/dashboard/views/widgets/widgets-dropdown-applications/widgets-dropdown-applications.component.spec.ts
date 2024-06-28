import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsDropdownApplicationsComponent } from './widgets-dropdown-applications.component';

describe('WidgetsDropdownApplicationsComponent', () => {
  let component: WidgetsDropdownApplicationsComponent;
  let fixture: ComponentFixture<WidgetsDropdownApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetsDropdownApplicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WidgetsDropdownApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
