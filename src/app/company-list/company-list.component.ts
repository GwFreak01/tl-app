import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {Company} from '../../../backend/models/company.model';
import {Event} from '../../../backend/models/event.model';
import {CompaniesService} from '../services/companies/companies.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {DataSource} from '@angular/cdk/table';
import {EventsService} from '../services/events/events.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {EmailsService} from '../services/emails/emails.service';
import {CompanyReportModalComponent} from '../modals/company-report-modal/company-report-modal.component';
import {CompanyRegistrationModalComponent} from '../modals/company-registration-modal/company-registration-modal.component';
import {duration} from 'moment';
import * as moment from 'moment';
import {CompanyDeleteModalComponent} from '../modals/company-delete-modal/company-delete-modal.component';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit, OnDestroy {


  @Output() editMode: EventEmitter<string> =  new EventEmitter<string>();

  associatedCompanyName: string;
  associatedUserCompany: string;
  isLoading = false;
  userIsAuthenticated = false;

  // dataSource = new EventDataSource(this.eventsService);

  // dataSource: EventsDataSource;
  columnsToDisplay = ['eventDate', 'eventType', 'carNumber', 'status'];
  private authStatusSub = new Subscription();

  companies: Company[] = [];
  private companiesSub: Subscription;

  private events: Event[];
  private eventsSub: Subscription;

  constructor(public companiesService: CompaniesService,
              private eventsService: EventsService,
              private authService: AuthService,
              private emailsService: EmailsService,
              private dialog: MatDialog) { }

  ngOnInit() {
    // this.dataSource = new EventsDataSource(this.eventsService);

    this.isLoading = true;
    this.eventsService.getEvents();
    this.associatedUserCompany = this.authService.getUsername();
    this.associatedCompanyName = this.authService.getUserCompany();
    this.eventsSub = this.eventsService.getEventUpdateListener()
      .subscribe((events: Event[]) => {
        this.isLoading = false;
        this.events = events;
        console.log('AllCompanyEvents: ', events);
      }, error => {
        if (error) {
          console.log(error);
        }
      }, () => {

      });
    this.companiesService.getCompanies();
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
        console.log('Current associatedUserCompany: ', this.associatedUserCompany);
        console.log('Current associatedCompanyName: ', this.associatedCompanyName);
      });

    this.userIsAuthenticated = this.authService.getIsAuth();
    console.log('CompanyList.userIsAuthenicated: ', this.userIsAuthenticated);

    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        console.log('CompanyList.Auth: ', isAuthenticated);
        this.userIsAuthenticated = isAuthenticated;
        this.associatedUserCompany = this.authService.getUsername();
        this.associatedCompanyName = this.authService.getUserCompany();
        console.log('Current associatedUserCompany: ', this.associatedUserCompany);
        console.log('Current associatedCompanyName: ', this.associatedCompanyName);
      });
    // console.log('DataSource: ', this.dataSource);

  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
    this.eventsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onEditCompany(companyId: string) {
    console.log('CompanyListEdit', companyId);
    this.editMode.emit('edit');
  }

  onDelete(companyId: string, companyName: string) {
    console.log('companyId: ', companyId);
    console.log('companyName: ', companyName);
    const dialogRef = this.dialog.open(CompanyDeleteModalComponent, {
      // height: '400px',
      width: '600px',
      data: {companyName: companyName,
      companyId: companyId}
      // companyName: companyName,
      // companyId: companyId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      // this.dialogResult = result;
      duration(500);
    });

  }

  getEventTable(company) {
    const sortOrder = ['Open', 'Pending', 'Closed'];

    const companyEvents = this.eventsService.getCompanyEvents(company._id)
      .sort(function (a, b) {
        return sortOrder.indexOf(a.statusOption) - sortOrder.indexOf(b.statusOption);
      })
      .sort(function (a, b) {
        return Date.parse(a.eventDate) - Date.parse(b.eventDate);
      })
    ;
    // console.log('companyEvents: ', companyEvents);

    // window.companyEvt = companyEvents;

    if (companyEvents == null) {
      return companyEvents;
    } else {
    }
    return companyEvents;
  }

  getColor(status: string) {
    if (status === 'Open') {
      return '#EF5350';
    } else if (status === 'Pending') {
      return '#FFEE58';
    } else if (status === 'Closed') {
      return '#66BB6A';
    }
  }

  requestUpdate(companyId: string) {
    const associatedCompany = this.companies.filter(company => company._id === companyId);
    // let emailList = [];
    // for (let i = 0; i <= 4; i++) {
    //   if
    // }
    // console.log(associatedCompany);
    this.authService.createBulkUsers(associatedCompany[0]);
    this.emailsService.requestCompanyUpdate(associatedCompany[0]);
  }
  printEventLog(companyId: string) {
    // window.focus();
    // window.print();
    const companyEvents = this.events.filter(event => event.companyId === companyId);
    const associatedCompany = this.companies.filter(company => company._id === companyId);

    console.log('printEventLog: ', companyEvents);
    console.log('printCompanyLog: ', associatedCompany);
    // let data = document.getElementsByClassName('mat-expanded')[0].innerHTML;

    const newWindow = window.open('', '_blank');
    // newWindow.document.write('<base href="/"><html><head>'+
    //
    //   '</head><body>' +
    //   '\'<link rel="stylesheet" type="text/css" href="print.css"/>\'+ <div><table>' +
    //   data +
    //   '</table></div></body></html>');


    // newWindow.document.write('<head><base href="/">' +
    //   '<link type="text/css" href="print.css">' +
    //   '</head>');
    newWindow.document.write('<head><style>' +
      'table {' +
      'font-size: 30px;' +
      'border-spacing: 20px;' +
      'text-align: center;' +
      'margin: 0 auto;' +
      '}' +
      '.eventsHeader {' +
      'text-align: center;' +
      '}' +
      '</style></head>');
    newWindow.document.write('<body><h1>Company: ');
    newWindow.document.write(companyEvents[0].companyName);
    newWindow.document.write('</h1>');
    newWindow.document.write('<h2>Address: ');
    newWindow.document.write(associatedCompany[0].companyAddress.street1 + ' ' +
      (associatedCompany[0].companyAddress.street2 ? associatedCompany[0].companyAddress.street2 : '') + '<br>' +
      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp' +
      associatedCompany[0].companyAddress.city + ', ' +
      associatedCompany[0].companyAddress.state + ' ' +
      associatedCompany[0].companyAddress.zipcode + '</h2>');

    newWindow.document.write('<div class="eventsHeader"><h1><u>EVENT LOG</u></h1></div>');


    newWindow.document.write('<table><tr><th>Date</th><th>Type</th><th>CAR #</th><th>Status</th></tr>');


    // newWindow.document.write('<tr><td>1/1/2018</td><td>Quality</td><td>234121f</td><td>Open</td></tr>')

    for (let eventIndex = 0; eventIndex <= companyEvents.length - 1; eventIndex++) {
      newWindow.document.write('<tr><td>');
      newWindow.document.write(moment(companyEvents[eventIndex].eventDate).format('MMMM Do YYYY'));
      newWindow.document.write('</td><td>');
      newWindow.document.write(companyEvents[eventIndex].eventType);
      newWindow.document.write('</td><td>');
      newWindow.document.write(companyEvents[eventIndex].carNumber);
      newWindow.document.write('</td><td>');
      newWindow.document.write(companyEvents[eventIndex].statusOption);
      newWindow.document.write('</td></tr>');
    }

    newWindow.document.write('</table>');
    newWindow.document.write('</body>');
    newWindow.focus();
    newWindow.print();
    newWindow.close();

    // newWindow.focus();

    // newWindow.print();

  }
  sendEmail(companyId: string) {
    // console.log(companyId);
    // const associatedCompany = this.companies.filter(company => company._id === companyId);
    // const associatedEvents = this.events.filter(event => event.companyId === companyId);

    // this.emailsService.sendEmail(associatedCompany[0], associatedEvents);

    const dialogRef = this.dialog.open(CompanyReportModalComponent, {
      width: '600px',

    });

    dialogRef.afterOpen().subscribe(result => {
      console.log('Dialog opened!');
      this.emailsService.sendEmail(companyId);
    });
  }
}

// export class EventsDataSource extends DataSource<any> {
//
//   constructor(private eventsService: EventsService) {
//     super();
//   }
//
//   connect(): Observable<Event[]> {
//     return this.eventsService.getAllEvents();
//   }
//
//   disconnect(): void {
//   }
//
//
// }
