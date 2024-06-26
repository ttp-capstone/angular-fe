import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, FormSelectDirective } from '@coreui/angular';
import { FundingService } from 'src/app/service/funding.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-view-funding',
  standalone: true,
  imports: [CommonModule, RouterModule, FormSelectDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective],
  templateUrl: './view-funding.component.html',
  styleUrl: './view-funding.component.scss'
})
export class ViewFundingComponent {
  project: any; 
  funding: any;
  appliedFunding: any;
  projectId: string = '';
  fundingId: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: FundingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve project ID from route parameter
    this.route.paramMap.subscribe(params => {
      this.fundingId = params.get('fundingId') || ''; 
      this.projectId = params.get('projectId') || ''; // 
      if (this.fundingId) {
        this.loadFundingDetails(this.fundingId, this.projectId);
      }
    });
  }

  loadFundingDetails(fundingId: string, projectId: string) {
    this.service.getFunding(fundingId, projectId).subscribe(
      (data) => {
        this.funding = data.funding;
        this.projectId = data.projectId;
        this.appliedFunding = data.appliedFunding;
        // console.log(funding);
      },
      (error) => {
        console.error('Error fetching funding details:', error);
      }
    );
  }

  goBack() {
    window.history.back();
  }

  applyFunding(fundingId: string, projectId: string) {
    this.service.applyFunding(fundingId, projectId).subscribe(
      (funding) => {
        this.funding = funding; 
        console.log("funding"+funding);
      },
      (error) => {
        console.error('Could not fetch funding details', error);
        // Handle error appropriately, e.g., show error message to user
      }
    );
  }

}
