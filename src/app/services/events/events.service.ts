import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Event} from '../../../../backend/models/event.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private events: Event[] = [];
  private eventsUpdated = new Subject<Event[]>();
  constructor(private http: HttpClient, private router: Router) { }

  getEvents() {
    this.http.get<{ message: string, events: any }>('http://localhost:3000/api/events')
      .pipe(map(eventData => {
        return eventData.events.map(event => {
          console.log('GetEvents: ', event);
          if (event.eventType === 'Quality') {
            return {
              id: event._id,
              companyName: event.companyName,
              eventType: event.eventType,
              eventDate: event.eventDate,
              tlPartNumber: event.tlPartNumber,
              purchaseOrderNumber: event.purchaseOrderNumber,
              lotNumber: event.lotNumber,
              carNumber: event.carNumber,
              quantityReject: event.quantityReject,
              rootCause: event.rootCause,
              statusOption: event.statusOption,
            };
          } else {
            return {
              id: event._id,
              companyName: event.companyName,
              eventType: event.eventType,
              eventDate: event.eventDate,
              tlPartNumber: event.tlPartNumber,
              purchaseOrderNumber: event.purchaseOrderNumber,
              lotNumber: event.lotNumber,
              carNumber: event.carNumber,
              requiredDate: event.requiredDate,
              actualDate: event.actualDate,
              rootCause: event.rootCause,
              statusOption: event.statusOption,
            };
          }

        });
      }))
      .subscribe(transformedEvents => {
        console.log('Transformed Events: ', transformedEvents);
        this.events = transformedEvents;
        this.eventsUpdated.next([...this.events]);
      });
  }

  getEventUpdateListener() {
    return this.eventsUpdated.asObservable();
  }

  getEvent(id: string) {
    return this.http.get<{
      id: string,
      companyName: string,
      eventType: string,
      eventDate: string,
      tlPartNumber: string,
      purchaseOrderNumber: string,
      lotNumber: string,
      carNumber: string,
      quantityReject: number,
      requiredDate: string,
      actualDate: string,
      rootCause: string,
      statusOption: number,
    }>('http://localhost:3000/api/events/' + id);
  }
  addEvent(eventForm) {
    const event: Event = eventForm;
    console.log('EventService.add: ', eventForm);

    this.http.post<{message: string, eventId: string}>('http://localhost:3000/api/events', event)
      .subscribe(response => {
        const eventId = response.eventId;
        event.id = eventId;
        this.events.push(event);
        this.eventsUpdated.next([...this.events]);
        console.log(response);
        console.log(this.events);
        console.log(this.eventsUpdated);

        console.log('EventServ done');
      });

  }

  updateEvent(id: string, event) {
    console.log('EventsService.updateEvent: ', event);
    const updatedEvent: Event = event;
    this.http.put('http://localhost:3000/api/events/' + id, event)
      .subscribe(response => {
        console.log('EventsService.updateEvent.response: ', response);
        const updatedEvents = [...this.events];
        console.log('EventService.updatedEvents: ', updatedEvents);
        const oldEventIndex = updatedEvents.findIndex(e => e.id === updatedEvent.id);
        updatedEvents[oldEventIndex] = event;
        this.events = updatedEvents;
        this.eventsUpdated.next([...this.events]);
        this.router.navigate(['/events']);
      });
  }
  deleteEvent(eventId: string) {
    this.http.delete('http://localhost:3000/api/events/' + eventId)
      .subscribe(() => {
        const updatedEvents = this.events.filter(event => event.id !== eventId);
        this.events = updatedEvents;
        this.eventsUpdated.next([...this.events]);
        console.log('Deleted!');
      });
  }
}
