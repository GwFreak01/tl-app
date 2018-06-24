import {
  Component,
  OnInit,
} from '@angular/core';

import {Company} from '../../../backend/models/company.model';
import {NgForm} from '@angular/forms';
import {CompaniesService} from '../services/companies/companies.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';


@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.css']
})
export class NewCompanyComponent implements OnInit {

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
    {label: 'TS16949', value: 'TS16949'},
    {label: 'Other', value: 'Other'},
    {label: 'None', value: 'None'}
  ];
  selected = null;

  private mode = 'create';
  private companyId: string;
  public company: Company;
  isLoading = false;
  salesCheck = false;
  qualityCheck = false;
  logisticsCheck = false;
  differentCheck = false;
  // differentOption = !(this.qualityCheck );
  noneSelect = true;

  constructor(public companiesService: CompaniesService, public route: ActivatedRoute, public router: Router) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('companyId')) {
        console.log('OnInit');
        this.mode = 'edit';
        this.companyId = paramMap.get('companyId');
        this.isLoading = true;
        // this.company = this.companiesService.getCompany(this.companyId);
        console.log('OnInitCompanyID: ', this.mode, this.companyId);
        this.companiesService.getCompany(this.companyId).subscribe(companyData => {
          this.isLoading = false;
          console.log('OnInit: ', companyData);
          console.log('OnInit: ', companyData._id);
          this.company = {
            id: companyData._id,
            companyName: companyData.companyName,
            companyAddress: {
              id: companyData.companyAddress._id,
              street1: companyData.companyAddress.street1,
              street2: companyData.companyAddress.street2,
              city: companyData.companyAddress.city,
              state: companyData.companyAddress.state,
              zipcode: companyData.companyAddress.zipcode
            },
            salesPerson: {
              id: companyData.salesPerson._id,
              name: companyData.salesPerson.name,
              email: companyData.salesPerson.email,
              phone: companyData.salesPerson.phone,
              status: companyData.salesPerson.status
            },
            qualityPerson: {
              id: companyData.qualityPerson._id,
              name: companyData.qualityPerson.name,
              email: companyData.qualityPerson.email,
              phone: companyData.qualityPerson.phone,
              status: companyData.qualityPerson.status
            },
            logisticsPerson: {
              id: companyData.logisticsPerson._id,
              name: companyData.logisticsPerson.name,
              email: companyData.logisticsPerson.email,
              phone: companyData.logisticsPerson.phone,
              status: companyData.logisticsPerson.status
            },
            differentPerson: {
              id: companyData.differentPerson._id,
              name: companyData.differentPerson.name,
              email: companyData.differentPerson.email,
              phone: companyData.differentPerson.phone,
              status: companyData.differentPerson.status
            },
            productDescription: companyData.productDescription,
            certification: {
              id: companyData.certification._id,
              certType: companyData.certification.certType,
              expirationDate: companyData.certification.expirationDate,
              certNumber: companyData.certification.certNumber,
              registrar: companyData.certification.registrar,
              other: companyData.certification.other,
              reason: companyData.certification.reason
            }
          };
        });
      } else {
        this.mode = 'create';
        this.companyId = null;
      }
    });
  }

  onSaveCompany(form: NgForm) {
    const company: Company = {
      id: null,
      companyName: form.value.companyName,
      companyAddress: {
        id: null,
        street1: form.value.street1,
        street2: form.value.street2,
        city: form.value.city,
        state: form.value.state,
        zipcode: form.value.zipcode,
      },
      salesPerson: {
        id: null,
        name: form.value.salesName,
        email: form.value.salesEmail,
        phone: form.value.salesPhone,
        status: form.value.salesCheck
      },
      qualityPerson: {
        id: null,
        name: form.value.qualityName,
        email: form.value.qualityEmail,
        phone: form.value.qualityPhone,
        status: form.value.qualityCheck
      },
      logisticsPerson: {
        id: null,
        name: form.value.logisticsName,
        email: form.value.logisticsEmail,
        phone: form.value.logisticsPhone,
        status: form.value.logisticsCheck
      },
      differentPerson: {
        id: null,
        name: form.value.differentName,
        email: form.value.differentEmail,
        phone: form.value.differentPhone,
        status: form.value.differentCheck
      },
      productDescription: form.value.productDescription,
      certification: {
        id: null,
        certType: form.value.certType,
        certNumber: form.value.certNumber,
        registrar: form.value.certRegistrar,
        expirationDate: form.value.certExpirationDate,
        other: form.value.certType,
        reason: form.value.certReason
      }

    };
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      console.log('Form Values: ', form.value);
      console.log('Create Company: ', company);
      this.companiesService.addCompany(company);
      // this.isLoading = false;
      // this.router.navigate(['/companies']);

    } else {
      this.companiesService.updateCompany(this.companyId, company);
      // this.router.navigate(['/companies']);


    }

    form.resetForm();
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

}
