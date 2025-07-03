//dashboard.component.ts
import { Component } from '@angular/core';
import { WidgetComponent } from '../widgets/widget/widget.component';
import { CommonModule } from '@angular/common';
import { dashboardConfig } from './dashboard.config';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, WidgetComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  widgets = dashboardConfig;
}
