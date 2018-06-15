import { Injectable } from '@angular/core';
import {Company} from '../../app/models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  companies: Company[] = [];

  constructor() { }
}
