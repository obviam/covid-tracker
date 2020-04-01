import { InfectionData } from './../model/infection-data.model';
import { CountryData } from './../model/country-data.model';
import { HttpClient } from '@angular/common/http';
import { countries } from './../../data/countries';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // lastDownloaded
  cachedData: Array<CountryData>;

  constructor(private http: HttpClient) { }

  getCountries() {
    return countries;
  }

  refreshData(callback?: any) {
    this.cachedData = [];
    this.http.get<{ string: InfectionData[] }>('https://pomber.github.io/covid19/timeseries.json').subscribe(
      resp => {
        countries.forEach(country => {
          if (resp[country.name]) {
            const countryData = new CountryData();
            countryData.country = country.country;
            countryData.countryName = country.name;
            countryData.dailyData = resp[country.name];
            countryData.latestData = resp[country.name][resp[country.name].length - 1];
            this.cachedData.push(countryData);
          }
        });
        if (callback) {
          callback();
        }
      }
    );
  }

  getAllData() {
    return [...this.cachedData];
  }

  /* get the latest data for each country */
  getInfected(top?: number) {
    return [...this.cachedData].sort((a, b) => {
      return b.latestData.confirmed - a.latestData.confirmed;
    }).slice(0, top ? top : this.cachedData.length);
  }

  filterCountries(query: string) {
    return [...this.cachedData].sort((a, b) => {
      return b.latestData.confirmed - a.latestData.confirmed;
    }).filter(country => country.countryName.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }
}
