import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})


export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Check if token exists before removing it
    const token = localStorage.getItem('jwt');
    if (token) {
      console.log('Token found in localStorage:', token);
      try {
        localStorage.removeItem('jwt');
        console.log('Token removed from localStorage.');
      } catch (error) {
        console.error('Error removing token from localStorage:', error);
      }
    } else {
      console.log('No token found in localStorage.');
    }

    // Redirect to login page
    this.router.navigate(['/admin/login']);
  } 
}