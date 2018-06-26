import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Event} from '../../../../backend/models/event.model';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/events';
@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private events: Event[] = [];
  private eventsUpdated = new Subject<Event[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getEvents() {
    this.http.get<{ message: string, events: any }>(BACKEND_URL)
      .pipe(map(eventData => {
        return eventData.events.map(event => {
          // console.log('GetEvents: ', event);
          if (event.eventType === 'Quality') {
            return {
              id: event._id,
              companyName: event.companyName,
              companyId: event.companyId,
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
              companyId: event.companyId,
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
        // console.log('Transformed Events: ', transformedEvents);
        this.events = transformedEvents;
        this.eventsUpdated.next([...this.events]);
        // return transformedEvents;

      });
    return this.events;
  }

  getAllEvents(): Observable<Event[]> {
    // console.log('getAllEvents');
    return this.http.get<Event[]>(BACKEND_URL + '/getAll');
    // this.http.get<{ events: any }>(BACKEND_URL + '/getAll')
    //   .pipe(map(eventData => {
    //     if (eventData.events.eventType === 'Quality') {
    //       return {
    //         id: eventData.events._id,
    //         companyName: eventData.events.companyName,
    //         companyId: eventData.events.companyId,
    //         eventType: eventData.events.eventType,
    //         eventDate: eventData.events.eventDate,
    //         tlPartNumber: eventData.events.tlPartNumber,
    //         purchaseOrderNumber: eventData.events.purchaseOrderNumber,
    //         lotNumber: eventData.events.lotNumber,
    //         carNumber: eventData.events.carNumber,
    //         quantityReject: eventData.events.quantityReject,
    //         rootCause: eventData.events.rootCause,
    //         statusOption: eventData.events.statusOption,
    //       };
    //     } else {
    //       return {
    //         id: eventData.events._id,
    //         companyName: eventData.events.companyName,
    //         companyId: eventData.events.companyId,
    //         eventType: eventData.events.eventType,
    //         eventDate: eventData.events.eventDate,
    //         tlPartNumber: eventData.events.tlPartNumber,
    //         purchaseOrderNumber: eventData.events.purchaseOrderNumber,
    //         lotNumber: eventData.events.lotNumber,
    //         carNumber: eventData.events.carNumber,
    //         requiredDate: eventData.events.requiredDate,
    //         actualDate: eventData.events.actualDate,
    //         rootCause: eventData.events.rootCause,
    //         statusOption: eventData.events.statusOption,
    //       };
    //     }
    //   }))
    //   .subscribe(transformedEvents => {
    //     // this.events = transformedEvents;
    //     this.eventsUpdated.next([...this.events]);
    //   });
    // return this.eventsUpdated;
  // )
  //   })

    //   .pipe(map(eventData => {
    //   return eventData.events.map(event => {
    //     if (event.eventType === 'Quality') {
    //       return {
    //         id: event._id,
    //         companyName: event.companyName,
    //         companyId: event.companyId,
    //         eventType: event.eventType,
    //         eventDate: event.eventDate,
    //         tlPartNumber: event.tlPartNumber,
    //         purchaseOrderNumber: event.purchaseOrderNumber,
    //         lotNumber: event.lotNumber,
    //         carNumber: event.carNumber,
    //         quantityReject: event.quantityReject,
    //         rootCause: event.rootCause,
    //         statusOption: event.statusOption,
    //       };
    //     } else {
    //       return {
    //         id: event.event._id,
    //         companyName: event.companyName,
    //         companyId: event.companyId,
    //         eventType: event.eventType,
    //         eventDate: event.eventDate,
    //         tlPartNumber: event.tlPartNumber,
    //         purchaseOrderNumber: event.purchaseOrderNumber,
    //         lotNumber: event.lotNumber,
    //         carNumber: event.carNumber,
    //         requiredDate: event.requiredDate,
    //         actualDate: event.actualDate,
    //         rootCause: event.rootCause,
    //         statusOption: event.statusOption,
    //       };
    //     }
    //   });
    //
    // }));
  }
  getEventUpdateListener() {
    return this.eventsUpdated.asObservable();
  }

  getEvent(id: string) {
    return this.http.get<{event: any}>(BACKEND_URL + id);
  }
  addEvent(eventForm, companyId) {
    const event: Event = eventForm;
    console.log('EventService.add: ', eventForm);


    this.http.post<{message: string, eventId: string}>(BACKEND_URL, {event: event, companyId: companyId})
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
    this.http.put(BACKEND_URL + id, event)
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

  updateEvents(companyId: string, companyName: string) {
    const effectedEvents = this.events.filter(effectedEvent => effectedEvent.companyId === companyId);
    console.log('updateEvents.effectedEvents,OldCompanyName: ', effectedEvents, companyName);

    this.http.post<{message: string}>(BACKEND_URL + '/all', {companyId: companyId, companyName: companyName})
      .subscribe(response => {
        this.getEvents();
      }, error => {
        console.log(error.message);
      });
  }
  deleteEvent(eventId: string) {
    this.http.delete(BACKEND_URL + eventId)
      .subscribe(() => {
        const updatedEvents = this.events.filter(event => event.id !== eventId);
        this.events = updatedEvents;
        this.eventsUpdated.next([...this.events]);
        console.log('Deleted!');
      });
  }

  getCompanyEvents(companyName: string) {

  }


}
