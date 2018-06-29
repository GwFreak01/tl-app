import {st} from '@angular/core/src/render3';

export interface Company {
  _id: string;
  companyName: string;
  companyAddress: {
    _id: string;
    street1: string,
    street2: string,
    city: string,
    state: string,
    zipcode: string;
  };
  salesPerson: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    status: boolean;
  };
  qualityPerson: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    status: boolean;
  };
  logisticsPerson: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    status: boolean;
  };
  differentPerson: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    status: boolean;
  };
  productDescription: string;

  certification: {
    _id: string;
    certType: string;
    expirationDate: string;
    certNumber: string;
    registrar: string;
    other: string;
    reason: string;
  };
}
