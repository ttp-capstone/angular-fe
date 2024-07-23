import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";
import { Observable, of } from 'rxjs';
import {  throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerDasboardService {

  private apiUrl = "http://localhost:8005/users/"  // Replace with your API URL

  constructor(private http: HttpClient,
    private router: Router,
  ) { }

  dashboardData(): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      const username = decoded.sub;
      if (username) {
        const headers = new HttpHeaders({
          'Authorization': "Bearer " + jwtToken,
          'Username': username
        });
      return this.http.get<any>(`${this.apiUrl}customer/dashboard_data`, {headers: headers });

      } else {
        this.router.navigate(['/login']);
        return throwError(() => new Error('Please login to continue.'));
      }
    }
    this.router.navigate(['/login']);
        return throwError(() => new Error('Please login to continue.'));
    
  }
}
