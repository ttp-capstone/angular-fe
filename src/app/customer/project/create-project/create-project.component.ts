import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, FormSelectDirective } from '@coreui/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProjectService } from 'src/app/service/project.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  standalone: true,
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
  imports: [RouterModule, FormSelectDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, NgStyle]

})
export class CreateProjectComponent {
  createProjectForm!: FormGroup;

  constructor(
    private service: ProjectService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createProjectForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      organizationType: ['', Validators.required],
      organizationName: ['', Validators.required],
      country: ['', Validators.required],
      fundingType: [],
      areaOfResearch: []
    });
  }

  submitForm() {
    if (this.createProjectForm.valid) {
      this.service.createProject(this.createProjectForm.value).subscribe(
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
