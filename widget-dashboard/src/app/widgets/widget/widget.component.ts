import { Component, AfterViewInit, Input, OnDestroy, NgZone } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  standalone: true,
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements AfterViewInit, OnDestroy {
  @Input() config!: { title: string; type: string; data: any[] };

  private root!: am5.Root;

  constructor(private zone: NgZone) {}

  chartId = 'chart-' + Math.random().toString(36).substring(2, 9);

ngAfterViewInit(): void {
  if (!this.config || !this.config.type || !this.config.data) return;
  this.zone.runOutsideAngular(() => {
    const container = document.getElementById(this.chartId);
    if (!container) return;

    this.root = am5.Root.new(container);
    this.root.setThemes([am5themes_Animated.new(this.root)]);

    if (this.config.type === 'pie') {
      this.buildPieChart();
    } else if (this.config.type === 'bar') {
      this.buildBarChart();
    } else if (this.config.type === 'line') {
      this.buildLineChart();
    }
  });
}

  private buildPieChart() {
    const chart = this.root.container.children.push(
      am5percent.PieChart.new(this.root, {
        layout: this.root.verticalLayout,
        innerRadius: am5.percent(50)
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(this.root, {
        valueField: 'value',
        categoryField: 'category'
      })
    );

    series.data.setAll(this.config.data);

    // Center label
    const total = this.config.data.reduce((sum, d) => sum + d.value, 0);
    series.children.push(
      am5.Label.new(this.root, {
        text: `${total}\nTotal`,
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        textAlign: 'center',
        fontSize: 18
      })
    );
  }

  private buildBarChart() {
    const chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        layout: this.root.verticalLayout
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(this.root, {
        categoryField: 'category',
        renderer: am5xy.AxisRendererX.new(this.root, {})
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(this.root, {
        renderer: am5xy.AxisRendererY.new(this.root, {})
      })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(this.root, {
        xAxis,
        yAxis,
        valueYField: 'value',
        categoryXField: 'category'
      })
    );

    xAxis.data.setAll(this.config.data);
    series.data.setAll(this.config.data);
  }

  private buildLineChart() {
    const chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        layout: this.root.verticalLayout
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(this.root, {
        categoryField: 'category',
        renderer: am5xy.AxisRendererX.new(this.root, {})
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(this.root, {
        renderer: am5xy.AxisRendererY.new(this.root, {})
      })
    );

    const series = chart.series.push(
      am5xy.LineSeries.new(this.root, {
        xAxis,
        yAxis,
        valueYField: 'value',
        categoryXField: 'category'
      })
    );

    xAxis.data.setAll(this.config.data);
    series.data.setAll(this.config.data);
  }

  ngOnDestroy(): void {
    this.root?.dispose();
  }
}
