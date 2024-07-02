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
  selector: 'app-edit-application',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule, ReactiveFormsModule,RouterModule],
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.scss']
})

export class EditApplicationComponent implements OnInit {
  applicationId: number = 0;
  application: Application = {
    id: 0,
    userId: 0,
    title: '',
    description: '',
    organizationType: '',
    organizationName: '',
    country: '',
    fundingType: '',
    status: '',
    createdAt: ''
  };
  editApplicationForm: FormGroup;
  updateSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.editApplicationForm = this.formBuilder.group({
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
    this.applicationId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchApplicationDetails();
  }

  fetchApplicationDetails() {
    this.httpClient.get<Application>(`http://localhost:8005/auth/admin/projects/${this.applicationId}`)
      .subscribe(
        (response) => {
          this.application = response;
          this.editApplicationForm.patchValue(this.application);
        },
        (error) => {
          console.error('Failed to fetch application details', error);
        }
      );
  }

  onSubmit() {
    if (this.editApplicationForm.valid) {
      const updatedApplication = { ...this.application, ...this.editApplicationForm.value };
      this.httpClient.post(`http://localhost:8005/auth/admin/projects/${this.applicationId}`, updatedApplication)
        .subscribe(
          (response) => {
            console.log('Application updated successfully', response);
            this.updateSuccess = true;
            setTimeout(() => {
              this.updateSuccess = false; // Reset update success message after 3 seconds
            }, 3000);
          },
          (error) => {
            console.error('Failed to update application', error);
          }
        );
    }
  }

  goBack() {
    this.router.navigate(['/view-application', this.applicationId]);
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
