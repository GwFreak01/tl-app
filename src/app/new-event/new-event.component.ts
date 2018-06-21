import {Component, OnDestroy, OnInit} from '@angular/core';
import {Company} from '../../../backend/models/company.model';
import {CompaniesService} from '../services/companies/companies.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit, OnDestroy {

  eventTypes = ['Quality', 'Delivery'];
  companies: Company[] = [];
  private companiesSub: Subscription;
  constructor(private  companyService: CompaniesService) { }

  ngOnInit() {
    this.companyService.getCompanies();
    this.companiesSub = this.companyService.getCompanyUpdateListener()
      .subscribe((companies: Company[]) => {
        this.companies = companies;
      });
    // getCompaniesList()
  }


  ngOnDestroy() {
    this.companiesSub.unsubscribe();
  }

}
