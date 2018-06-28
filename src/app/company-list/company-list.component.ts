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
// import {EventsDataSource} from '../events/EventsDataSource';
import {MatTableDataSource} from '@angular/material';
import {EmailsService} from '../services/emails/emails.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit, OnDestroy {


  @Output() editMode =  new EventEmitter<boolean>();
  companies: Company[] = [];
  isLoading = false;
  private companiesSub: Subscription;
  private authStatusSub = new Subscription();
  userIsAuthenticated = false;

  // dataSource = new EventDataSource(this.eventsService);

  dataSource: EventsDataSource;
  columnsToDisplay = ['eventDate', 'eventType', 'carNumber', 'status'];

  private events: Event[];
  private eventsSub: Subscription;

  constructor(public companiesService: CompaniesService,
              private eventsService: EventsService,
              private authService: AuthService,
              private emailsService: EmailsService) { }

  ngOnInit() {


    this.isLoading = true;
    this.eventsService.getEvents();
    this.eventsSub = this.eventsService.getEventUpdateListener()
      .subscribe((events: Event[]) => {
        this.isLoading = false;
        this.events = events;
        console.log('CompanyEvents: ', events);
      });
    this.companiesService.getCompanies();
    this.companiesSub = this.companiesService.getCompanyUpdateListener()
      .subscribe((companies: Company[]) => {
        this.isLoading = false;
        this.companies = companies;

      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    console.log('CompanyList.userIsAuthenicated: ', this.userIsAuthenticated);

    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        console.log('CompanyList.Auth: ', isAuthenticated);
        this.userIsAuthenticated = isAuthenticated;
      });
    this.dataSource = new EventsDataSource(this.eventsService);
    console.log('DataSource: ', this.dataSource);

  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
    this.eventsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onEdit(companyId, editSelected: boolean) {
    console.log('CompanyListEdit', companyId);
    this.editMode.emit(editSelected);
  }

  onDelete(companyId: string) {
    this.companiesService.deleteCompany(companyId);
  }

  getEventTable(company) {
    let companyEvents: Event[] = [];
      companyEvents = this.events.filter(event => event.companyName === company.companyName);
    if (companyEvents == null) {
      return companyEvents;
    } else {
    }
    return companyEvents;
  }

  getColor(status: string) {
    if (status === 'Open') {
      return '#ef5350';
    } else if (status === 'Pending') {
      return '#FFEE58';
    } else if (status === 'Closed') {
      return '#66BB6A';
    }
  }

  sendEmail(companyId: string) {
    console.log(companyId);
    this.emailsService.sendEmail(companyId);

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
