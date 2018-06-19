import { Injectable } from '@angular/core';
import {Company} from '../../../../backend/models/company.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private companies: Company[] = [];
  private companiesUpdated = new Subject<Company[]>();

  constructor(private http: HttpClient) { }

  getCompanies() {
    // return [...this.companies];
    this.http.get<{ message: string, companies: any }>('http://localhost:3000/api/companies')
      .pipe(map((companyData) => {

        return companyData.companies.map((company) => {
          return {
            id: company._id,
            companyName: company.companyName,
            companyAddress: {
              id: company.companyAddress._id,
              street1: company.companyAddress.street1,
              street2: company.companyAddress.street2,
              city: company.companyAddress.city,
              state: company.companyAddress.state,
              zipcode: company.companyAddress.zipcode
            }
          };
        });
      }))
      .subscribe((transformedCompanies) => {
        console.log('Transformed : ', transformedCompanies);
        this.companies = transformedCompanies;
        this.companiesUpdated.next([...this.companies]);

      });
  }

  getCompanyUpdateListener() {
    return this.companiesUpdated.asObservable();
  }

  getCompany(id: string) {
    // return {...this.companies.find(company => company.id === id)};
    return this.http.get<{
        _id: string,
        companyName: string,
        companyAddress: {
          _id: string;
          street1: string,
          street2: string,
          city: string,
          state: string,
          zipcode: string
        }
    }>('http://localhost:3000/api/companies/' + id);
  }

  addCompany(newCompany: Company) {
    const company: Company = newCompany;
    this.http.post<{ message: string , companyId: string}>('http://localhost:3000/api/companies', company)
      .subscribe((res) => {
        const companyId = res.companyId;
        company.id = companyId;
        // console.log(res.message);
        this.companies.push(company);
        this.companiesUpdated.next([...this.companies]);
      });

  }

  updateCompany(id: string, company: Company) {
    console.log('CompaniesServe.updateCompany: ', company);
    const updatedCompany: Company = company;
    this.http.put('http://localhost:3000/api/companies/' + id, company)
      .subscribe(response => {
        console.log('CompaniesServe.updateCompany.response: ', response);
        const updatedCompanies = [...this.companies];
        const oldCompanyIndex = updatedCompanies.findIndex(c => c.id === updatedCompany.id);
        updatedCompanies[oldCompanyIndex] = company;
        this.companies = updatedCompanies;
        this.companiesUpdated.next([...this.companies]);
      });
  }
  deleteCompany(companyId: string) {
    this.http.delete('http://localhost:3000/api/companies/' + companyId)
      .subscribe(() => {
        const updatedCompanies = this.companies.filter(company => company.id !== companyId);
        this.companies = updatedCompanies;
        this.companiesUpdated.next([...this.companies]);
        console.log('Deleted!');
      });
  }
}
