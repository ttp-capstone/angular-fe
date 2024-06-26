import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, FormSelectDirective } from '@coreui/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProjectService } from 'src/app/service/project.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [RouterModule, FormSelectDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss'
})
export class EditProjectComponent {
  editProjectForm!: FormGroup;
  projectId: string = '';
  project: any;
 
  constructor(
    private service: ProjectService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.editProjectForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      organizationType: ['', Validators.required],
      organizationName: ['', Validators.required],
      country: ['', Validators.required],
      fundingType: [],
      areaOfResearch: []
    });

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
        // Populate form fields with project data
        this.editProjectForm.patchValue({
          title: this.project.title,
          description: this.project.description,
          organizationType: this.project.organizationType,
          organizationName: this.project.organizationName,
          country: this.project.country,
          fundingType: this.project.fundingType,
          areaOfResearch: this.project.areaOfResearch
        });
      },
      (error) => {
        console.error('Error fetching project details:', error);
      }
    );
  }

  submitForm() {
    if (this.editProjectForm.valid) {
      
      this.service.updateProject(this.projectId, this.editProjectForm.value).subscribe(
        (response) => {
          console.log('Project created successfully:', response);
          // Redirect to dashboard or any other route after successful project creation
          this.router.navigate(['my/projects']); 
         
        },
        (error) => {
          console.error('Could not create project', error);
        }
      );
    }
  }
}
