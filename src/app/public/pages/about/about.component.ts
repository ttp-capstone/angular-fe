import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  aboutInfo: string = '';

  constructor() { }

  ngOnInit(): void {
    this.aboutInfo = "This is the About page";
  }

}
