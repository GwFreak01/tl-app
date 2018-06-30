import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  // @Input()
  // hideForm = new Subject<o>();

  addButtonSelect = false;
  editButtonSelect = false;

  constructor() {

  }

  ngOnInit() {
    // this.addButtonSelect = false;
  }

  onAddButtonSelect() {
    this.addButtonSelect = true;
  }

  onEditCompany($event) {
    console.log('Company Comp: On Edit');
  }

  onHideForm(hide: boolean) {
    console.log('OnHide: ', hide);
    this.addButtonSelect = hide;
  }
}

