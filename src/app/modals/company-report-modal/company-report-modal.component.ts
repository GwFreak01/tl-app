import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-company-report-modal',
  templateUrl: './company-report-modal.component.html',
  styleUrls: ['./company-report-modal.component.css']
})
export class CompanyReportModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CompanyReportModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string,
              ) { }

  ngOnInit() {
  }

  onOpenOK() {
    console.log('Email Report dialog closed!');
    this.dialogRef.close('Confirm');
  }
}
