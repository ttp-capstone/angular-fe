import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactInfo: string = '';

  constructor() { }

  ngOnInit(): void {
    this.contactInfo = "This is the Contact us page";
  }

}
