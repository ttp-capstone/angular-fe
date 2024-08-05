import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, FormSelectDirective } from '@coreui/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, RouterModule, FormSelectDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  editAccountForm!: FormGroup;
  projectId: string = '';
  project: any;
  updateSuccess: boolean = false;

  constructor(
    private service: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.editAccountForm = this.fb.group({
      fullName: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]] // Disable email control
    });

    this.route.paramMap.subscribe(params => {
      
        this.loadUserDetails();
      
    });
  }

  loadUserDetails() {
    this.service.getUser().subscribe(
      (data) => {
        console.log(data);
        this.editAccountForm.patchValue({
          fullName: data.fullName,
          email: data.email,
        });
        
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  submitForm() {
    if (this.editAccountForm.valid) {
      
      this.service.updateUser(this.editAccountForm.value).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.updateSuccess = true;
            setTimeout(() => {
              this.updateSuccess = false; // Reset update success message after 3 seconds
            }, 3000);
          // Redirect to dashboard or any other route after successful project creation
          this.router.navigate(['my/account']); 
         
        },
        (error) => {
          console.error('Could not create project', error);
        }
      );
    }
  }
}
