import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = "http://localhost:8005/auth/"  // Replace with your API URL

  constructor(private http: HttpClient) { }
  private createAuhtorizationHeader() {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
      return new HttpHeaders().set(
        "Authorization", "Bearer " + jwtToken
      )
    } else {
      console.log("JWT token not found in local storage");
    }
    return new HttpHeaders();
  }


  createProject(projectData: any): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');

    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      console.log("deocded"+ decoded);
      
    }
    return this.http.post<any>(`${this.apiUrl}my/projects`, projectData, {
      headers: this.createAuhtorizationHeader()

    });
    
  }

  getProject(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateProject(id: string, projectData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, projectData);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  allProject(id: string): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      // console.log("deocded"+ decoded.username);
      
    }else{
      console.log("no jwt");
    }

     return this.http.post<any>(`${this.apiUrl}my/projects`, {
      headers: this.createAuhtorizationHeader() 

    });
  }
}
