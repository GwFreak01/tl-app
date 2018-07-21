import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {EmailsService} from '../../services/emails/emails.service';

@Component({
  selector: 'app-company-registration-modal',
  templateUrl: './company-registration-modal.component.html',
  styleUrls: ['./company-registration-modal.component.css']
})
export class CompanyRegistrationModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CompanyRegistrationModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private emailService: EmailsService) { }

  ngOnInit() {
  }

  onCloseConfirm(email: string) {
    // console.log(email);
    this.emailService.sendCompanyRegistration(email);
    this.dialogRef.close('Confirm');
    alert('Email Registration Sent!');
  }

  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }
}
