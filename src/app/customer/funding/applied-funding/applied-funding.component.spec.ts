import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedFundingComponent } from './applied-funding.component';

describe('AppliedFundingComponent', () => {
  let component: AppliedFundingComponent;
  let fixture: ComponentFixture<AppliedFundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppliedFundingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppliedFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
