import { Component } from '@angular/core';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-view-application',
  standalone: true,
  imports: [ContainerComponent,RowComponent,ColComponent,TextColorDirective,CardComponent,CardBodyComponent,FormDirective,InputGroupComponent,InputGroupTextDirective,FormControlDirective,ButtonDirective,IconDirective],
  templateUrl: './viewapplication.component.html',
  styleUrl: './viewapplication.component.scss'
})
export class ViewApplicationComponent {

}
