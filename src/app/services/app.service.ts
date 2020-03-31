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

  refreshData() {
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
            countryData.totalData = resp[country.name].reduce((prevValue: InfectionData, curValue: InfectionData) => {
              const totalData = new InfectionData();
              totalData.confirmed = prevValue.confirmed + curValue.confirmed;
              totalData.deaths = prevValue.deaths + curValue.deaths;
              totalData.recovered = prevValue.recovered + curValue.recovered;
              return totalData;
            });
            this.cachedData.push(countryData);
          }
        });
      }
    );
  }

  getAllData() {
    return this.cachedData;
  }

  /* get the latest data for each country */
  getTopInfected(top = 10) {
    return this.cachedData.sort((a, b) => {
      return b.totalData.confirmed - a.totalData.confirmed;
    }).slice(0, top);
  }

  getLatestDataForCountry(country: string) {

  }

  getDataForCountry(country: string) {

  }
}
