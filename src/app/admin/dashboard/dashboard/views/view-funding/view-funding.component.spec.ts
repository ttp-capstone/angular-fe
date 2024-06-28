import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFundingComponent } from './view-funding.component';

describe('ViewFundingComponent', () => {
  let component: ViewFundingComponent;
  let fixture: ComponentFixture<ViewFundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewFundingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
