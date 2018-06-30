import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  @Input() modifyOption: EventEmitter<string> = new EventEmitter<string>();
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

  onEditCompany(mode: string) {
    console.log('Company Comp.edit: ', mode);
    this.addButtonSelect = true;
    this.modifyOption.emit(mode);
  }

  onHideForm(hide: boolean) {
    console.log('OnHide: ', hide);
    this.addButtonSelect = hide;
  }
}

