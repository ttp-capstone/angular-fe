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
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 2;

  constructor(private service: FundingService) { }

  ngOnInit(): void {
    this.fetchAllAppliedFunding();
  }

  fetchAllAppliedFunding() {
    this.service.fetchAllAppliedFunding().subscribe(
      (data:any) => {
        this.funding = data.content; // Assuming projects is an array of project objects
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.currentPage = data.number;
      },
      (error) => {
        console.error('Could not fetch funding', error);
      }
    );
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchAllAppliedFunding();
  }
}

