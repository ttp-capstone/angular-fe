import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./edit-funding.component').then(m => m.EditFundingComponent),

  } 
];

