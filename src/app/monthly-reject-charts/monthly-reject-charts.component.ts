import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import {Event} from '../../../backend/models/event.model';
import {Subscription} from 'rxjs';
import {EventsService} from '../services/events/events.service';
import {CompaniesService} from '../services/companies/companies.service';
import {Company} from '../../../backend/models/company.model';
import * as moment from 'moment';
@Component({
  selector: 'app-monthly-reject-charts',
  templateUrl: './monthly-reject-charts.component.html',
  styleUrls: ['./monthly-reject-charts.component.css'],

})
export class MonthlyRejectChartsComponent implements OnInit {

  companies: Company[] = [];
  private companiesSub: Subscription;
  events: Event[] = [];
  chartData = [];
  isLoading = false;
  private eventsSub: Subscription;

  private months = {
    'January': '01',
    'February': '02',
    'March': '03',
    'April': '04',
    'May': '05',
    'June': '06',
    'July': '07',
    'August': '08',
    'September': '09',
    'October': '10',
    'November': '11',
    'December': '12'
  };
  private chart;

  constructor(public companiesService: CompaniesService,
              private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getEvents();
    this.eventsSub = this.eventsService.getEventUpdateListener()
      .subscribe((events: Event[]) => {
        const sortOrder = ['Open', 'Pending', 'Closed'];
        this.events = events
          .sort(function (a, b) {
            return sortOrder.indexOf(a.statusOption) - sortOrder.indexOf(b.statusOption);
          })
          .sort(function (a, b) {
            return Date.parse(a.eventDate) - Date.parse(b.eventDate);
          })
          .sort(function (a, b) {
            const nameA = a.companyName.toUpperCase();
            const nameB = b.companyName.toUpperCase();
            if (nameA < nameB) {
              return - 1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
        this.isLoading = false;
        // console.log('EventSub: ', events);
        console.log('Analytics Event List: ', this.events);
      });

    // this.companiesService.getCompanies();
    this.companiesSub = this.companiesService.getCompanyUpdateListener()
      .subscribe((companies: Company[]) => {
        this.isLoading = false;
        this.companies = companies
          .sort(function (a, b) {
            const nameA = a.companyName.toUpperCase();
            const nameB = b.companyName.toUpperCase();
            if (nameA < nameB) {
              return - 1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });

        this.companies.forEach((company, index, array) => {
          console.log('test');
          const incidentCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          this.events.forEach(events => {
            if (events.companyName === company.companyName) {
              const d = new Date(events.eventDate);
              const monthNum = moment().month(d.getMonth()).format('M');
              console.log('Event Date: ', moment().month(d.getMonth()).format('M'));
              incidentCount[(monthNum - 1)]++;
              console.log('incidentCount: ', incidentCount);
            }
          });
          const singleCompany = {
            name: company.companyName,
            data: incidentCount
          };
          console.log('chartDataFilter: ', this.chartData.filter(data => data.name === singleCompany.name));
          // if (this.chartData.filter(data => data.name === singleCompany.name)) {
          //   console.log(data.)
          //   return;
          // } else {
          if (this.chartData.filter(data => data.name === singleCompany.name)[0] === singleCompany.name) {
            console.log('found company already');
            return;
          } else {
            console.log('not found company already');

            this.chartData.push(singleCompany);
          }
        });
        // this.chartData = this.chartData.filter((chartData, index, self) =>
        //   self.findIndex(t => t.name === chartData.name && t.data === chartData.data) === index);
        console.log('Analytics Company List: ', this.companies);

        console.log('chartData: ', this.chartData);
        this.chart = new Chart({
          chart: {
            type: 'column'
          },
          title: {
            text: 'Monthly Reject and Delivery Incidences'
          },
          xAxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ],
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Number of Incidences'
            }
          },
          // series: [{
          //   name: 'Tokyo',
          //   data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
          //
          // }, {
          //   name: 'New York',
          //   data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
          //
          // }, {
          //   name: 'London',
          //   data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
          //
          // }, {
          //   name: 'Berlin',
          //   data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
          //
          // }],

          series: this.chartData,
          credits: {
            enabled: false
          },
          // series: [
          //   {
          //     name: 'Line 1',
          //     data: [1, 2, 3]
          //   }
          // ]

        });

      });





  }


  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }
}
