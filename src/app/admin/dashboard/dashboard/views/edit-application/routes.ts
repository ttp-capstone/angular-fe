import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./edit-application.component').then(m => m.EditApplicationComponent),

  } 
];

