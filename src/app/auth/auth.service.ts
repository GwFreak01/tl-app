import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthData} from './auth-data.model';
import {Observable, Subject, throwError} from 'rxjs';
import {Router} from '@angular/router';

import {environment} from '../../environments/environment';
import {Company} from '../../../backend/models/company.model';
import {CompaniesService} from '../services/companies/companies.service';

const BACKEND_URL = environment.apiUrl + '/user';

// import {setTimeout} from 'timers';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private username: string;
  private userCompany: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;

  constructor(private http: HttpClient,
              private router: Router,
              private companiesService: CompaniesService) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUsername() {
    return this.username;
  }

  getUserCompany() {
    if (this.username === ('tl_admin' || 'tl_employee')) {
      return this.username;
    } else {
      let companyList;

      this.companiesService.getAllCompanies().subscribe(response => {
        companyList = response;
        response.some((company) => {
          console.log('response company: ', company);
          if (company.qualityPerson.email === this.username) {
            this.userCompany = company.companyName;
            return true;
          }
          if (company.salesPerson.email === this.username) {
            this.userCompany = company.companyName;
            return true;
          }
          if (company.logisticsPerson.email === this.username) {
            this.userCompany = company.companyName;
            return true;
          }
          if (company.differentPerson.email === this.username) {
            this.userCompany = company.companyName;
            return true;
          }
        });
        console.log('this.userCompany: ', this.userCompany);
      });
      return this.userCompany;
    }
  }

  createUser(user) {
    const sanitizedUsername = user.username.trim().toLowerCase();
    const sanitizedEmail = user.email.trim().toLowerCase();
    const authData: AuthData = {
      username: sanitizedUsername,
      email: sanitizedEmail,
      password: user.password
    };
    console.log(authData);
    return this.http.post(BACKEND_URL + '/create-user', authData);
  }

  createBulkUsers(company: Company) {
    const emailListUsers = [];
    if (company.salesPerson.status) {
      emailListUsers.push(company.salesPerson.email);
    }
    if (company.qualityPerson.status) {
      emailListUsers.push(company.qualityPerson.email);
    }
    if (company.logisticsPerson.status) {
      emailListUsers.push(company.logisticsPerson.email);
    }
    if (company.differentPerson.status) {
      emailListUsers.push(company.differentPerson.email);
    }
    console.log('createBulkUsers: ', company);
    console.log('emailListUsers: ', emailListUsers);
    this.http.post(BACKEND_URL + '/create-bulk-users', emailListUsers).subscribe((response) => {
      console.log(response);
    });
  }
  loginUser(username: string, password: string) {
    const sanitizedUsername = username.trim().toLowerCase();
    const authData: AuthData = {
      username: sanitizedUsername,
      email: sanitizedUsername,
      password: password
    };
    this.http.post<{ message: string, token: string, username: string, expiresIn: number }>(BACKEND_URL + '/login', authData)
      .subscribe(response => {
        // console.log(response.message);
        const token = response.token;
        this.token = token;
        // this.username = username;
        if (token) {
          const expiresInDuration = response.expiresIn;
          // console.log(expiresInDuration);
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.username = response.username;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, this.username, expirationDate);
          this.router.navigate(['/companies']);
        } else {
          console.log('loginService Fail');
        }

      }, error => {
        // console.log(error.message);
        return error.message;
      }, () => {
        // return;
        // this.router.navigate(['/login']);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    // console.log(authInformation, expiresIn);
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.username = authInformation.username;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.username = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    // console.log('Setting Auth Timer: ', duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  private saveAuthData(token: string, username: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    const tokenVar = localStorage.getItem('token');
    // console.log('saveAuthData.token: ', tokenVar);
    localStorage.setItem('username', username);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('expirationDate');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const expirationDate = localStorage.getItem('expirationDate');
    if (!token || !expirationDate || !username) {
      return;
    }
    return {
      token: token,
      username: username,
      expirationDate: new Date(expirationDate)
    };
  }
}
