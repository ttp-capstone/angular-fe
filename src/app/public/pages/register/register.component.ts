import { Component, OnInit } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/service/jwt.service';
import {ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;


  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required] // Add validation for repeatPassword
    });
  }

  submitForm() {
    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm.value);
    
    // Assuming JwtService.register returns an Observable
    this.service.register(this.registerForm.value).subscribe(
      (response) => {
        if (response.id != null) {
          alert("Hello " + response.fullName);
          this.router.navigateByUrl("/dashboard");
        }
      },
      (error) => {
        console.error('Error occurred:', error);
        // Handle error as needed
      }
    );
  }
}