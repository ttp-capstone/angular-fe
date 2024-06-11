// src/app/routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'register'
    },
    children: [
      {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full'
      },
      {
        path: 'register',
        loadComponent: () => import('./register.component').then(m => m.RegisterComponent),
        data: {
          title: 'register'
        }
      }
    ]
  }
];
