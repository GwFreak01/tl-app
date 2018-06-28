import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {EventsService} from '../events/events.service';
import {CompaniesService} from '../companies/companies.service';
import {Company} from '../../../../backend/models/company.model';



const BACKEND_URL = environment.apiUrl + '/emails/';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  constructor(private http: HttpClient,
              private eventsService: EventsService,
              private companiesService: CompaniesService) { }
// TODO: Paramers need email and all events associated to company
  sendEmail(companyId: string) {
    const company = this.companiesService.getCompany(companyId);
    const allEvents = this.eventsService.getEvents();
    const associatedEvents = allEvents.filter(event => event.companyId === companyId);
    console.log(associatedEvents);
    this.http.post<{message: string}>(BACKEND_URL, {companyId: companyId, events: associatedEvents})
      .subscribe(response => {
        console.log(response.message);
      });
  }
}
