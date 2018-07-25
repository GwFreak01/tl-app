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
  // myDatepickerQ1 = '';
  myDatepickerQ2 = new Date();
  myDatepickerQ3 = new Date();
  myDatepickerQ4 = new Date();

  constructor() {
    // Q1Date = new Date();
    // this.myDatepickerQ1 = new Date().toISOString();


  }

  updateEmailDates(Q1Date) {
    console.log('Q1Date: ', Q1Date);
  }
}
