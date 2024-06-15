// src/app/routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'projects'
    },
    children: [
      {
        path: '',
        redirectTo: 'project',
        pathMatch: 'full'
      },
      {
        path: 'project',
        loadComponent: () => import('./project.component').then(m => m.ProjectComponent),
        data: {
          title: 'project'
        }
      }
    ]
  }
];
