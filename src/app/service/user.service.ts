import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";
import {  throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "http://localhost:8005/users/"  // Replace with your API URL

  constructor(
    private http: HttpClient,
    private router: Router,

  ) { }

  getUser(): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      const username = decoded.sub;
      if (username) {
        const headers = new HttpHeaders({
          'Authorization': "Bearer " + jwtToken,
          'Username': username
        });
        return this.http.get<any>(`${this.apiUrl}me`, {headers: headers });
      } else {
        this.router.navigate(['/login']);
        return throwError(() => new Error('Please login to continue.'));
      }
    }
    this.router.navigate(['/login']);
    return throwError(() => new Error('Please login to continue.'));
  }

  updateUser(userData: any): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      const username = decoded.sub;
      if (username) {
        const headers = new HttpHeaders({
          'Authorization': "Bearer " + jwtToken,
          'Username': username
        });
      return this.http.post<any>(`${this.apiUrl}me`, userData, {headers: headers });

      } else {
        console.error('Username not found in JWT payload');
        return of(null);
      }
    }
    this.router.navigate(['/login']);
    return throwError(() => new Error('Please login to continue.'));
    
  }

}
