import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewApplicationComponent } from '../view-application/view-application.component';




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
  selector: 'app-edit-funding',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule, ReactiveFormsModule,RouterModule],
  templateUrl: './edit-funding.component.html',
  styleUrls: ['./edit-funding.component.scss']
})

export class EditFundingComponent implements OnInit {

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

  editFundingForm: FormGroup;
  updateSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.editFundingForm = this.formBuilder.group({
      programName: ['', Validators.required],
      fundingMinistry: ['', Validators.required],
      fundingType: ['', Validators.required],
      fundingAmount: ['', Validators.required],
      deadline: ['', Validators.required],
      overview: ['', Validators.required],
      details: ['', Validators.required],
      qualifications: ['', Validators.required],
      status: ['', Validators.required],
      orgType: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fundingId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchFundingDetails();
  }

  fetchFundingDetails() {
    this.httpClient.get<Funding>(`http://localhost:8005/auth/admin/funding/${this.fundingId}`)
      .subscribe(
        (response) => {
          this.funding = response;
          this.editFundingForm.patchValue(this.funding);
        },
        (error) => {
          console.error('Failed to fetch funding details', error);
        }
      );
  }

  onSubmit() {
    if (this.editFundingForm.valid) {
      const updatedFunding = { ...this.funding, ...this.editFundingForm.value };
      this.httpClient.post(`http://localhost:8005/auth/admin/funding/${this.fundingId}`, updatedFunding)
        .subscribe(
          (response) => {
            console.log('Funding updated successfully', response);
            this.updateSuccess = true;
            setTimeout(() => {
              this.updateSuccess = false; // Reset update success message after 3 seconds
            }, 3000);
          },
          (error) => {
            console.error('Failed to update funding', error);
          }
        );
    }
  }

  goBack() {
    this.router.navigate(['/view-funding', this.fundingId]);
  }
}
// @NgModule({
//   declarations: [
//     // AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     RouterModule.forRoot([]),
//     FormsModule,
//     ReactiveFormsModule,
//     EditApplicationComponent // Add this line if you are not using standalone components
//   ],
//   providers: [],
//   bootstrap: []
// })

// export class AppModule { }
