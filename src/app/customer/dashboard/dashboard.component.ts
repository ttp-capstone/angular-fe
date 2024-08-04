import { DOCUMENT, NgStyle ,CommonModule} from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import { RouterModule, Router } from '@angular/router';

import { TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, FormSelectDirective, FormDirective, FormLabelDirective, FormControlDirective } from '@coreui/angular';
import { DocsExampleComponent } from '@docs-components/public-api';
import { ProjectService } from 'src/app/service/project.service';
import { CustomerDasboardService } from 'src/app/service/customer-dasboard.service';

import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { FundingService } from 'src/app/service/funding.service';



@Component({
  
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
 
    imports:[CommonModule,RouterModule,FormSelectDirective,RowComponent,ColComponent,TextColorDirective,CardComponent,CardHeaderComponent,CardBodyComponent,DocsExampleComponent,ReactiveFormsModule,
      FormsModule,FormDirective,FormLabelDirective,FormControlDirective,ButtonDirective,TableDirective,TableColorDirective,TableActiveDirective,WidgetsDropdownComponent,NgStyle,IconDirective
    ],
  
  standalone: true,
  
   
  //imports: [WidgetsDropdownComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent,CommonModule,]
})
export class DashboardComponent implements OnInit {

  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #document: Document = inject(DOCUMENT);
  readonly #renderer: Renderer2 = inject(Renderer2);
  readonly #chartsData: DashboardChartsData = inject(DashboardChartsData);

  projects: any[] = [];
  funding: any[] = [];
  counts: { [key: string]: number } = {};
  

  constructor(
    private service: ProjectService,
    private service2: CustomerDasboardService,
    private service3: FundingService,
    private router: Router,
  ) { }

  

  ngOnInit(): void {
    
    this.fetchAllProjects();
    this.dashboardData();
    this.fetchApplidFunding();
    
  }

  fetchAllProjects() {
   
    this.service.listNewProjects().subscribe(
      (projects) => {
        this.projects = projects; // Assuming projects is an array of project objects
      },
      (error) => {
        console.error('Could not fetch projects', error);
        // Handle error appropriately, e.g., show error message to user
      }
    );
  
}
fetchApplidFunding() {
   
  this.service3.listNewAppliedFunding().subscribe(
    (funding) => {
      this.funding = funding; // Assuming projects is an array of project objects
    },
    (error) => {
      console.error('Could not fetch projects', error);
      // Handle error appropriately, e.g., show error message to user
    }
  );

}
dashboardData() {
   
  this.service2.dashboardData().subscribe(
    (counts) => {
      this.counts = counts; 
    },
    (error) => {
      console.error('Could not fetch projects', error);
      // Handle error appropriately, e.g., show error message to user
    }
  );

}



  
    
}
