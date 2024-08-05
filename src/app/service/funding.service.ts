import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";
import {  throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FundingService {
  private apiUrl = "http://localhost:8005/auth/"  // Replace with your API URL

  constructor(private http: HttpClient,
    private router: Router,
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


  getMatchingFunding(id: string): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      const username = decoded.sub;
      if (username) {
        const headers = new HttpHeaders({
          'Authorization': "Bearer " + jwtToken,
          'Username': username
        });
        //console.log(this.http.get<any>(`${this.apiUrl}funding/matched/${id}`, {headers: headers }));
      return this.http.get<any>(`${this.apiUrl}funding/matched/${id}`, {headers: headers });

      } else {
        this.router.navigate(['/login']);
        return throwError(() => new Error('Please login to continue.'));
      }
    }
    this.router.navigate(['/login']);
        return throwError(() => new Error('Please login to continue.'));
    
  }

  getFunding(fundingId: string, projectId : string): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      const username = decoded.sub;
      if (username) {
        const headers = new HttpHeaders({
          'Authorization': "Bearer " + jwtToken,
          'Username': username
        });
        return this.http.get<any>(`${this.apiUrl}view/funding/${fundingId}/${projectId}`, {headers: headers});

      } else {
        this.router.navigate(['/login']);
        return throwError(() => new Error('Please login to continue.'));
      }
    }
    this.router.navigate(['/login']);
    return throwError(() => new Error('Please login to continue.'));
  }

  applyFunding(fundingId: string, projectId : string): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      const username = decoded.sub;
      if (username) {
        const headers = new HttpHeaders({
          'Authorization': "Bearer " + jwtToken,
          'Username': username
        });
        console.log(username);

        return this.http.post<any>(`${this.apiUrl}apply/funding/${fundingId}/${projectId}`,null, {headers});
      } else {
        this.router.navigate(['/login']);
        return throwError(() => new Error('Please login to continue.'));
      }
    }
    this.router.navigate(['/login']);
        return throwError(() => new Error('Please login to continue.'));
  }

  fetchAllAppliedFunding(): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      const username = decoded.sub;
      if (username) {
        const headers = new HttpHeaders({
          'Authorization': "Bearer " + jwtToken,
          'Username': username
        });
        return this.http.get<any>(`${this.apiUrl}all/applied_funding`, {headers: headers});

      } else {
        this.router.navigate(['/login']);
        return throwError(() => new Error('Please login to continue.'));
      }
    }
    this.router.navigate(['/login']);
    return throwError(() => new Error('Please login to continue.'));
  }

  listNewAppliedFunding(): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      const username = decoded.sub;
      if (username) {
        const headers = new HttpHeaders({
          'Authorization': "Bearer " + jwtToken,
          'Username': username
        });
        return this.http.get<any>(`${this.apiUrl}list/applied_funding`, {headers: headers});

      } else {
        this.router.navigate(['/login']);
        return throwError(() => new Error('Please login to continue.'));
      }
    }
    this.router.navigate(['/login']);
        return throwError(() => new Error('Please login to continue.'));
  }


 }
