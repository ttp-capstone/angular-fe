import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      // You can add further checks here if needed (e.g., token expiration)
      return true;
    } else {
      this.router.navigate(['/admin/login']);
      return false;
    }
  }
}
