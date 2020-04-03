import { CountryData } from './../../model/country-data.model';
import { AppService } from './../../services/app.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
})
export class CountryPage implements OnInit {

  @ViewChild('lineCanvas', { static: true }) lineCanvas: ElementRef;

  private lineChart: Chart;

  private countryCode: string;
  private countryData: CountryData;

  constructor(private route: ActivatedRoute, private appService: AppService) { }

  ngOnInit() {
    this.countryCode = this.route.snapshot.paramMap.get('code');
    console.log(`Country: ${this.countryCode}`);
    this.countryData = this.appService.getCountry(this.countryCode);

    const confirmedSeries = this.countryData.dailyData.map(data => data.confirmed);
    const deathsSeries = this.countryData.dailyData.map(data => data.deaths);
    const recoveredSeries = this.countryData.dailyData.map(data => data.recovered);

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Confrimed',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(255,25,133,0.4)',
            borderColor: 'rgba(255,25,133,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: confirmedSeries,
            spanGaps: false
          }
        ]
      }/*,
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'COVID-19'
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }]
        }
      }*/
    });
    // process country data
  }

}
