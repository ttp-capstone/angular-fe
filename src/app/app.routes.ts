import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import {DefaultLayoutComponentAdmin} from '../app/admin/dashboard/layout/default-layout/default-layout.component'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./public/pages/home/home.component').then(m => m.HomeComponent),
    data: {
      title: 'Home Page'
    }
  },

  {
    path: '',
    component: DefaultLayoutComponentAdmin,
    data: {
      title: 'Home'
    },
    children: [
      
      {
        path: 'admin/dashboard',
        loadChildren: () => import('./admin/dashboard/dashboard/routes').then((m) => m.routes)
      },
      {
        path: 'applications',
        loadChildren: () => import('./admin/dashboard/dashboard/views/applications/routes').then((m) => m.routes)
      },
      {
        path: 'users',
        loadComponent: () => import('./admin/dashboard/dashboard/views/users/users.component').then(m => m.UsersComponent),
      },
      {
        path: 'view-application',
        loadChildren: () => import('./admin/dashboard/dashboard/views/view-application/routes').then((m) => m.routes)
      },
      {
        path: 'theme',
        loadChildren: () => import('./admin/dashboard/dashboard/views/theme/routes').then((m) => m.routes)
      },
      
    ]
    },


  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      
      {
        path: 'my/dashboard',
        loadChildren: () => import('./customer/dashboard/routes').then((m) => m.routes)
      },
      {
        path: 'account',
        loadChildren: () => import('./customer/account/routes').then((m) => m.routes)
      },
      
      // {
      //   path: 'widgets',
      //   loadChildren: () => import('./customer/widgets/routes').then((m) => m.routes)
      // },
      
      // {
      //   path: 'pages',
      //   loadChildren: () => import('./customer/pages/routes').then((m) => m.routes)
      // },
      
      {
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
      {
        path:'my/projects',
        loadChildren: () => import('./customer/project/routes').then((m) => m.routes)

      },
      {
        path:'my/funding',
        loadChildren: () => import('./customer/funding/routes').then((m) => m.routes)

      },
    ]
  },
  
  // {
  //     path: '404',
  //     loadComponent: () => import('../customer/pages/page404/page404.component').then(m => m.Page404Component),
  //     data: {
  //       title: 'Page 404'
  //     }
  //   },
    // {
    //   path: '500',
    //   loadComponent: () => import('../customer/pages/page500/page500.component').then(m => m.Page500Component),
    //   data: {
    //     title: 'Page 500'
    //   }
    // },
    {
      path: 'login',
      loadComponent: () => import('./public/pages/login-customer/login-customer.component').then(m => m.LoginComponent),
      data: {
        title: 'Login Page'
      }
    },
    {
      path: 'admin/login',
      loadComponent: () => import('./public/pages/login/login.component').then(m => m.LoginComponent),
      data: {
        title: 'Login Page'
      }
    },
    {
      path: 'register',
      loadComponent: () => import('./public/pages/register/register.component').then(m => m.RegisterComponent),
      data: {
        title: 'Register Page'
      }
    },
    {
      path: 'about-us',
      loadComponent: () => import('./public/pages/about/about.component').then(m => m.AboutComponent),
      data: {
        title: 'Register Page'
      }
    },
    {
      path: 'contact-us',
      loadComponent: () => import('./public/pages/contact-us/contact-us.component').then(m => m.ContactUsComponent),
      data: {
        title: 'Register Page'
      }
    },
    
    // { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '**', redirectTo: '404' }
];
