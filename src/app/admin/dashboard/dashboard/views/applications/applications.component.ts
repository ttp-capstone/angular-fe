import { Component } from '@angular/core';
import { CommonModule, DOCUMENT, NgStyle } from '@angular/common';
import { DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationService } from './applications.service';
import { WidgetsDropdownComponentApplications } from '../widgets/widgets-dropdown-applications/widgets-dropdown-applications.component';
import { ChartOptions } from 'chart.js';
import { NgFor } from '@angular/common';
import { 
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  SidebarComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';


interface Project {
  id: number;
  title: string;
  status: string;
}

@Component({
  selector: 'app-applications',
  standalone: true,
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss',
  imports: [TextColorDirective, RouterModule,WidgetsDropdownComponentApplications, CardComponent, HttpClientModule, NgFor, CommonModule, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective,NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, CardHeaderComponent, TableDirective, AvatarComponent]
})


export class ApplicationsComponent implements OnInit {

  projects: Project[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient.get<Project[]>('http://localhost:8005/auth/admin/projects').subscribe(
      (response) => {
        console.log(response);
        this.projects = response;
      },
      (error) => {
        console.error('Fetching data failed', error);
      }
    );
  }

  
}