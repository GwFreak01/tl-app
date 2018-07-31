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
//   sendEmail(company: Company, events: Event[]) {
  sendEmail(companyId: string) {
    console.log(companyId);

    // this.eventsService.getEvent(company.companyId)
    this.companiesService.getCompany(companyId)
      .subscribe(response => {
        this.company = response.company;
        console.log();
      }, error => {
        if (error) {
          console.log(error);
        }
      }, () => {
        this.events = this.eventsService.getCompanyEvents(companyId);
        console.log('sendEmailEvents: ', this.events);
        this.http.post<{ message: string }>(BACKEND_URL + '/emailCompany', {company: this.company, events: this.events})
          .subscribe(emailResponse => {
            console.log(emailResponse.message);
          }, error => {
            return error.message;
          });
      });

  }

  sendCompanyRegistration(email: string) {
    // console.log(email);
    this.http.post<{ message: string }>(BACKEND_URL + '/emailCompanyRegistration', {email: email})
      .subscribe(response => {
        console.log(response.message);
      });

  }

  sendAllFeedback() {
    console.log('AllFeedbackCompanies: ', this.companiesService.getCompanies());
    console.log('AllFeedbackEvents: ', this.eventsService.getAllEvents().subscribe(events => {
      return events;
    }));
  }

}
