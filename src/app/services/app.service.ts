import { Injectable } from '@angular/core';
import * as countriesData from '../../data/countries.json';
import { Country } from '../model/country.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  countries: Array<Country> = (countriesData as Country[]).default;

  constructor() { }

  getCountries() {
    return this.countries;
  }
}
