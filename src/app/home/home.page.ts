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
    console.table(this.appService.getCountries());
  }

  getCountries() {
    return this.appService.getCountries().slice(0, 5);
  }

}
