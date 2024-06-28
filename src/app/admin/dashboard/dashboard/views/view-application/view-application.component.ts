import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
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
  selector: 'app-view-application',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.scss']
})

export class ViewApplicationComponent implements OnInit {

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

  updatedStatus: string = '';

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    // Retrieve application ID from route parameter
    this.applicationId = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch application details based on ID
    this.fetchApplicationDetails();
  }

  fetchApplicationDetails() {
    this.httpClient.get<Application>(`http://localhost:8005/auth/admin/projects/${this.applicationId}`)
      .subscribe(
        (response) => {
          console.log(response);
          this.application = response;
          this.updatedStatus = this.application.status; // Set initial value for updatedStatus
        },
        (error) => {
          console.error('Failed to fetch application details', error);
        }
      );
  }

  onSubmit() {
    // Update the application status
    this.application.status = this.updatedStatus;

    // Send updated status to backend API for saving (assuming a PUT request)
    this.httpClient.post(`http://localhost:8005/auth/admin/projects/${this.applicationId}`, this.application)
      .subscribe(
        (response) => {
          console.log('Status updated successfully', response);
          // Optionally navigate to another route or display a success message
        },
        (error) => {
          console.error('Failed to update status', error);
          // Handle error, display error message, etc.
        }
      );
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
    ViewApplicationComponent // Add this line if you are not using standalone components
  ],
  providers: [],
  bootstrap: []
})

export class AppModule { }
