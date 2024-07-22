import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/service/jwt.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [
    RouterModule, CommonModule,  ReactiveFormsModule
  ]
})
export class AboutComponent implements OnInit {
  isNavHidden: boolean = true;

  toggleNav() {
    this.isNavHidden = !this.isNavHidden;
  }
  aboutInfo: string = '';

  constructor() { }

  ngOnInit(): void {
    this.aboutInfo = "This is the About page";
  }

}
