import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
})
export class CountryPage implements OnInit {

  countryCode: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.countryCode = this.route.snapshot.paramMap.get('code');
    console.log(`Country: ${this.countryCode}`);
    // process country data
  }

}
