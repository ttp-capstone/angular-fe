// src/app/routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'funding'
    },
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
      },
      
      {
        path: 'view/:fundingId/:projectId',
        loadComponent: () => import('./view-funding/view-funding.component').then(m => m.ViewFundingComponent),
        data: {
          title: 'project'
        }
      },
      // {
      //   path: 'apply:id',
      //   loadComponent: () => import('./view-project/view-project.component').then(m => m.ViewProjectComponent),
      //   data: {
      //     title: 'project'
      //   }
      // }
    ]
  }
];