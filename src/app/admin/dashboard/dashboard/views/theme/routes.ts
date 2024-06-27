import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Theme'
    },
    children: [
      {
        path: '',
        redirectTo: 'colors',
        pathMatch: 'full'
      },{
        path: 'formss',
        loadComponent: () => import('./form.component').then(m => m.FormComponent),
        data: {
          title: 'formss'
        }
      },
      {
        path: 'colors',
        loadComponent: () => import('./colors.component').then(m => m.ColorsComponent),
        data: {
          title: 'Colors'
        }
      },
      {
        path: 'typography',
        loadComponent: () => import('./typography.component').then(m => m.TypographyComponent),
        data: {
          title: 'Typography'
        }
      }
    ]
  }
];

