import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
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
