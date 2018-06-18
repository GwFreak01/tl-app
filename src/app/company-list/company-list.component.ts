import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Input,
  Output
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


  @Output() editMode =  new EventEmitter<boolean>();
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

  onEdit(companyId, editSelected: boolean) {
    console.log('CompanyListEdit', companyId);
    this.editMode.emit(editSelected);
  }

  onDelete(companyId: string) {
    this.companyService.deleteCompany(companyId);
  }
}
