import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
      const username = decoded.sub;
      if (username) {
        const headers = new HttpHeaders({
          'Authorization': "Bearer " + jwtToken,
          'Username': username
        });
      return this.http.post<any>(`${this.apiUrl}my/projects`, projectData, {headers: headers });

      } else {
        console.error('Username not found in JWT payload');
        return of(null);
      }
    }
    return of(null);
    
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
        console.error('Username not found in JWT payload');
        return of(null);
      }
    }
    return of(null);
    
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  allProjects(): Observable<any> {
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
      return this.http.get<any>(`${this.apiUrl}my/projects`, {headers: headers });
    }else{
      console.log("no jwt");
    }
    return of(null);
  }
}

// for admin //

// export class ProjectServiceAdmin {
//   private apiUrl = "http://localhost:8005/auth/admin/projects";  // Replace with your API URL

//   constructor(private http: HttpClient) { }

//   private createAuthorizationHeader(): HttpHeaders {
//     const jwtToken = localStorage.getItem('jwt');
//     if (jwtToken) {
//       console.log("JWT token found in local storage", jwtToken);
//       return new HttpHeaders().set("Authorization", "Bearer " + jwtToken);
//     } else {
//       console.log("JWT token not found in local storage");
//     }
//     return new HttpHeaders();
//   }

//   createProjectadmin(projectData: any): Observable<any> {
//     const jwtToken = localStorage.getItem('jwt');
//     if (jwtToken) {
//       const decoded = jwtDecode(jwtToken);
//       console.log("Decoded", decoded);
//     }
//     return this.http.post<any>(`${this.apiUrl}/my/projects`, projectData, {
//       headers: this.createAuthorizationHeader()
//     });
//   }

//   getProjectadmin(id: string): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/${id}`);
//   }

//   updateProjectadmin(id: string, projectData: any): Observable<any> {
//     return this.http.put<any>(`${this.apiUrl}/${id}`, projectData, {
//       headers: this.createAuthorizationHeader()
//     });
//   }

//   deleteProjectadmin(id: string): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/${id}`, {
//       headers: this.createAuthorizationHeader()
//     });
//   }

//   allProjectAdmin(): Observable<any> {
//     const jwtToken = localStorage.getItem('jwt');
//     if (jwtToken) {
//       const decoded: any = jwtDecode(jwtToken);
//       const userId = decoded.sub; // Assuming JWT payload has id field for user ID
//       const headers = new HttpHeaders({
//         'Authorization': "Bearer " + jwtToken,
//         'Username': userId
//       });
//       return this.http.get<any>(`${this.apiUrl}/my/projects`, { headers });
//     } else {
//       console.log("No JWT token");
//       return of([]); // Return an empty array as a default value
//     }
//   }
// }