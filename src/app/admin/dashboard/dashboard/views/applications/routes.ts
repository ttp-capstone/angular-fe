import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./applications.component').then(m => m.ApplicationsComponent),
    // data: {
    //   title: $localize`Dashboard`
    // }
  }
];

