import { Component, OnInit } from '@angular/core';

import {Company} from '../models/company.model';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  storedCompanies: Company[] = [];

  constructor() { }

  ngOnInit() {
  }

  onCompanyAdded(company) {
    this.storedCompanies.push(company);
  }
}

