import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { DocsExampleComponent } from '@docs-components/public-api';
import { BorderDirective, ButtonDirective,CardBodyComponent,CardComponent,CardFooterComponent,CardGroupComponent,CardHeaderComponent,CardImgDirective,CardLinkDirective,
CardSubtitleDirective,CardTextDirective,CardTitleDirective,ColComponent,GutterDirective,ListGroupDirective,ListGroupItemDirective,NavComponent,
NavItemComponent,NavLinkDirective,RowComponent,TextColorDirective} from '@coreui/angular';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

import { FundingService } from 'src/app/service/funding.service';

@Component({
  selector: 'app-applied-funding',
  standalone: true,
  imports: [CommonModule, RouterModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, NgTemplateOutlet, CardTitleDirective, CardTextDirective, ButtonDirective, CardSubtitleDirective, CardLinkDirective, RouterLink, ListGroupDirective, ListGroupItemDirective, CardFooterComponent, NavComponent, NavItemComponent, NavLinkDirective, BorderDirective, CardGroupComponent, GutterDirective, CardImgDirective],
  templateUrl: './applied-funding.component.html',
  styleUrl: './applied-funding.component.scss'
})
export class AppliedFundingComponent {
  funding: any[] = [];
  constructor(
    private service: FundingService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.fetchAllAppliedFunding();
  }

  fetchAllAppliedFunding() {
   
    this.service.fetchAllAppliedFunding().subscribe(
      (funding) => {
        this.funding = funding; // Assuming projects is an array of project objects
      },
      (error) => {
        console.error('Could not fetch projects', error);
        // Handle error appropriately, e.g., show error message to user
      }
    );
  
}
}
