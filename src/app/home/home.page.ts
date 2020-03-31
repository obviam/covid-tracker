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
    this.appService.refreshData();
  }

  getTopInfected() {
    return this.appService.getTopInfected(100);
  }

  getCountriesData() {
    return this.appService.getAllData().slice(0, 15);
  }

}
