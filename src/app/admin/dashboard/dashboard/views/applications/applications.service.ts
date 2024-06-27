import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl = 'https://your-backend-api-url/applications'; // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  getApplications(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
