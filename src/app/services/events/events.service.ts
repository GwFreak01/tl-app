import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Event} from '../../../../backend/models/event.model';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/events/';
@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private events: Event[] = [];
  private eventsUpdated = new Subject<Event[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getEvents() {
    this.http.get<{ message: string, events: any }>(BACKEND_URL)
      .subscribe(response => {
        this.events = response.events;
        this.eventsUpdated.next([...this.events]);
      }, error => {
        console.log(error.message);
      });
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(BACKEND_URL + 'getAll');
  }
  getEventUpdateListener() {
    return this.eventsUpdated.asObservable();
  }

  getEvent(eventId: string) {
    return this.http.get<{message: string, event: Event}>(BACKEND_URL + eventId);
  }

  getCompanyEvents(companyId: string) {
    return this.events.filter(event => event.companyId === companyId);
  }
  addEvent(formValues, company) {
    // const event: Event = eventForm;
    // console.log('formValues: ', formValues);
    // console.log('EventsService.addEvent.company: ', company);
    this.http.post<{message: string, event: any}>(BACKEND_URL, {formValues: formValues, company: company})
      .subscribe(response => {
        const event = response.event;
        this.events.push(event);
        this.eventsUpdated.next([...this.events]);
      });

  }

  updateEvent(id: string, event) {
    // console.log('EventsService.updateEvent: ', event);
    const updatedEvent: Event = event;
    this.http.post(BACKEND_URL + id, event)
      .subscribe(response => {
        // console.log('EventsService.updateEvent.response: ', response);
        const updatedEvents = [...this.events];
        // console.log('EventService.updatedEvents: ', updatedEvents);
        const oldEventIndex = updatedEvents.findIndex(e => e._id === updatedEvent._id);
        updatedEvents[oldEventIndex] = event;
        this.events = updatedEvents;
        this.eventsUpdated.next([...this.events]);
        this.router.navigate(['/events']);
      });
  }

  updateEvents(companyId: string, companyName: string) {
    const effectedEvents = this.events.filter(effectedEvent => effectedEvent.companyId === companyId);
    // console.log('updateEvents.effectedEvents,OldCompanyName: ', effectedEvents, companyName);

    this.http.post<{message: string, events: any}>(BACKEND_URL + 'all',
      {companyId: companyId, companyName: companyName, effectedEvents: effectedEvents})
      .subscribe(response => {
        this.getEvents();
        this.eventsUpdated.next([...this.events]);
      }, error => {
        console.log(error.message);
      }, () => {
      });
  }
  deleteEvent(eventId: string) {
    this.http.delete(BACKEND_URL + eventId)
      .subscribe(() => {
        const updatedEvents = this.events.filter(event => event._id !== eventId);
        this.events = updatedEvents;
        this.eventsUpdated.next([...this.events]);
        console.log('Deleted!');
      });
  }
}
