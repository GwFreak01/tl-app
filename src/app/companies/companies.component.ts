import {Component, EventEmitter, Inject, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {CompanyRegistrationModalComponent} from '../modals/company-registration-modal/company-registration-modal.component';
import {duration} from 'moment';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  @Input() modifyOption: EventEmitter<string> = new EventEmitter<string>();
  // hideForm = new Subject<o>();
  associatedCompanyName: string;
  associatedUserCompany: string;
  addButtonSelect = false;
  editButtonSelect = false;

  dialogResult = '';
  constructor(private dialog: MatDialog,
              private authService: AuthService) {

  }

  ngOnInit() {
    // this.addButtonSelect = false;
    this.associatedUserCompany = this.authService.getUsername();
    this.associatedCompanyName = this.authService.getUserCompany();
  }

  onAddButtonSelect() {
    this.addButtonSelect = true;
  }

  onEditCompany(mode: string) {
    console.log('Company Comp.edit: ', mode);
    this.addButtonSelect = true;
    this.modifyOption.emit(mode);
  }

  onHideForm(hide: boolean) {
    console.log('OnHide: ', hide);
    this.addButtonSelect = hide;
  }

  onSendCompanyRegistration() {
    const dialogRef = this.dialog.open(CompanyRegistrationModalComponent, {
      // height: '400px',
      width: '600px',
      data: 'This text was passed into the dialog!'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
      duration(500);
    });
  }
}

