import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    console.log('Refreshing...');
    this.appService.refreshData();
    console.log('Done');
  }

  getTopInfected() {
    return this.appService.getTopInfected();
  }

  getCountriesData() {
    return this.appService.getAllData().slice(0, 15);
  }

}
