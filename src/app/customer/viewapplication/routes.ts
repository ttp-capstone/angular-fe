// src/app/routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'viewapplication'
    },
    children: [
      {
        path: '',
        redirectTo: 'viewapplication',
        pathMatch: 'full'
      },
      {
        path: 'viewapplication',
        loadComponent: () => import('./viewapplication.component').then(m => m.ViewApplicationComponent),
        data: {
          title: 'viewapplication'
        }
      }
    ]
  }
];