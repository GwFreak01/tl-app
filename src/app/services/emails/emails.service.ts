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
  private companies: Company[] = [];
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
    this.companiesService.getAllCompanies().subscribe(companies => {
      this.companies = companies;
    }, err => {
      console.log(err);
    } , () => {
      console.log('AllFeedbackCompanies: ', this.companies);
      // localStorage.setItem('companies');
      // window.events = this.events;
      this.eventsService.getAllEvents().subscribe(events => {
        this.events = events;
      }, err => {
        console.log(err);
      } , () => {
        console.log('AllFeedbackEvents: ', this.events);
        // localStorage.setItem('companies');
        // window.events = this.events;
        this.http.post<{ message: string,
          emailList: any,
          eventsList: any  }>(BACKEND_URL + '/emailAllCompanies', {companies: this.companies, events: this.events})
          .subscribe(response => {
            console.log(response.message);
          });
      });
    });
  }

  requestCompanyUpdate(company: Company) {
    const emailListUsers = [];
    if (company.salesPerson.status) {
      emailListUsers.push(company.salesPerson.email);
    }
    if (company.qualityPerson.status) {
      emailListUsers.push(company.qualityPerson.email);
    }
    if (company.logisticsPerson.status) {
      emailListUsers.push(company.logisticsPerson.email);
    }
    if (company.differentPerson.status) {
      emailListUsers.push(company.differentPerson.email);
    }

    this.http.post<{ message: string }>(BACKEND_URL + '/requestCompanyUpdate', emailListUsers)
      .subscribe(response => {
        console.log(response.message);
      });

  }
}
