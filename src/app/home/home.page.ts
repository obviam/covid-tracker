import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { CountryData } from '../model/country-data.model';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  countries: Array<CountryData>;

  constructor(
    private appService: AppService,
    private loadingController: LoadingController) { }

  ngOnInit(): void {
    this.presentLoading().then(loading => {
      this.appService.refreshData().then(res => {
        console.log('finished');
        this.countries = this.appService.getInfected();
        loading.dismiss();
      });
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Fetching data...',
      duration: 2000
    });
    await loading.present();
    return loading;

  }

  getCountriesData() {
    return this.appService.getAllData().slice(0, 15);
  }

  onSearchInput(event: any) {
    this.countries = this.appService.filterCountries(event.target.value);
  }
}
