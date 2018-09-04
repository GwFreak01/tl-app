import {Component, OnDestroy, OnInit} from '@angular/core';
import {Event} from '../../../backend/models/event.model';
import {Subscription} from 'rxjs';
import {EventsService} from '../services/events/events.service';
import {AuthService} from '../auth/auth.service';
import {CompanyDeleteModalComponent} from '../modals/company-delete-modal/company-delete-modal.component';
import {duration} from 'moment';
import {MatDialog} from '@angular/material';
import {EventDeleteModalComponent} from '../modals/event-delete-modal/event-delete-modal.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {

  events: Event[] = [];
  isLoading = false;
  private eventsSub: Subscription;
  private authStatusSub = new Subscription();
  associatedCompanyName: string;
  associatedUserCompany: string;

  userIsAuthenticated = false;

  constructor(private eventsService: EventsService,
              private authService: AuthService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.associatedUserCompany = this.authService.getUsername();
    this.associatedCompanyName = this.authService.getUserCompany();
    this.userIsAuthenticated = this.authService.getIsAuth();
    console.log('EventList.userIsAuthenticated: ', this.userIsAuthenticated);
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        // console.log('EventList.Ath: ', isAuthenticated);
        this.userIsAuthenticated = isAuthenticated;
        this.associatedUserCompany = this.authService.getUsername();
        this.associatedCompanyName = this.authService.getUserCompany();
      });
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
        console.log('Event List: ', this.events);
      });

  }

  ngOnDestroy() {
    this.eventsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onDelete(eventId: string, companyName: string) {
    // console.log('Delete: ', eventId);
    const dialogRef = this.dialog.open(EventDeleteModalComponent, {
      // height: '400px',
      width: '600px',
      data: {
        eventId: eventId,
        companyName: companyName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      // this.dialogResult = result;
      duration(500);
    });
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
}
