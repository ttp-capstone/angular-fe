import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./view-application.component').then(m => m.ViewApplicationComponent),

  }
];

