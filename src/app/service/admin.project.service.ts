import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode'; // Correctly import jwtDecode
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceAdmin {
  private apiUrl = "http://localhost:8005/auth";  // Replace with your API URL

  constructor(private http: HttpClient, private router: Router) { }

  private createAuthorizationHeader(): HttpHeaders {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
      return new HttpHeaders().set("Authorization", "Bearer " + jwtToken);
    } else {
      console.log("JWT token not found in local storage");
      this.router.navigate(['/admin/login']); // Redirect to login page
    }
    return new HttpHeaders();
  }

  createProjectadmin(projectData: any): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      const decoded: any = jwtDecode(jwtToken);
      console.log("Decoded", decoded);
    } else {
      this.router.navigate(['/admin/login']); // Redirect to login page if JWT is not found
      return of(null);
    }
    return this.http.post<any>(`${this.apiUrl}/my/projects`, projectData, {
      headers: this.createAuthorizationHeader()
    });
  }

  getProjectadmin(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateProjectadmin(id: string, projectData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, projectData, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteProjectadmin(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  allProjectAdmin(): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      const decoded: any = jwtDecode(jwtToken);
      const userId = decoded.sub; // Assuming JWT payload has id field for user ID
      const headers = new HttpHeaders({
        'Authorization': "Bearer " + jwtToken,
        'Username': userId
      });
      return this.http.get<any>(`${this.apiUrl}/admin/projects`, { headers });
    } else {
      console.log("No JWT token");
      this.router.navigate(['/admin/login']); // Redirect to login page if JWT is not found
      return of([]);
    }
  }

  updateProjectStatus(projectId: number, project: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<any>(`${this.apiUrl}/admin/projects/${projectId}`, project, { headers });
  }
  
}
