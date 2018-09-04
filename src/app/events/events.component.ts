import { Component, OnInit } from '@angular/core';
import {EmailsService} from '../services/emails/emails.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  addButtonSelect = false;

  associatedCompanyName: string;
  associatedUserCompany: string;
  constructor(private emailsService: EmailsService,
              private authService: AuthService) { }

  ngOnInit() {
    this.associatedUserCompany = this.authService.getUsername();
    this.associatedCompanyName = this.authService.getUserCompany();
  }

  onAddButtonSelect() {
    console.log('onAddButtonSelect');
    this.addButtonSelect = true;
  }

  onHideForm(hide: boolean) {
    console.log('OnHide: ', hide);
    this.addButtonSelect = hide;
  }

  onSendAllFeedback() {
    alert('All company emails sent!');
    this.emailsService.sendAllFeedback();
  }
}
