// src/app/routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
  path: '',
  loadComponent: () => import('./account/account.component').then(m => m.AccountComponent),
    data: {
      title: $localize`Settings`
    }
  },
  {
    path: 'logout',
    loadComponent: () => import('./cust-logout/cust-logout.component').then(m => m.CustLogoutComponent),
    data: {
      title: 'Logout'
    }
  }
];
