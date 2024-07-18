import { Component, OnInit } from '@angular/core';
import { TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IconDirective } from '@coreui/icons-angular';
import { Router, RouterModule, Routes } from '@angular/router';
import { CommonModule, DOCUMENT, NgStyle } from '@angular/common';
import { NgFor } from '@angular/common';
import { WidgetsDropdownFundingsComponent } from '../widgets/widgets-dropdown-fundings/widgets-dropdown-fundings.component';
import { 
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  SidebarComponent,
  CardFooterComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
} from '@coreui/angular';
import { FundingServiceAdmin } from 'src/app/service/admin.funding.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';


interface Funds {
  id: number;
  title: string;  // Add this line
  programName: string;
  fundingType: string;
  status: string;
}

@Component({
    templateUrl: 'typography.component.html',
    standalone: true,
    imports: [
        TextColorDirective,  AvatarComponent,
        ButtonDirective,
        ButtonGroupComponent,
        SidebarComponent,
        CardFooterComponent,
        ColComponent,
        ReactiveFormsModule,
        FormCheckLabelDirective,
        GutterDirective,
        ProgressBarDirective,
        ProgressComponent,
        RowComponent,
        TableDirective,
        NgFor,
        WidgetsDropdownFundingsComponent,
        CommonModule,
        CardComponent,
        HttpClientModule,
        RouterModule,
        CardHeaderComponent,
        CardBodyComponent,
    ],
})
export class TypographyComponent implements OnInit {
  funds: Funds[] = [];
  filteredFunds: Funds[] = [];
  searchControl = new FormControl('');

  constructor(private fundingServiceAdmin: FundingServiceAdmin) {}

  ngOnInit(): void {
    this.fetchData();
    this.searchControl.valueChanges
      .pipe(filter(value => value !== null))
      .subscribe(value => {
        this.filterFunds(value as string);
      });
  }

  fetchData() {
    this.fundingServiceAdmin.allFundingAdmin().subscribe(
      (response) => {
        console.log(response);
        this.funds = response;
        this.filteredFunds = response; // Initialize filteredFunds with all funds
      },
      (error) => {
        console.error('Fetching data failed', error);
      }
    );
  }

  filterFunds(searchTerm: string) {
    console.log('Filtering funds with searchTerm:', searchTerm);
    if (!searchTerm) {
      this.filteredFunds = this.funds;
    } else {
      this.filteredFunds = this.funds.filter(fund =>
        fund.programName.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }
    console.log('Filtered funds:', this.filteredFunds);
  }

  deleteFund(fundingId: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.fundingServiceAdmin.deleteFundingAdmin(fundingId).subscribe(
        (response: any) => {
          console.log('Project deleted successfully', response);
          this.fetchData();  // Refresh the projects list
        },
        (error: any) => {
          console.error('Failed to delete project', error);
        }
      );
    }
  }
}