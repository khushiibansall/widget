//dashboard.component.ts
import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from '../widgets/widget/widget.component';
import * as yaml from 'js-yaml';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, WidgetComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  widgets = signal<any[]>([]);

  constructor() {
    this.loadConfigs();
  }

  async loadConfigs() {
    const configs = [];
    for (let i = 1; i <= 3; i++) {
      const response = await fetch(`/assets/configs/${i}.yaml`);
      const text = await response.text();
      const data = yaml.load(text);
      configs.push(data);
    }
    this.widgets.set(configs);
  }
}