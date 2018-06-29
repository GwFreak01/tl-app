import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {EventsService} from '../events/events.service';
import {CompaniesService} from '../companies/companies.service';
import {Company} from '../../../../backend/models/company.model';
import {Event} from '../../../../backend/models/event.model';
import {Subscription} from 'rxjs';



const BACKEND_URL = environment.apiUrl + '/emails/';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  private events: Event[] = [];
  private company: Company;

  private eventsSub: Subscription;



  constructor(private http: HttpClient,
              private eventsService: EventsService,
              private companiesService: CompaniesService) {
  }
// TODO: Paramers need email and all events associated to company
  sendEmail(companyId: string) {

    this.companiesService.getCompany(companyId)
      .subscribe(response => {
        this.company = response.company;
        // console.log('Company: ', this.company);
        // .filter(event => event.companyId === companyId);
      }, error => {
        console.log(error.message);
      }, () => {
        this.eventsService.getEvents();
        this.eventsSub = this.eventsService.getEventUpdateListener()
          .subscribe((events: Event[]) => {
            const associatedEvents = events.filter(event => event.companyId === companyId);
            this.events = associatedEvents;
            console.log('associatedEvents: ', associatedEvents);
            console.log('EmailService.events: ', this.events);

          }, error => {
            console.log(error.message);
          }, () => {
          });


      });





    // console.log(this.company);

  }
}
