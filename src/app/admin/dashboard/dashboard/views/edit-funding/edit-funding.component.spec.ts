import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFundingComponent } from './edit-funding.component';

describe('EditApplicationComponent', () => {
  let component: EditFundingComponent;
  let fixture: ComponentFixture<EditFundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFundingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
