import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  getToken(): string | null {
    return localStorage.getItem('jwt'); // Example: Fetch token from local storage
  }
}
