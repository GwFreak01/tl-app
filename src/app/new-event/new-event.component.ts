import {Component, OnDestroy, OnInit} from '@angular/core';
import {Company} from '../../../backend/models/company.model';
import {CompaniesService} from '../services/companies/companies.service';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';
import {Event} from '../../../backend/models/event.model';
import {EventsService} from '../services/events/events.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';


@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit, OnDestroy {

  private mode = 'create';
  private eventId: string;
  eventTypes = ['Quality', 'Delivery'];
  statusOptions = ['Open', 'Pending', 'Closed'];
  companies: Company[] = [];
  events: Event[] = [];
  public event: Event;
  isLoading = false;
  private companiesSub: Subscription;
  selectedEventType = null;
  selectedStatusOption = 'Open';



  constructor(private  companiesService: CompaniesService,
              private eventsService: EventsService,
              public route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('eventId')) {
        console.log('Event OnInit');
        this.mode = 'edit';
        this.eventId = paramMap.get('eventId');
        this.isLoading = true;
        console.log('OnInitEventID: ', this.mode, this.eventId);
        this.eventsService.getEvent(this.eventId).subscribe(eventData => {
          this.isLoading = false;
          console.log('OnInitEventData: ', eventData);

          // console.log('OnInitEvent: ', this.event = eventData.companyName);
          const qualityEvent: Event = {
            id: this.eventId,
            companyName: eventData.companyName,
            eventType: eventData.eventType,
            eventDate: eventData.eventDate,
            tlPartNumber: eventData.tlPartNumber,
            purchaseOrderNumber: eventData.purchaseOrderNumber,
            lotNumber: eventData.lotNumber,
            carNumber: eventData.carNumber,
            quantityReject: eventData.quantityReject,
            requiredDate: null,
            actualDate: null,
            rootCause: eventData.rootCause,
            statusOption: eventData.statusOption,
          };

          const deliveryEvent: Event = {
            id: this.eventId,
            companyName: eventData.companyName,
            eventType: eventData.eventType,
            eventDate: eventData.eventDate,
            tlPartNumber: eventData.tlPartNumber,
            purchaseOrderNumber: eventData.purchaseOrderNumber,
            lotNumber: eventData.lotNumber,
            carNumber: eventData.carNumber,
            quantityReject: null,
            requiredDate: eventData.requiredDate,
            actualDate: eventData.actualDate,
            rootCause: eventData.rootCause,
            statusOption: eventData.statusOption,
          };
          if (eventData.eventType === 'Quality') {
            this.event = qualityEvent;
          } else {
            this.event = deliveryEvent;
          }
          console.log('AfterInit: ', this.event);

        });
      } else {
        this.mode = 'create';
        this.eventId = null;
      }
    });
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
      console.log(this.companies);
      const companyId = this.companies.filter(company => company.companyName === eventForm.value.companyName);
      console.log('Specific CompanyId: ', companyId[0].id);
      this.eventsService.addEvent(eventForm.value, companyId[0].id);
    } else {
      console.log('EditEvent: ', eventForm.value);
      this.eventsService.updateEvent(this.eventId, eventForm.value);
    }
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
  }



}
