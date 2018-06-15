import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  cards = [
    { title: 'Analytics', cols: 2, rows: 1 },
    { title: 'Companies', cols: 1, rows: 1 },
    { title: 'Events', cols: 1, rows: 2 },
    { title: 'Email', cols: 1, rows: 1 }
  ];
}
