import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { DocsExampleComponent } from '@docs-components/public-api';
import { BorderDirective, ButtonDirective,CardBodyComponent,CardComponent,CardFooterComponent,CardGroupComponent,CardHeaderComponent,CardImgDirective,CardLinkDirective,
CardSubtitleDirective,CardTextDirective,CardTitleDirective,ColComponent,GutterDirective,ListGroupDirective,ListGroupItemDirective,NavComponent,
NavItemComponent,NavLinkDirective,RowComponent,TextColorDirective} from '@coreui/angular';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

import { FundingService } from 'src/app/service/funding.service';

type CardColor = {
  color: string
  textColor?: string
}

@Component({
  selector: 'app-funding',
  standalone: true,
  imports: [CommonModule, RouterModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, NgTemplateOutlet, CardTitleDirective, CardTextDirective, ButtonDirective, CardSubtitleDirective, CardLinkDirective, RouterLink, ListGroupDirective, ListGroupItemDirective, CardFooterComponent, NavComponent, NavItemComponent, NavLinkDirective, BorderDirective, CardGroupComponent, GutterDirective, CardImgDirective],
  templateUrl: './funding.component.html',
  styleUrl: './funding.component.scss'
})
export class FundingComponent {
  colors: CardColor[] = [
    { color: 'primary', textColor: 'primary' },
    { color: 'secondary', textColor: 'secondary' },
    { color: 'success', textColor: 'success' },
    { color: 'danger', textColor: 'danger' },
    { color: 'warning', textColor: 'warning' },
    { color: 'info', textColor: 'info' },
    { color: 'light' },
    { color: 'dark' }
  ];

  projectId: string = '';
  funding: any[] = [];

  constructor(
    private service: FundingService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
     // Retrieve project ID from route parameter
     this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id') || ''; // 'id' should match the route parameter defined
      if (this.projectId) {
        this.getMatchingFunding(this.projectId);
      }
    });
  }


  getMatchingFunding(id: string) {
   
      this.service.getMatchingFunding(id).subscribe(
        (funding) => {
          this.funding = funding; 
          console.log("funding"+funding);
        },
        (error) => {
          console.error('Could not fetch funding details', error);
          // Handle error appropriately, e.g., show error message to user
        }
      );
  }

  viewFunding(projectId: string , fund: any) {
    this.router.navigate(['my/funding/view', fund.id, projectId ]);
  }

}
