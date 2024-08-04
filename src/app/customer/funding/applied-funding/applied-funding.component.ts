import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, CardFooterComponent, ButtonDirective, TableDirective, TextColorDirective } from '@coreui/angular';
import { FundingService } from 'src/app/service/funding.service';

@Component({
  selector: 'app-applied-funding',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent,
    ButtonDirective,
    TableDirective,
    TextColorDirective
  ],
  templateUrl: './applied-funding.component.html',
  styleUrls: ['./applied-funding.component.scss']
})
export class AppliedFundingComponent {
  funding: any[] = [];

  constructor(private service: FundingService) { }

  ngOnInit(): void {
    this.fetchAllAppliedFunding();
  }

  fetchAllAppliedFunding() {
    this.service.fetchAllAppliedFunding().subscribe(
      (funding) => {
        this.funding = funding; // Ensure this matches the data structure
      },
      (error) => {
        console.error('Could not fetch funding', error);
      }
    );
  }
}

