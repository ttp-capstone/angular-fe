import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./create-funding.component').then(m => m.CreateFundingComponent),

  } 
];

