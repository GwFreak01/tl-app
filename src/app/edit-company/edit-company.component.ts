import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToCompanies() {
    console.log('Cancel Company');
    this.router.navigate(['/companies']);

  }
}
