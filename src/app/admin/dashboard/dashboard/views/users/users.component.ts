import { Component, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT, NgStyle } from '@angular/common';
import { DestroyRef, effect, inject, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { WidgetsDropdownComponentUsers } from '../widgets/widgets-dropdown-users/widgets-dropdown-users.component';
import { ChartOptions } from 'chart.js';
import { NgFor } from '@angular/common';

import { UserService } from 'src/app/service/user.service';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  SidebarComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AuthService } from './users.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { filter } from 'rxjs';

interface User {
  id: number;
  email: string;
  fullName: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TextColorDirective, RouterModule, WidgetsDropdownComponentUsers, CardComponent, HttpClientModule, NgFor, CommonModule, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, CardHeaderComponent, TableDirective, AvatarComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  emailForm: FormGroup;
  filteredUsers: User[] = [];
  searchControl = new FormControl('');

  constructor(private httpClient: HttpClient, private authService: AuthService, private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      to_email: [''],
      subject: [''],
      message: ['']
    });
  }

  ngOnInit(): void {
    this.fetchData();
    this.searchControl.valueChanges
      .pipe(filter(value => value !== null))
      .subscribe(value => {
        this.filterUsers(value as string);
      });
  }


  filterUsers(searchTerm: string) {
    if (!searchTerm) {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.fullName.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }
  }

  fetchData(): void {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.httpClient.get<User[]>('http://localhost:8005/users/me/users', { headers }).subscribe(
      (response) => {
        console.log(response);
        this.users = response;
        this.filteredUsers = response; // Initialize filteredUsers with all users
      },
      (error) => {
        console.error('Fetching data failed', error);
        // Handle error here (e.g., show error message to user)
      }
    );
  }

  openEmailForm(email: string): void {
    this.emailForm.patchValue({ to_email: email });
    const emailModal = new bootstrap.Modal(document.getElementById('emailModal') as HTMLElement);
    emailModal.show();
  }

  sendEmail(): void {
    const serviceID = 'service_mc2u6g4'; // Replace with your actual service ID
    const templateID = 'template_t1pvqyc'; // Replace with your actual template ID
    const userID = '_EGWGWXs_DdsjGnat'; // Replace with your actual user ID

    const templateParams = this.emailForm.value;

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((result: EmailJSResponseStatus) => {
        console.log('Email sent successfully', result.text);
        alert('Email Sent Successfully');
        this.emailForm.reset();
        const emailModal = bootstrap.Modal.getInstance(document.getElementById('emailModal') as HTMLElement);
        emailModal.hide();
      }, (error) => {
        console.error('Email sending failed', error.text);
        // Handle error here (e.g., show error message to user)
      });
  }
}
