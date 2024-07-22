import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { RouterLink } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import {
  RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, ThemeDirective,
  DropdownComponent, ButtonDirective, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective
} from '@coreui/angular';

@Component({
  selector: 'app-widgets-dropdown-applications',
  templateUrl: './widgets-dropdown-applications.component.html',
  styleUrls: ['./widgets-dropdown-applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, IconDirective, ThemeDirective,
    DropdownComponent, ButtonDirective, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective,
    RouterLink, ChartjsComponent
  ]
})
export class WidgetsDropdownComponentApplications implements OnInit {

  constructor(private http: HttpClient, private changeDetectorRef: ChangeDetectorRef) {}

  data: any[] = [];
  options: any[] = [];

  approvedCount: number = 0;
  pendingCount: number = 0;
  rejectedCount: number = 0;
  totalCount: number = 0;

  datasets = [
    {
      label: 'Applications',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [26, 6200, 2.49, 44000]
    }
  ];

  optionsDefault = {
    plugins: {
      legend: { display: false }
    },
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { display: false }
    },
    elements: {
      line: { borderWidth: 1, tension: 0.4 },
      point: { radius: 4, hitRadius: 10, hoverRadius: 4 }
    }
  };

  ngOnInit(): void {
    this.fetchProjectData();
  }

  fetchProjectData(): void {
    this.http.get<any[]>('http://localhost:8005/auth/admin/projects').subscribe((projects) => {
      this.approvedCount = projects.filter(p => p.status === 'Approved').length;
      this.pendingCount = projects.filter(p => p.status === 'Pending').length;
      this.rejectedCount = projects.filter(p => p.status === 'Rejected').length;
      this.totalCount = projects.length;

      this.updateChartData();
    });
  }

  updateChartData(): void {
    this.datasets[0].data = [this.approvedCount, this.pendingCount, this.rejectedCount, this.totalCount];

    this.setData();
    this.changeDetectorRef.detectChanges();
  }

  setData() {
    for (let idx = 0; idx < 4; idx++) {
      this.data[idx] = { datasets: [this.datasets[idx]] };
      this.options[idx] = { ...this.optionsDefault };
    }
  }
}
