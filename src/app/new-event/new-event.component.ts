import {Component, OnDestroy, OnInit} from '@angular/core';
import {Company} from '../../../backend/models/company.model';
import {CompaniesService} from '../services/companies/companies.service';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';
import {Event} from '../../../backend/models/event.model';


@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit, OnDestroy {

  eventTypes = ['Quality', 'Delivery'];
  companies: Company[] = [];
  events: Event[] = [];
  private companiesSub: Subscription;
  selectedEventType = null;


  mode = 'create';

  constructor(private  companyService: CompaniesService) { }

  ngOnInit() {
    this.companyService.getCompanies();
    this.companiesSub = this.companyService.getCompanyUpdateListener()
      .subscribe((companies: Company[]) => {
        this.companies = companies;
      });
    // getCompaniesList()
  }

  onSaveEvent(eventForm: NgForm) {

    if (this.mode === 'create') {
      console.log('Form Values: ', eventForm.value);
    }
  }
  updateEventTypeForm(event) {
    console.log('UpdateEventTypeForm: ', event);
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
  }



}
