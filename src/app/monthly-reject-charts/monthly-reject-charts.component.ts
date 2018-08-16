import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
@Component({
  selector: 'app-monthly-reject-charts',
  templateUrl: './monthly-reject-charts.component.html',
  styleUrls: ['./monthly-reject-charts.component.css'],

})
export class MonthlyRejectChartsComponent implements OnInit {
  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        data: [1, 2, 3]
      }
    ]

  });

  constructor() { }

  ngOnInit() {
  }

  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }
}
