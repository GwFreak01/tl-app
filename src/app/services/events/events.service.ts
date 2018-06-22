import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  addEvent(eventForm) {
    console.log('EventService.add: ', eventForm);
    this.http.post<{message: string}>('http://localhost:3000/api/events', eventForm)
      .subscribe(response => {
        console.log(response);
        console.log('EventServ done');
      });

  }
}
