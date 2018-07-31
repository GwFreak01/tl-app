import { Component, OnInit } from '@angular/core';
import {EmailsService} from '../services/emails/emails.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  addButtonSelect = false;

  constructor(private emailsService: EmailsService) { }

  ngOnInit() {
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
