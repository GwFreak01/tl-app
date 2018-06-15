import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import {Company} from '../../../backend/models/company.model';
import {CompaniesService} from '../services/companies/companies.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit, OnDestroy {

  companies: Company[] = [];
  private companiesSub: Subscription;

  constructor(public companyService: CompaniesService) { }

  ngOnInit() {
    this.companyService.getCompanies();
    this.companiesSub = this.companyService.getCompanyUpdateListener()
      .subscribe((companies: Company[]) => {
        this.companies = companies;
    });
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
  }

  onDelete(companyId: string) {
    this.companyService.deleteCompany(companyId);
  }
}
