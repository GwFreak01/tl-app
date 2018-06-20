import {st} from '@angular/core/src/render3';

export interface Company {
  id: string;
  companyName: string;
  companyAddress: {
    id: string;
    street1: string,
    street2: string,
    city: string,
    state: string,
    zipcode: string;
  };
  salesPerson: {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: boolean;
  };
  qualityPerson: {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: boolean;
  };
  logisticsPerson: {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: boolean;
  };
  differentPerson: {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: boolean;
  };
  productDescription: string;

  certification: {
    id: string;
    certType: string;
    expirationDate: string;
    certNumber: string;
    registrar: string;
    other: string;
    reason: string;
  };
}
