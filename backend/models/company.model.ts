import {st} from '@angular/core/src/render3';

export interface Company {
  _id: string;
  companyName: string;
  companyAddress: {
    street1: string,
    street2: string,
    city: string,
    state: string,
    zipcode: string
  };
}
