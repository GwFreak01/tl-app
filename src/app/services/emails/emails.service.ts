import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {EventsService} from '../events/events.service';
import {CompaniesService} from '../companies/companies.service';
import {Company} from '../../../../backend/models/company.model';
import {Event} from '../../../../backend/models/event.model';



const BACKEND_URL = environment.apiUrl + '/emails/';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  private events: Event[] = [];
  private company: Company;

  constructor(private http: HttpClient,
              private eventsService: EventsService,
              private companiesService: CompaniesService) { }
// TODO: Paramers need email and all events associated to company
  sendEmail(companyId: string) {
    this.companiesService.getCompany(companyId)
      .subscribe(response => {
        this.company = response.company;
        // console.log('Company: ', this.company);
        this.events = this.eventsService.getEvents()
          .filter(event => event.companyId === companyId);
        this.http.post<{message: string}>(BACKEND_URL, {company: this.company, events: this.events})
          .subscribe(response => {
            // console.log(response.message);
          }, error => {
            return error.message;
          });
      });



    // console.log(this.company);

  }
}
