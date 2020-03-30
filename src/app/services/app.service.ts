import { countries } from './../../data/countries';
import { Injectable } from '@angular/core';
import { Country } from '../model/country.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  getCountries() {
    return countries;
  }
}
