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


interface Application {
  id: number;
  userId: number;
  title: string;
  description: string;
  organizationType: string;
  organizationName: string;
  country: string;
  fundingType: string;
  status: string;
  createdAt: string;
}

@Component({
  selector: 'app-create-application',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule, ReactiveFormsModule,RouterModule],
  templateUrl: './create-application.component.html',
  styleUrl: './create-application.component.scss'
})


export class CreateApplicationComponent implements OnInit {
  createApplicationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private service: ProjectServiceAdmin
  ) {
    this.createApplicationForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      organizationType: ['Research'],
      organizationName: ['', Validators.required],
      country: ['', Validators.required],
      fundingType: ['Grant'],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    
    if (this.createApplicationForm.valid) {
      this.service.createProjectadmin(this.createApplicationForm.value).subscribe(
        (response) => {
          console.log('Project created successfully:', response);
          // Redirect to dashboard or any other route after successful project creation
          this.router.navigate(['applications']); 
         
        },
        (error) => {
          console.error('Could not create project', error);
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/']); // Navigate to home or list view
  }
}
