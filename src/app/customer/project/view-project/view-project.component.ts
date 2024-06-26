import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, FormSelectDirective,
  TableDirective, TableColorDirective, TableActiveDirective
 } from '@coreui/angular';
import { ProjectService } from 'src/app/service/project.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [CommonModule, RouterModule, FormSelectDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, 
    ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective,
    TableDirective, TableColorDirective, TableActiveDirective],
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.scss'
})
export class ViewProjectComponent {
  project: any; 
  appliedFunding: any; 
  projectId: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve project ID from route parameter
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id') || ''; // 'id' should match the route parameter defined
      if (this.projectId) {
        this.loadProjectDetails(this.projectId);
      }
    });
  }

  loadProjectDetails(id: string) {
    this.service.getProject(id).subscribe(
      (data) => {
        this.project = data.project;
        this.appliedFunding = data.appliedFunding;
      },
      (error) => {
        console.error('Error fetching project details:', error);
      }
    );
  }

  editProject(project: any) {
    this.router.navigate(['/my/projects/edit', project.id]); 
  }

  goBack() {
    window.history.back();
  }

  searchFunding(project: any) {
    this.router.navigate(['my/funding/all', project.id]);
  }

  viewFunding(projectId: string , fund: any) {
    this.router.navigate(['my/funding/view', fund.id, projectId ]);
  }
}