// src/app/routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'form'
    },
    children: [
      {
        path: '',
        redirectTo: 'form',
        pathMatch: 'full'
      },
      {
        path: 'form',
        loadComponent: () => import('./form.component').then(m => m.FormComponent),
        data: {
          title: 'form'
        }
      }
    ]
  }
];
