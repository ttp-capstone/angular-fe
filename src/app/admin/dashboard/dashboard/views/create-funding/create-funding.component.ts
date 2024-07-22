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
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {jwtDecode} from 'jwt-decode';
import { ProjectServiceAdmin } from 'src/app/service/admin.project.service';

interface Funding {
  id: number;
  createdAt: string;
  deadline: string;
  details: string;
  fundingAmount: number;
  fundingMinistry: string;
  fundingType: string;
  orgType: string;
  overview: string;
  programName: string;
  qualifications: string;
  status: string;
}


@Component({
  selector: 'app-create-funding',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule, ReactiveFormsModule,RouterModule],
  templateUrl: './create-funding.component.html',
  styleUrl: './create-funding.component.scss'
})

export class CreateFundingComponent implements OnInit {
  createFundingForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.createFundingForm = this.formBuilder.group({
      deadline: ['', Validators.required],
      details: ['', Validators.required],
      fundingAmount: [0, Validators.required],
      fundingMinistry: ['', Validators.required],
      fundingType: ['Grant'],
      orgType: ['Research'],
      overview: ['', Validators.required],
      programName: ['', Validators.required],
      qualifications: ['', Validators.required],
      status: ['Pending']
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.createFundingForm.valid) {
      const jwtToken = localStorage.getItem('jwt');
      if (!jwtToken) {
        this.router.navigate(['/admin/login']); // Redirect to login page if JWT is not found
        return;
      }

      const decoded: any = jwtDecode(jwtToken);
      const username = decoded.sub;
      if (!username) {
        console.error('Username not found in JWT payload');
        return;
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`,
        'Username': username
      });

      const newFunding: Funding = this.createFundingForm.value;
      this.httpClient.post<Funding>('http://localhost:8005/auth/admin/funding', newFunding, { headers })
        .subscribe(
          (response) => {
            console.log('Funding created successfully', response);
            // Optionally, redirect to view the created funding
            this.router.navigate(['/theme/typography']);
          },
          (error) => {
            console.error('Failed to create funding', error);
          }
        );
    }
  }

  goBack() {
    this.router.navigate(['/theme/typography']); // Navigate to home or list view
  }
}