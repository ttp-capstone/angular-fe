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


interface Funds {
  id: number;
  programName: string;
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

  constructor(private fundingServiceAdmin: FundingServiceAdmin) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.fundingServiceAdmin.allFundingAdmin().subscribe(
      (response) => {
        console.log(response);
        this.funds = response;
      },
      (error) => {
        console.error('Fetching data failed', error);
      }
    );
  }
}