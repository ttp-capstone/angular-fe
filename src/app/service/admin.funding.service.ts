import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FundingServiceAdmin {
  private apiUrl = "http://localhost:8005/auth"; // Replace with your API URL

  constructor(private http: HttpClient, private router: Router) { }

  private createAuthorizationHeader(): HttpHeaders {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
      return new HttpHeaders().set("Authorization", "Bearer " + jwtToken);
    } else {
      console.log("JWT token not found in local storage");
    }
    return new HttpHeaders();
  }

  getMatchingFundingadmin(id: string): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      const username = decoded.sub;
      if (username) {
        const headers = new HttpHeaders({
          'Authorization': "Bearer " + jwtToken,
          'Username': username
        });
        return this.http.get<any>(`${this.apiUrl}/funding/matched/${id}`, { headers });
      } else {
        console.error('Username not found in JWT payload');
        return of(null);
      }
    }
    this.router.navigate(['/admin/login']); // Redirect to login if JWT not found
    return of(null);
  }

  getFundingadmin(fundingId: string, projectId: string): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      const username = decoded.sub;
      if (username) {
        const headers = new HttpHeaders({
          'Authorization': "Bearer " + jwtToken,
          'Username': username
        });
        return this.http.get<any>(`${this.apiUrl}/view/funding/${fundingId}/${projectId}`, { headers });
      } else {
        console.error('Username not found in JWT payload');
        return of(null);
      }
    }
    this.router.navigate(['/admin/login']); // Redirect to login if JWT not found
    return of(null);
  }

  applyFundingadmin(fundingId: string, projectId: string): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      const username = decoded.sub;
      if (username) {
        const headers = new HttpHeaders({
          'Authorization': "Bearer " + jwtToken,
          'Username': username
        });
        return this.http.post<any>(`${this.apiUrl}/apply/funding/${fundingId}/${projectId}`, null, { headers });
      } else {
        console.error('Username not found in JWT payload');
        return of(null);
      }
    }
    this.router.navigate(['/admin/login']); // Redirect to login if JWT not found
    return of(null);
  }

  deleteFundingAdmin(fundingId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/funding/${fundingId}`);
  }

  allFundingAdmin(): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      const decoded: any = jwtDecode(jwtToken);
      const userId = decoded.sub; // Assuming JWT payload has id field for user ID
      const headers = new HttpHeaders({
        'Authorization': "Bearer " + jwtToken,
        'Username': userId
      });
      return this.http.get<any>(`${this.apiUrl}/admin/funding`, { headers });
    } else {
      console.log("No JWT token");
      this.router.navigate(['/admin/login']); // Redirect to login if JWT not found
      return of([]);
    }
  }
}
