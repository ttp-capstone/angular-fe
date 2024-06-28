import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsDropdownUsersComponent } from './widgets-dropdown-users.component';

describe('WidgetsDropdownUsersComponent', () => {
  let component: WidgetsDropdownUsersComponent;
  let fixture: ComponentFixture<WidgetsDropdownUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetsDropdownUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WidgetsDropdownUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
