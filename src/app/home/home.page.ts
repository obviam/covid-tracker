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
      this.countries = this.appService.getInfected();
    });
    console.log(this.countries);
  }

  getCountriesData() {
    return this.appService.getAllData().slice(0, 15);
  }

}
