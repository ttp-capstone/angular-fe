import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, FormSelectDirective } from '@coreui/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [RouterModule, FormSelectDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  editAccountForm!: FormGroup;
  projectId: string = '';
  project: any;
 
  constructor(
    private service: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.editAccountForm = this.fb.group({
      fullName: ['', Validators.required],
      
    });

    this.route.paramMap.subscribe(params => {
      
        this.loadUserDetails();
      
    });
  }

  loadUserDetails() {
    this.service.getUser().subscribe(
      (data) => {
        
        this.editAccountForm.patchValue({
          fullName: data.fullName,
         
        });
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  submitForm() {
    // if (this.editAccountForm.valid) {
      
    //   this.service.updateUser(this.projectId, this.editAccountForm.value).subscribe(
    //     (response) => {
    //       console.log('Project created successfully:', response);
    //       // Redirect to dashboard or any other route after successful project creation
    //       this.router.navigate(['my/account']); 
         
    //     },
    //     (error) => {
    //       console.error('Could not create project', error);
    //     }
    //   );
    // }
  }
}
