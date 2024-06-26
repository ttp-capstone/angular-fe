import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "http://localhost:8005/auth/"  // Replace with your API URL

  constructor(private http: HttpClient) { }

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
        console.error('Username not found in JWT payload');
        return of(null);
      }
    }
    return of(null);
  }

  updateUser(id: string): Observable<any> {
    // const jwtToken = localStorage.getItem('jwt');
    
    // if (jwtToken) {
    //   const decoded = jwtDecode(jwtToken);
    //   const username = decoded.sub;
    //   if (username) {
    //     const headers = new HttpHeaders({
    //       'Authorization': "Bearer " + jwtToken,
    //       'Username': username
    //     });
    //   return this.http.post<any>(`${this.apiUrl}my/projects/${id}`, projectData, {headers: headers });

    //   } else {
    //     console.error('Username not found in JWT payload');
    //     return of(null);
    //   }
    // }
    return of(null);
    
  }

}
