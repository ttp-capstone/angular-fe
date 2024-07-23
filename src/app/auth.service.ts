// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'YOUR_API_URL_HERE';

  constructor(private http: HttpClient) { }

  postWithAuth(): Observable<any> {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      const decoded: any = jwtDecode(jwtToken);
      const username = decoded.sub;
      if (username) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${jwtToken}`,
          'Username': username
        });
        return this.http.post<any>(this.apiUrl, {}, { headers });
      } else {
        console.error('Username not found in JWT');
        return of(null);
      }
    }
    return of(null);
  }
}


