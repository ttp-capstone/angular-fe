import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { CommonModule, DOCUMENT, NgStyle } from '@angular/common';
import { DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { WidgetsDropdownComponentUsers } from '../widgets/widgets-dropdown-users/widgets-dropdown-users.component';
import { ChartOptions } from 'chart.js';
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

interface User {
  id: number;
  email: string;
  role: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TextColorDirective, RouterModule,WidgetsDropdownComponentUsers, CardComponent, HttpClientModule, NgFor, CommonModule, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective,NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, CardHeaderComponent, TableDirective, AvatarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnInit {

  users: User[] = [];
  token: string | null = null; // Ensure token is initialized as null

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.token = this.authService.getToken(); // Retrieve token on component initialization

    if (this.token) {
      this.fetchData(); // Fetch data only if token is available
    } else {
      console.error('Authentication token not found'); // Log error if token is not found
    }
  }

  fetchData(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Use this.token directly
    });

    this.httpClient.get<User[]>('http://localhost:8005/users', { headers }).subscribe(
      (response) => {
        console.log(response);
        this.users = response;
      },
      (error) => {
        console.error('Fetching data failed', error);
        // Handle error here (e.g., show error message to user)
      }
    );
  }
}