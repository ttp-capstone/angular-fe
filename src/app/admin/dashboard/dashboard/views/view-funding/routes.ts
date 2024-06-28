import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./view-funding.component').then(m => m.ViewFundingComponent),

  }
];

