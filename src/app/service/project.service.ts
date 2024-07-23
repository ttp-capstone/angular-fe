import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {  throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = "http://localhost:8005/auth/"  // Replace with your API URL

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) { }
  // private createAuhtorizationHeader() {
  //   const jwtToken = localStorage.getItem('jwt');
  //   if (jwtToken) {
  //     console.log("JWT token found in local storage", jwtToken);
  //     return new HttpHeaders().set(
  //       "Authorization", "Bearer " + jwtToken
  //     )
  //   } else {
  //     console.log("JWT token not found in local storage");
      
  //   }
  //   return new HttpHeaders();
  // }

  
  createProject(projectData: any): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      const username = decoded.sub;
      if (username) {
        const headers = new HttpHeaders({
          'Authorization': "Bearer " + jwtToken,
          'Username': username
        });
      return this.http.post<any>(`${this.apiUrl}my/projects`, projectData, {headers: headers });

      } else {
        this.router.navigate(['/login']);
        return throwError(() => new Error('Please login to continue.'));

      }
    }
    this.router.navigate(['/login']);
    return throwError(() => new Error('Please login to continue.'));

    
  }

  getProject(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}my/projects/${id}`);
  }

  updateProject(id: string, projectData: any): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      const username = decoded.sub;
      if (username) {
        const headers = new HttpHeaders({
          'Authorization': "Bearer " + jwtToken,
          'Username': username
        });
      return this.http.post<any>(`${this.apiUrl}my/projects/${id}`, projectData, {headers: headers });

      } else {
        this.router.navigate(['/login']);
        return throwError(() => new Error('Please login to continue.'));
      }
    }
    this.router.navigate(['/login']);
    return throwError(() => new Error('Please login to continue.'));
    
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  allProjects(page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    const jwtToken = localStorage.getItem('jwt');
    const userId = null;
    if (jwtToken) {
      const decoded: any = jwtDecode(jwtToken);
      // console.log('Decoded user ID:', decoded.sub); // Decode JWT token
      const userId = decoded.sub; // Assuming JWT payload has id field for user ID
      // console.log('Decoded user ID:', userId);
      const headers = new HttpHeaders({
        'Authorization': "Bearer " + jwtToken,
        'Username': userId
      });
      return this.http.get<any>(`${this.apiUrl}my/projects`, { headers, params });
    }else{
      this.router.navigate(['/login']);
        return throwError(() => new Error('Please login to continue.'));
    }
    this.router.navigate(['/login']);
    return throwError(() => new Error('Please login to continue.'));
  }

    listNewProjects(): Observable<any> {
     
      const jwtToken = localStorage.getItem('jwt');
      const userId = null;
      if (jwtToken) {
        const decoded: any = jwtDecode(jwtToken);
        // console.log('Decoded user ID:', decoded.sub); // Decode JWT token
        const userId = decoded.sub; // Assuming JWT payload has id field for user ID
        // console.log('Decoded user ID:', userId);
        const headers = new HttpHeaders({
          'Authorization': "Bearer " + jwtToken,
          'Username': userId
        });
        return this.http.get<any>(`${this.apiUrl}my/projects/new`, { headers });
      }else{
        this.router.navigate(['/login']);
        return throwError(() => new Error('Please login to continue.'));
      }
      this.router.navigate(['/login']);
      return throwError(() => new Error('Please login to continue.'));
    }
}
