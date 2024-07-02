import { Component, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT, NgStyle } from '@angular/common';
import { DestroyRef, effect, inject,  Renderer2, signal, WritableSignal } from '@angular/core';
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
import { filter } from 'rxjs/operators';
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
  filteredProjects: any[] = [];
  searchControl = new FormControl('');

  constructor(
    private service: ProjectServiceAdmin,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchAllProjects();
    this.searchControl.valueChanges
      .pipe(filter(value => value !== null))
      .subscribe(value => {
        this.filterProjects(value as string);
      });
  }

  fetchAllProjects() {
    this.service.allProjectAdmin().subscribe(
      (projects) => {
        this.projects = projects;
        this.filteredProjects = projects; // Initialize filteredProjects with all projects
      },
      (error) => {
        console.error('Could not fetch projects', error);
      }
    );
  }

  filterProjects(searchTerm: string) {
    if (!searchTerm) {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(project =>
        project.title.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }
  }

  updateStatus(projectId: number, newStatus: string) {
    const updatedProject = this.projects.find(project => project.id === projectId);
    if (updatedProject) {
      updatedProject.status = newStatus;
      this.service.updateProjectStatus(projectId, updatedProject).subscribe(
        (response) => {
          console.log('Status updated successfully', response);
          this.fetchAllProjects();  // Refresh the projects list
        },
        (error) => {
          console.error('Failed to update status', error);
        }
      );
    }
  }
}