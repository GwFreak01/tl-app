import {
  Component, EventEmitter, Input, OnDestroy,
  OnInit, Output,
} from '@angular/core';

import {Company} from '../../../backend/models/company.model';
import {NgForm} from '@angular/forms';
import {CompaniesService} from '../services/companies/companies.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {EventsService} from '../services/events/events.service';


@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.css']
})
export class NewCompanyComponent implements OnInit, OnDestroy {

  @Input() editMode: string;
  @Output() hideNewForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  states = [
    {label: 'AL', value: 'AL'},
    {label: 'AK', value: 'AK'},
    {label: 'AZ', value: 'AZ'},
    {label: 'AR', value: 'AR'},
    {label: 'CA', value: 'CA'},
    {label: 'CO', value: 'CO'},
    {label: 'CT', value: 'CT'},
    {label: 'DE', value: 'DE'},
    {label: 'FL', value: 'FL'},
    {label: 'GA', value: 'GA'},
    {label: 'HI', value: 'HI'},
    {label: 'ID', value: 'ID'},
    {label: 'IL', value: 'IL'},
    {label: 'IN', value: 'IN'},
    {label: 'IA', value: 'IA'},
    {label: 'KS', value: 'KS'},
    {label: 'KY', value: 'KY'},
    {label: 'LA', value: 'LA'},
    {label: 'ME', value: 'ME'},
    {label: 'MD', value: 'MD'},
    {label: 'MA', value: 'MA'},
    {label: 'MI', value: 'MI'},
    {label: 'MN', value: 'MN'},
    {label: 'MS', value: 'MS'},
    {label: 'MO', value: 'MO'},
    {label: 'MT', value: 'MT'},
    {label: 'NE', value: 'NE'},
    {label: 'NV', value: 'NV'},
    {label: 'NH', value: 'NH'},
    {label: 'NJ', value: 'NJ'},
    {label: 'NM', value: 'NM'},
    {label: 'NY', value: 'NY'},
    {label: 'NC', value: 'NC'},
    {label: 'ND', value: 'ND'},
    {label: 'OH', value: 'OH'},
    {label: 'OK', value: 'OK'},
    {label: 'OR', value: 'OR'},
    {label: 'PA', value: 'PA'},
    {label: 'RI', value: 'RI'},
    {label: 'SC', value: 'SC'},
    {label: 'SD', value: 'SD'},
    {label: 'TN', value: 'TN'},
    {label: 'TX', value: 'TX'},
    {label: 'UT', value: 'UT'},
    {label: 'VT', value: 'VT'},
    {label: 'VA', value: 'VA'},
    {label: 'WA', value: 'WA'},
    {label: 'WV', value: 'WV'},
    {label: 'WI', value: 'WI'},
    {label: 'WY', value: 'WY'}
  ];
  certList = [
    {label: 'ISO9001', value: 'ISO9001'},
    {label: 'ISO14001', value: 'ISO14001'},
 /* {label: 'TS16949', value: 'TS16949'},    <-- Changed to IATF 16949 - per Kate's suggestion   */
    {label: 'IATF 16949', value: 'IATF 16949'},
    {label: 'Other', value: 'Other'},
    {label: 'None', value: 'None'}
  ];
  selected = null;

  userIsAuthenticated = false;
  private mode = 'create';
  private companyId: string;
  public company: Company;
  isLoading = false;
  salesCheck = false;
  qualityCheck = false;
  logisticsCheck = false;
  differentCheck = false;
  // differentOption = !(this.qualityCheck );
  private companiesSub: Subscription;

  noneSelect = true;

  private authStatusSub: Subscription;

  constructor(public companiesService: CompaniesService,
              public eventsService: EventsService,
              public route: ActivatedRoute,
              public router: Router,
              private authService: AuthService) {

  }

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('companyId')) {
        // console.log('OnInit');
        this.mode = 'edit';
        this.companyId = paramMap.get('companyId');
        this.isLoading = true;
        this.companiesService.getCompany(this.companyId)
          .subscribe(response => {
            this.isLoading = false;
            // console.log('OnInit: ', response);
            this.company = response.company;
          }, error => {
            console.log(error);
          });
      } else {
        this.mode = 'create';
        this.companyId = null;
      }
    });

    this.userIsAuthenticated = this.authService.getIsAuth();

    console.log('CompanyList.userIsAuthenicated: ', this.userIsAuthenticated);

    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        console.log('CompanyList.Auth: ', isAuthenticated);
        this.userIsAuthenticated = isAuthenticated;
      });

  }

  onSaveCompany(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.userIsAuthenticated === false) {
      if (this.mode === 'create') {
        // this.companiesService.addCompany(form.value);
        this.companiesService.addCompanyTemp(form.value);
        this.router.navigate(['/login']).then(() => {
          alert('Company created successfully!');
        });
      }
    } else {
      if (this.mode === 'create') {
        this.companiesService.addCompany(form.value);
        // this.hideNewForm.emit(false);
        alert('Company created successfully!');


      } else {
        this.eventsService.updateEvents(this.companyId, form.value.companyName);
        this.companiesService.updateCompany(this.companyId, form.value);

        // this.isLoading = false;
        // console.log('End Save');
        this.router.navigate(['/dashboard']).then(() => {
          alert('Company updated successfully!');
        });




      }
      this.hideNewForm.emit(false);
      form.resetForm();
      this.isLoading = false;
      // this.hideNewForm.emit(false);
    }


  }

  certSelect() {
    console.log('Cert Select: ', );
  }

  statusSelect(person, event) {
    if (person === 'sales') {
      this.salesCheck = event.checked;
    } else if (person === 'quality') {
      this.qualityCheck = event.checked;
    } else if (person === 'logistics') {
      this.logisticsCheck = event.checked;
    } else if (person === 'different') {
      this.differentCheck = event.checked;
    }
    this.noneSelect = !(this.salesCheck || this.qualityCheck || this.logisticsCheck);
    console.log(this.salesCheck, this.qualityCheck, this.logisticsCheck, this.noneSelect);
  }

  onCancelCompany() {
    console.log('Cancel Company');
    this.hideNewForm.emit(false);

  }

  onEditMode(modifyOption: string) {
    this.mode = modifyOption;
  }
  ngOnDestroy() {
    // this.authStatusSub.unsubscribe();
  }
}
