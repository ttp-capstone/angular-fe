import { Component } from '@angular/core';
import { CommonModule, DOCUMENT, NgStyle } from '@angular/common';
import { DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ApplicationService } from './applications.service';
import { WidgetsDropdownComponentApplications } from '../widgets/widgets-dropdown-applications/widgets-dropdown-applications.component';
import { ChartOptions } from 'chart.js';
import { NgFor } from '@angular/common';
import { ProjectServiceAdmin } from 'src/app/service/admin.project.service';
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


// interface projects {
//   id: number;
//   title: string;
//   status: string;
// }

@Component({
  selector: 'app-applications',
  standalone: true,
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss',
  imports: [TextColorDirective, RouterModule,WidgetsDropdownComponentApplications, CardComponent, HttpClientModule, NgFor, CommonModule, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective,NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, CardHeaderComponent, TableDirective, AvatarComponent]
})


export class ApplicationsComponent implements OnInit {
  projects: any[] = [];

  constructor(
    private service: ProjectServiceAdmin,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchAllProjects();
  }

  fetchAllProjects() {
    this.service.allProjectAdmin().subscribe(
      (projects) => {
        this.projects = projects; // Assuming projects is an array of project objects
      },
      (error) => {
        console.error('Could not fetch projects', error);
        // Handle error appropriately, e.g., show error message to user
      }
    );
  }
}