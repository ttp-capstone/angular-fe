import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
      },
    ]
  }
]