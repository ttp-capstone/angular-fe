import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/service/jwt.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.scss'],
  standalone: true,
  imports: [
    RouterModule, CommonModule, CardGroupComponent, ReactiveFormsModule, ContainerComponent,
    RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective,
    InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe(
        (response) => {
          console.log(response);
          if (response.token != null) {
            // alert("Hello, Your token is " + response.token);
            const jwtToken = response.token;
            localStorage.setItem('jwt', jwtToken);
            this.router.navigateByUrl('my/dashboard');
          }
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    }
  }
}
