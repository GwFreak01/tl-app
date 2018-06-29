import { Injectable } from '@angular/core';
import {Company} from '../../../../backend/models/company.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

import {environment} from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/companies/';
@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private companies: Company[] = [];
  private companiesUpdated = new Subject<Company[]>();

  constructor(private http: HttpClient,
              private router: Router) { }

  getCompanies() {
    this.http.get<{ message: string, companies: any }>(BACKEND_URL)
      .subscribe(response => {
        this.companies = response.companies;
        this.companiesUpdated.next([...this.companies]);
      });
  }

  getCompanyUpdateListener() {
    return this.companiesUpdated.asObservable();
  }

  getCompany(companyId: string) {
    return this.http.get<{message: string, company: any}>(BACKEND_URL + companyId);
  }
// TODO: Fix Infinite Spinner on Add New Company
  addCompany(formValues) {
    this.http.put<{ message: string , companyObject: any}>(BACKEND_URL, formValues)
      .subscribe(response => {
        this.companies.push(response.companyObject);
        this.companiesUpdated.next([...this.companies]);
        console.log('CompanyList: ', this.companies);
        // this.router.navigate(['/companies']);
      }, error => {
        console.log(error.message);
      }, () => {
        // this.companies.push(company);
      });

  }

  updateCompany(companyId: string, formValues) {
    this.http.post<{message: string, company: any}>(BACKEND_URL + companyId, formValues)
      .subscribe(response => {
        const updatedCompanies = [...this.companies];
        const oldCompanyIndex = updatedCompanies.findIndex(c => c._id === response.company._id);
        updatedCompanies[oldCompanyIndex] = response.company;
        this.companies = updatedCompanies;
        this.companiesUpdated.next([...this.companies]);
        //
        // this.router.navigate(['/companies']);
      });

  }
  deleteCompany(companyId: string) {
    this.http.delete(BACKEND_URL + companyId)
      .subscribe(response => {
        const updatedCompanies = this.companies.filter(company => company._id !== companyId);
        this.companies = updatedCompanies;
        this.companiesUpdated.next([...this.companies]);
        console.log('Deleted!');
      });
  }
}
