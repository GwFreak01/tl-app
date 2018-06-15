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
    zipcode: string
  };
}
