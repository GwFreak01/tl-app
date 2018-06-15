import { Injectable } from '@angular/core';
import {Company} from '../../models/company.model';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private companies: Company[] = [];
  private companiesUpdated = new Subject<Company[]>();

  constructor() { }

  getCompanies() {
    return this.companies;
  }

  getCompanyUpdateListener() {
    return this.companiesUpdated.asObservable();
  }
  addCompany(newCompany: Company) {
    // const company: Company = newCompany;
    this.companies.push(newCompany);
    this.companiesUpdated.next([...this.companies]);
  }
}
