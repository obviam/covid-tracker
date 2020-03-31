import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { CountryData } from '../model/country-data.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  countries: Array<CountryData>;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    console.log('Refreshing');
    this.appService.refreshData(() => {
      this.countries = this.appService.getTopInfected();
    });
    console.log(this.countries);
  }

  getTopInfected() {
    return this.appService.getTopInfected(100);
  }

  getCountriesData() {
    return this.appService.getAllData().slice(0, 15);
  }

}
