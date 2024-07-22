import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';




interface Funding {
  id: number;
  programName: string;
  fundingMinistry: string;
  fundingType: string;
  fundingAmount: number;
  deadline: string;
  overview: string;
  details: string;
  qualifications: string;
  status: string;
  orgType: string;
  createdAt: string;
}


@Component({
  selector: 'app-view-funding',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule , RouterModule,HttpClientModule],
  templateUrl: './view-funding.component.html',
  styleUrls: ['./view-funding.component.scss']
})

export class ViewFundingComponent implements OnInit {

  fundingId: number = 0;
  funding: Funding = {
    id: 0,
    programName: '',
    fundingMinistry: '',
    fundingType: '',
    fundingAmount: 0,
    deadline: '',
    overview: '',
    details: '',
    qualifications: '',
    status: '',
    orgType: '',
    createdAt: ''
  };

  updatedStatus: string = 'Pending'; // Default value
  updateSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Retrieve funding ID from route parameter
    this.fundingId = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch funding details based on ID
    this.fetchFundingDetails();
  }

  fetchFundingDetails() {
    this.httpClient.get<Funding>(`http://localhost:8005/auth/admin/funding/${this.fundingId}`)
      .subscribe(
        (response) => {
          console.log(response);
          this.funding = response;
          this.updatedStatus = this.funding.status; // Set initial value for updatedStatus
        },
        (error) => {
          console.error('Failed to fetch funding details', error);
        }
      );
  }

  onSubmit() {
    // Update the funding status
    this.funding.status = this.updatedStatus;

    // Send updated status to backend API for saving (assuming a PUT request)
    this.httpClient.post(`http://localhost:8005/auth/admin/funding/${this.fundingId}`, this.funding)
      .subscribe(
        (response) => {
          console.log('Status updated successfully', response);
          this.updateSuccess = true;
          setTimeout(() => {
            this.updateSuccess = false; // Reset update success message after 3 seconds
          }, 3000);
          // Optionally navigate to another route or display a success message
        },
        (error) => {
          console.error('Failed to update status', error);
          // Handle error, display error message, etc.
        }
      );
  }

  goBack() {
    this.router.navigate(['theme/typography']); // Navigate to home or list view
  }
}


@NgModule({
  declarations: [
    // AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    FormsModule,
    ViewFundingComponent // Add this line if you are not using standalone components
  ],
  providers: [],
  bootstrap: []
})

export class AppModule { }
