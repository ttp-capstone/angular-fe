import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  AfterContentInit,
  OnInit
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { RouterLink } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';
import {
  RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, ThemeDirective,
  DropdownComponent, ButtonDirective, CardModule,  DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective
} from '@coreui/angular';
@Component({
  selector: 'app-widgets-dropdown-fundings',
  templateUrl: './widgets-dropdown-fundings.component.html',
  styleUrls: ['./widgets-dropdown-fundings.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, IconDirective, ThemeDirective,
    DropdownComponent, CardModule, CommonModule,ButtonDirective, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective,
    RouterLink, ChartjsComponent
  ]
})
export class WidgetsDropdownFundingsComponent implements OnInit, AfterContentInit {
  fundings: any[] = [];
  fundingSummary: {
    totalAmount: number;
    totalFundings: number;
    grantCount: number;
    loanCount: number;
    subsidyCount: number;
  } = {
    totalAmount: 0,
    totalFundings: 0,
    grantCount: 0,
    loanCount: 0,
    subsidyCount: 0
  };

  constructor(private http: HttpClient, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchFundingData();
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  fetchFundingData() {
    this.http.get<any[]>('http://localhost:8005/auth/admin/funding').subscribe(data => {
      this.fundings = data;
      this.calculateSummary();
    });
  }

  calculateSummary() {
    this.fundingSummary.totalAmount = this.fundings.reduce((sum, funding) => sum + funding.fundingAmount, 0);
    this.fundingSummary.totalFundings = this.fundings.length;
    this.fundingSummary.grantCount = this.fundings.filter(funding => funding.fundingType.toLowerCase() === 'grant').length;
    this.fundingSummary.loanCount = this.fundings.filter(funding => funding.fundingType.toLowerCase() === 'loan').length;
    this.fundingSummary.subsidyCount = this.fundings.filter(funding => funding.fundingType.toLowerCase() === 'subsidy').length;
  }
}
