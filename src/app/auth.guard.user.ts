import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardUser implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const jwtToken = localStorage.getItem('jwt');
    console.log(jwtToken);
    if (jwtToken) {
        
      // You can add further checks here if needed (e.g., token expiration)
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
