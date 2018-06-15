import { Injectable } from '@angular/core';
import {Company} from '../../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  companies: Company[] = [];

  constructor() { }

  getCompanies() {
    return this.companies;
  }

  addCompany(newCompany: Company) {
    // const company: Company = newCompany;
    this.companies.push(newCompany);
  }
}
