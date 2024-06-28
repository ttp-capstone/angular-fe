import { Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ViewApplicationComponent } from '../view-application/view-application.component';
import { ApplicationsComponent } from './applications.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./applications.component').then(m => m.ApplicationsComponent),
    // data: {
    //   title: $localize`Dashboard`
    // }
  },
  // { path: 'view-application/:id', component: ViewApplicationComponent },
  // { path: '', redirectTo: '/applications', pathMatch: 'full' } // Default route

];

