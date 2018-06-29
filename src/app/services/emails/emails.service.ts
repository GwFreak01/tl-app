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
  private companiesSub: Subscription;


  constructor(private http: HttpClient,
              private eventsService: EventsService,
              private companiesService: CompaniesService) {
  }

// TODO: Paramers need email and all events associated to company
  sendEmail(company: Company, events: Event[]) {
    console.log(company);
    this.http.post<{ message: string }>(BACKEND_URL + '/emailCompany', {company: company, events: events})
      .subscribe(emailResponse => {
        console.log(emailResponse.message);
      }, error => {
        return error.message;
      });
  }
}
