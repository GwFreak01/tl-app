import { Injectable } from '@angular/core';
import {Company} from '../../models/company.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private companies: Company[] = [];
  private companiesUpdated = new Subject<Company[]>();

  constructor(private http: HttpClient) { }

  getCompanies() {
    // return [...this.companies];
    this.http.get<{ message: string, companies: Company[] }>('http://localhost:3000/api/companies')
      .subscribe((companyData) => {
        console.log(companyData.companies);
        this.companies = companyData.companies;
        this.companiesUpdated.next([...this.companies]);

      });
  }

  getCompanyUpdateListener() {
    return this.companiesUpdated.asObservable();
  }
  addCompany(newCompany: Company) {
    const company: Company = newCompany;
    this.http.post<{ message: string }>('http://localhost:3000/api/companies', company)
      .subscribe((res) => {
        console.log(res.message);
        this.companies.push(company);
        this.companiesUpdated.next([...this.companies]);
      });

  }
}
