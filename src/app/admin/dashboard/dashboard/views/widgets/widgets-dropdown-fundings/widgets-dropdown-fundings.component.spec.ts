import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsDropdownFundingsComponent } from './widgets-dropdown-fundings.component';

describe('WidgetsDropdownFundingsComponent', () => {
  let component: WidgetsDropdownFundingsComponent;
  let fixture: ComponentFixture<WidgetsDropdownFundingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetsDropdownFundingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WidgetsDropdownFundingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
