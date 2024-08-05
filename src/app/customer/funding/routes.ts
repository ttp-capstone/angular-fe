// src/app/routes.ts
import { Routes } from '@angular/router';
import { AuthGuardUser } from '../../auth.guard.user'; // Import the AuthGuard

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'funding'
    },
    canActivate: [AuthGuardUser],
    children: [
      {
        path: '',
        redirectTo: 'all/:id',
        pathMatch: 'full'
      },
      {
        path: 'all/:id',
        loadComponent: () => import('./funding/funding.component').then(m => m.FundingComponent),
        data: {
          title: 'project'
        }
        , canActivate: [AuthGuardUser]
      },
      
      {
        path: 'view/:fundingId/:projectId',
        loadComponent: () => import('./view-funding/view-funding.component').then(m => m.ViewFundingComponent),
        data: {
          title: 'project'
        }
        , canActivate: [AuthGuardUser]
      },
      {
        path: 'applied',
        loadComponent: () => import('./applied-funding/applied-funding.component').then(m => m.AppliedFundingComponent),
        data: {
          title: 'project'
        }
        , canActivate: [AuthGuardUser]
      }
    ]
  }
];
