import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./customer/dashboard/routes').then((m) => m.routes)
      },
      {
        path: 'theme',
        loadChildren: () => import('./customer/theme/routes').then((m) => m.routes)
      },
      
      {
        path: 'widgets',
        loadChildren: () => import('./customer/widgets/routes').then((m) => m.routes)
      },
      
      {
        path: 'pages',
        loadChildren: () => import('./customer/pages/routes').then((m) => m.routes)
      },
      {
        path: 'register',
        loadChildren: () => import('./customer/register/routes').then((m) => m.routes)
      },{
        path:'form',
        loadChildren: () => import('./customer/former/routes').then((m) => m.routes)
      },
      {
        path:'editForm',
        loadChildren: () => import('./customer/editform/routes').then((m) => m.routes)
      },
      {
        path:'viewapplication',
        loadChildren: () => import('./customer/viewapplication/routes').then((m) => m.routes)

      },
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./customer/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./customer/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./customer/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];
