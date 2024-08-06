import { Component, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT, NgStyle } from '@angular/common';
import { DestroyRef, effect, inject, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { WidgetsDropdownComponentUsers } from '../widgets/widgets-dropdown-users/widgets-dropdown-users.component';
import { ChartOptions } from 'chart.js';
import { NgFor } from '@angular/common';

import { UserService } from 'src/app/service/user.service';
import { AuthService } from './users.service';
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
import { filter } from 'rxjs/operators';

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
  filteredUsers: User[] = [];
  searchControl = new FormControl('');

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
    this.searchControl.valueChanges
      .pipe(filter(value => value !== null))
      .subscribe(value => {
        this.filterUsers(value as string);
      });
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

  filterUsers(searchTerm: string) {
    if (!searchTerm) {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  // deleteUser(userId: number) {
  //   if (confirm('Are you sure you want to delete this user?')) {
  //     this.userService.deleteUser(userId).subscribe(
  //       (response) => {
  //         console.log('User deleted successfully', response);
  //         this.fetchData();
  //       },
  //       (error) => {
  //         console.error('Failed to delete user', error);
  //       }
  //     );
  //   }
  // }
  // onCreate() {
  //   this.router.navigate(['/create-user']);
  // }
}
