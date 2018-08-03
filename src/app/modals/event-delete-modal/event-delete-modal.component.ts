import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CompanyDeleteModalComponent} from '../company-delete-modal/company-delete-modal.component';
import {CompaniesService} from '../../services/companies/companies.service';
import {EventsService} from '../../services/events/events.service';

@Component({
  selector: 'app-event-delete-modal',
  templateUrl: './event-delete-modal.component.html',
  styleUrls: ['./event-delete-modal.component.css']
})
export class EventDeleteModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CompanyDeleteModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data:  string,
              public eventsService: EventsService) { }

  ngOnInit() {
  }

  onCloseConfirm(eventId: string) {
    // console.log(email);
    this.eventsService.deleteEvent(eventId);
    this.dialogRef.close('Confirm');
    alert('Company deleted!!');
  }

  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

}