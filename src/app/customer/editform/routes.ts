// src/app/routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'editForm'
    },
    children: [
      {
        path: '',
        redirectTo: 'editForm',
        pathMatch: 'full'
      },
      {
        path: 'editForm',
        loadComponent: () => import('./editform.component').then(m => m.editFormComponent),
        data: {
          title: 'editForm'
        }
      }
    ]
  }
];