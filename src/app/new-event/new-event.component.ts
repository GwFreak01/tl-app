import {Component, OnDestroy, OnInit} from '@angular/core';
import {Company} from '../../../backend/models/company.model';
import {CompaniesService} from '../services/companies/companies.service';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';
import {Event} from '../../../backend/models/event.model';
import {EventsService} from '../services/events/events.service';


@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit, OnDestroy {

  eventTypes = ['Quality', 'Delivery'];
  statusOptions = ['Open', 'Pending', 'Closed'];
  companies: Company[] = [];
  events: Event[] = [];
  event: Event = null;
  private companiesSub: Subscription;
  selectedEventType = null;
  selectedStatusOption = 'Open';


  mode = 'create';

  constructor(private  companiesService: CompaniesService,
              private eventsService: EventsService) { }

  ngOnInit() {
    this.companiesService.getCompanies();
    this.companiesSub = this.companiesService.getCompanyUpdateListener()
      .subscribe((companies: Company[]) => {
        this.companies = companies;
      });
    // getCompaniesList()
  }

  onSaveEvent(eventForm: NgForm) {

    if (this.mode === 'create') {
      console.log('Form Values: ', eventForm.value);
      this.eventsService.addEvent(eventForm.value);
    }
  }
  updateEventTypeForm(event) {
    console.log('UpdateEventTypeForm: ', event);
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
  }



}
