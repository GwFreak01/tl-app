import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';



const BACKEND_URL = environment.apiUrl + '/emails/';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  constructor(private http: HttpClient) { }
// TODO: Paramers need email and all events associated to company
  sendEmail(emailId: string) {
    this.http.post<{message: string}>(BACKEND_URL, emailId).subscribe(response => {
      console.log(response.message);
    });
  }
}
