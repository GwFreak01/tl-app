import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
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

  @Output() hideNewForm: EventEmitter<boolean> = new EventEmitter<boolean>();
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
        // console.log('Event OnInit');
        this.mode = 'edit';
        this.eventId = paramMap.get('eventId');
        this.isLoading = true;
        // console.log('OnInitEventID: ', this.mode, this.eventId);
        this.eventsService.getEvent(this.eventId)
          .subscribe(eventData => {
            this.isLoading = false;
            // console.log('OnInitEventData: ', eventData);
            this.event = eventData.event;
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
  }

  onSaveEvent(eventForm: NgForm) {

    if (this.mode === 'create') {
      this.isLoading = true;
      // console.log('Form Values: ', eventForm.value);
      // console.log(this.companies);
      const associatedCompany = this.companies.filter(company => company.companyName === eventForm.value.companyName);
      // console.log(associatedCompany);
      // console.log('Specific CompanyId: ', companyId[0]._id);
      this.eventsService.addEvent(eventForm.value, associatedCompany);
      // this.router.navigate(['/events']);
      // this.companiesService.updateCompany(companyId[0].id, )
    } else {
      // console.log('EditEvent: ', eventForm.value);
      this.eventsService.updateEvent(this.eventId, eventForm.value);
    }

    this.hideNewForm.emit(false);

  }

  onCancelEvent() {
    console.log('onCancelEvent');
    this.hideNewForm.emit(false);
  }
  ngOnDestroy() {
    this.companiesSub.unsubscribe();
  }



}
