import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {


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
}

