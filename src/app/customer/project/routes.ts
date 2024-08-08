// src/app/routes.ts
import { Routes } from '@angular/router';
import { AuthGuardUser } from '../../auth.guard.user'; // Import the AuthGuard

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'projects'
    },
    canActivate: [AuthGuardUser],
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
        , canActivate: [AuthGuardUser]
      },
      {
        path: 'create',
        loadComponent: () => import('./create-project/create-project.component').then(m => m.CreateProjectComponent),
        data: {
          title: 'project'
        }
        , canActivate: [AuthGuardUser]
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./edit-project/edit-project.component').then(m => m.EditProjectComponent),
        data: {
          title: 'project'
        }
        , canActivate: [AuthGuardUser]
      },
      {
        path: ':id',
        loadComponent: () => import('./view-project/view-project.component').then(m => m.ViewProjectComponent),
        data: {
          title: 'project'
        }
        , canActivate: [AuthGuardUser]
      }
    ]
  }
];
