import { InfectionData } from './../model/infection-data.model';
import { CountryData } from './../model/country-data.model';
import { HttpClient } from '@angular/common/http';
import { countries } from './../../data/countries';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  // lastDownloaded
  cachedData: Array<CountryData> = [];

  constructor(private http: HttpClient) { }

  getCountries() {
    return countries;
  }

  async refreshData(): Promise<any> {
    this.cachedData = [];
    await this.http.get<{ string: InfectionData[] }>('https://pomber.github.io/covid19/timeseries.json').toPromise().then(
    // await this.http.get<{ string: InfectionData[] }>('assets/covid.json').toPromise().then(
      res => {
        countries.forEach(country => {
          if (res[country.name]) {
            const countryData = new CountryData();
            countryData.country = country.country;
            countryData.countryName = country.name;
            countryData.dailyData = res[country.name];
            countryData.latestData = res[country.name][res[country.name].length - 1];
            const dailyChangeData: Array<InfectionData> = [];
            _.each(countryData.dailyData, (dailyData, idx) => {
              const dailyChange = new InfectionData();
              dailyChange.confirmed = 0;
              dailyChange.deaths = 0;
              dailyChange.recovered = 0;
              dailyChange.date = dailyData.date;
              if (idx > 0) {
                dailyChange.confirmed = dailyData.confirmed - countryData.dailyData[idx - 1].confirmed;
                dailyChange.deaths = dailyData.deaths - countryData.dailyData[idx - 1].deaths;
                dailyChange.recovered = dailyData.recovered - countryData.dailyData[idx - 1].recovered;
              }
              dailyChangeData.push(dailyChange);
            });
            countryData.dailyChangeData = dailyChangeData;
            countryData.latestDailyChangeData = _.last([...dailyChangeData]);
            this.cachedData.push(countryData);
          }
        });
        console.log('done');
        return [...this.cachedData];
      }
    );
    if (this.cachedData.length === 0) {
      return Promise.reject('Could not fetch data');
    }
    return Promise.resolve('done');
  }

  isLoaded() {
    return this.cachedData.length !== 0;
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

  getCountry(code: string) {
    return [...this.cachedData].find(country => country.country === code);
  }
}
