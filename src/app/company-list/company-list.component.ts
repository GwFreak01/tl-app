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
import {CompanyDeleteModalComponent} from '../modals/company-delete-modal/company-delete-modal.component';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit, OnDestroy {


  @Output() editMode: EventEmitter<string> =  new EventEmitter<string>();

  isLoading = false;
  userIsAuthenticated = false;

  // dataSource = new EventDataSource(this.eventsService);

  dataSource: EventsDataSource;
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

      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    console.log('CompanyList.userIsAuthenicated: ', this.userIsAuthenticated);

    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        console.log('CompanyList.Auth: ', isAuthenticated);
        this.userIsAuthenticated = isAuthenticated;
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

  printEventLog(companyId: string) {
    // window.focus();
    // window.print();
    let companyEvents = this.events.filter(event => event.companyId === companyId);

    console.log('printEventLog: ', companyEvents);
    let data = document.getElementsByClassName('mat-expanded')[0].innerHTML;

    let newWindow = window.open('', '_blank');
    newWindow.document.write('<base href="/"><html><head>'+

      '</head><body>' +
      '\'<link rel="stylesheet" type="text/css" href="print.css"/>\'+ <div><table>' +
      data +
      '</table></div></body></html>');

    // newWindow.document.write(data);
    newWindow.focus();
    // newWindow.close();
    // newWindow.print();

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

export class EventsDataSource extends DataSource<any> {

  constructor(private eventsService: EventsService) {
    super();
  }

  connect(): Observable<Event[]> {
    return this.eventsService.getAllEvents();
  }

  disconnect(): void {
  }


}
