import { Routes } from '@angular/router';
import { AuthGuardUser } from '../../auth.guard.user'; // Import the AuthGuard

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
    data: {
      title: $localize`Dashboard`
    },
    canActivate: [AuthGuardUser]
  }
];

