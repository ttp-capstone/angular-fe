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
        loadComponent: () => import('./project/project.component').then(m => m.ProjectComponent),
        data: {
          title: 'project'
        }
      },
      {
        path: 'create',
        loadComponent: () => import('./create-project/create-project.component').then(m => m.CreateProjectComponent),
        data: {
          title: 'project'
        }
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./edit-project/edit-project.component').then(m => m.EditProjectComponent),
        data: {
          title: 'project'
        }
      },
      {
        path: ':id',
        loadComponent: () => import('./view-project/view-project.component').then(m => m.ViewProjectComponent),
        data: {
          title: 'project'
        }
      }
    ]
  }
];
