import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import {DefaultLayoutComponentAdmin} from '../app/admin/dashboard/layout/default-layout/default-layout.component'
import { AuthGuard } from './auth.gaurd.admin'; // Import the AuthGuard
import { AuthGuardUser } from './auth.guard.user'; // Import the AuthGuard

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
    canActivate: [AuthGuard, AuthGuardUser],
    data: {
      title: 'Home'
    },
    children: [
      
      {
        path: 'admin/dashboard',
        loadChildren: () => import('./admin/dashboard/dashboard/views/applications/routes').then((m) => m.routes),
        canActivate: [AuthGuard] // Apply the AuthGuard here
      },
      {
        path: 'applications',
        loadChildren: () => import('./admin/dashboard/dashboard/views/applications/routes').then((m) => m.routes),
        canActivate: [AuthGuard]
      },
      // {
      //   path: 'update-project/:id',
      //   loadChildren: () => import('./admin/dashboard/dashboard/views/update-project/routes').then((m) => m.routes),
      //   canActivate: [AuthGuard]
      // },
      {
        path: 'users',
        loadComponent: () => import('./admin/dashboard/dashboard/views/users/users.component').then(m => m.UsersComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'view-application/:id',
        loadChildren: () => import('./admin/dashboard/dashboard/views/view-application/routes').then((m) => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'create-application',
        loadChildren: () => import('./admin/dashboard/dashboard/views/create-application/routes').then((m) => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'create-funding',
        loadChildren: () => import('./admin/dashboard/dashboard/views/create-funding/routes').then((m) => m.routes),
        canActivate: [AuthGuard]
      },      
      {
        path: 'edit-application/:id',
        loadChildren: () => import('./admin/dashboard/dashboard/views/edit-application/routes').then((m) => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'view-funding/:id',
        loadChildren: () => import('./admin/dashboard/dashboard/views/view-funding/routes').then((m) => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'edit-funding/:id',
        loadChildren: () => import('./admin/dashboard/dashboard/views/edit-funding/routes').then((m) => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'theme',
        loadChildren: () => import('./admin/dashboard/dashboard/views/theme/routes').then((m) => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'logout',
        loadComponent: () => import('./admin/dashboard/layout/logout/logout.component').then(m => m.LogoutComponent)
        // canActivate: [AuthGuard]
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
        loadChildren: () => import('./customer/dashboard/routes').then((m) => m.routes), canActivate: [AuthGuardUser]
      },
      {
        path: 'my/account',
        loadChildren: () => import('./customer/account/routes').then((m) => m.routes), canActivate: [AuthGuardUser]
      },
      
   
      {
        path:'my/projects',
        loadChildren: () => import('./customer/project/routes').then((m) => m.routes), canActivate: [AuthGuardUser]

      },
      {
        path:'my/funding',
        loadChildren: () => import('./customer/funding/routes').then((m) => m.routes), canActivate: [AuthGuardUser]

      },
      // {
      //   path:'cust/logout',
      //   loadChildren: () => import('./customer/account/routes').then((m) => m.routes)

      // },
      
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
    },{
      path: '404',
      loadComponent: () => import('./public/pages/page404/page404.component').then(m => m.Page404Component),
      data: {
        title: 'Page 404'
      }
    },
    
    // { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '**', redirectTo: '404' }
];
