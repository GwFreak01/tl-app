import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthData} from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;

  constructor(private http: HttpClient) { }

  getToken() {
    return this.token;
  }

  createUser(username: string, email: string, password: string) {
    const authData: AuthData = {
      username: username,
      email: email,
      password: password
    };
    this.http.post('http://localhost:3000/api/user/create-user', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = {
      username: '',
      email: email,
      password: password
    };
    this.http.post<{token: string}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        console.log(response);
        const token = response.token;
        this.token = token;
      });
  }
}
