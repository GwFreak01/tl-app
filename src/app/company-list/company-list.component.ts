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
import {AuthService} from '../auth/auth.service';
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit, OnDestroy {


  @Output() editMode =  new EventEmitter<boolean>();
  companies: Company[] = [];
  isLoading = false;
  private companiesSub: Subscription;
  private authStatusSub = new Subscription();
  userIsAuthenticated = false;


  constructor(public companyService: CompaniesService,
              private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.companyService.getCompanies();
    this.companiesSub = this.companyService.getCompanyUpdateListener()
      .subscribe((companies: Company[]) => {
        this.isLoading = false;
        this.companies = companies;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    console.log('CompanyList.userIsAuthenicated: ', this.userIsAuthenticated);

    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        console.log('CompanyList.Auth: ', isAuthenticated);
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onEdit(companyId, editSelected: boolean) {
    console.log('CompanyListEdit', companyId);
    this.editMode.emit(editSelected);
  }

  onDelete(companyId: string) {
    this.companyService.deleteCompany(companyId);
  }
}
