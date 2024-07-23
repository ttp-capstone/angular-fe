import { Component, OnInit } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, ButtonDirective } from '@coreui/angular';
import { DocsExampleComponent } from '@docs-components/public-api';

import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-project',
  standalone: true,
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  imports: [CommonModule, RouterModule, ButtonDirective, NgStyle, DocsExampleComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective]

})
export class ProjectComponent implements OnInit {
  projects: any[] = [];
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 2;

  constructor(
    private service: ProjectService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.fetchAllProjects();
  }


  fetchAllProjects() {
   
      this.service.allProjects(this.currentPage, this.pageSize).subscribe(
        (data:any) => {
          this.projects = data.content; // Assuming projects is an array of project objects
          this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.currentPage = data.number;
        },
        (error) => {
          console.error('Could not fetch projects', error);
          // Handle error appropriately, e.g., show error message to user
        }
      );  
    
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchAllProjects();
  }

  editProject(project: any) {
    this.router.navigate(['/my/projects/edit', project.id]); // Adjust route and parameter as per your routing configuration
  }

  viewProject(project: any) {
    this.router.navigate(['my/projects', project.id]); // Adjust route and parameter as per your routing configuration
  }
}