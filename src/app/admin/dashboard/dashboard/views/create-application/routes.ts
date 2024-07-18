import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./create-application.component').then(m => m.CreateApplicationComponent),

  } 
];

